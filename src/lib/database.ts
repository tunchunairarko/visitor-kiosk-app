import sqlite3 from 'sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { format, startOfDay, endOfDay } from 'date-fns';
import { Visitor, CreateVisitorRequest, Admin, VisitorStats, DatabaseResult } from './types';

const dbPath = path.join(process.cwd(), 'data', 'visitor-kiosk.db');

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  private get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row as T);
      });
    });
  }

  private all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  private async init() {
    // Create tables
    await this.run(`
      CREATE TABLE IF NOT EXISTS visitors (
        id TEXT PRIMARY KEY,
        ticket_number TEXT NOT NULL,
        visitor_name TEXT NOT NULL,
        visitor_email TEXT,
        visitor_phone TEXT,
        visitor_company TEXT,
        visiting_employee TEXT NOT NULL,
        visiting_employee_name TEXT NOT NULL,
        visiting_employee_email TEXT NOT NULL,
        purpose TEXT,
        check_in_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        check_out_time DATETIME,
        status TEXT DEFAULT 'checked_in'
      )
    `);

    await this.run(`
      CREATE TABLE IF NOT EXISTS admins (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await this.run(`
      CREATE TABLE IF NOT EXISTS daily_counters (
        date TEXT PRIMARY KEY,
        counter INTEGER DEFAULT 0
      )
    `);

    // Insert default admin if not exists
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    // Check if admin exists
    const adminCount = await this.get<{ count: number }>('SELECT COUNT(*) as count FROM admins');
    if (!adminCount || adminCount.count === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await this.run(
        'INSERT INTO admins (id, username, password_hash, email) VALUES (?, ?, ?, ?)',
        [uuidv4(), 'admin', hashedPassword, 'admin@company.com']
      );
    }
  }

  async generateTicketNumber(): Promise<string> {
    const today = format(new Date(), 'yyyy-MM-dd');

    let counter = await this.get<{ counter: number }>('SELECT counter FROM daily_counters WHERE date = ?', [today]);
    
    if (!counter) {
      await this.run('INSERT INTO daily_counters (date, counter) VALUES (?, 1)', [today]);
      return '0001';
    } else {
      const newCounter = counter.counter + 1;
      await this.run('UPDATE daily_counters SET counter = ? WHERE date = ?', [newCounter, today]);
      return newCounter.toString().padStart(4, '0');
    }
  }

  async createVisitor(visitorData: CreateVisitorRequest) {
    const id = uuidv4();
    const ticketNumber = await this.generateTicketNumber();
    
    await this.run(`
      INSERT INTO visitors (
        id, ticket_number, visitor_name, visitor_email, visitor_phone, 
        visitor_company, visiting_employee, visiting_employee_name, 
        visiting_employee_email, purpose
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id, ticketNumber, visitorData.visitorName, visitorData.visitorEmail,
      visitorData.visitorPhone, visitorData.visitorCompany, 
      visitorData.visitingEmployee, visitorData.visitingEmployeeName,
      visitorData.visitingEmployeeEmail, visitorData.purpose
    ]);

    return { id, ticketNumber };
  }

  async checkOutVisitor(ticketNumber: string) {
    await this.run(`
      UPDATE visitors 
      SET check_out_time = CURRENT_TIMESTAMP, status = 'checked_out'
      WHERE ticket_number = ? AND status = 'checked_in'
    `, [ticketNumber]);
  }

  async getVisitors(limit = 50, offset = 0): Promise<Visitor[]> {
    return await this.all<Visitor>(`
      SELECT *
      FROM visitors
      ORDER BY check_in_time DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
  }

  async getTodayVisitors(): Promise<Visitor[]> {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    return await this.all<Visitor>(`
      SELECT *
      FROM visitors
      WHERE DATE(check_in_time) = ?
      ORDER BY check_in_time DESC
    `, [today]);
  }

  async getVisitorStats(days = 7): Promise<VisitorStats['weeklyStats']> {
    const startDate = format(new Date(Date.now() - days * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    
    return await this.all<VisitorStats['weeklyStats'][0]>(`
      SELECT 
        DATE(check_in_time) as date,
        COUNT(*) as total_visitors,
        COUNT(CASE WHEN status = 'checked_out' THEN 1 END) as checked_out,
        COUNT(CASE WHEN status = 'checked_in' THEN 1 END) as still_in
      FROM visitors
      WHERE DATE(check_in_time) >= ?
      GROUP BY DATE(check_in_time)
      ORDER BY date DESC
    `, [startDate]);
  }

  async authenticateAdmin(username: string, password: string): Promise<Admin | null> {
    const bcrypt = require('bcryptjs');
    
    const admin = await this.get<Admin & { password_hash: string }>('SELECT * FROM admins WHERE username = ?', [username]);
    if (!admin) return null;
    
    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) return null;
    
    return { id: admin.id, username: admin.username, email: admin.email };
  }

  async findVisitorByTicket(ticketNumber: string): Promise<Visitor | null> {
    const visitor = await this.get<Visitor>(`
      SELECT *
      FROM visitors
      WHERE ticket_number = ?
    `, [ticketNumber]);
    
    return visitor || null;
  }
}

export const database = new Database();
