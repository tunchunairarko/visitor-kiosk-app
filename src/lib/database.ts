import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { format, startOfDay, endOfDay } from 'date-fns';

const dbPath = path.join(process.cwd(), 'data', 'visitor-kiosk.db');

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private async init() {
    const run = promisify(this.db.run.bind(this.db));
    
    // Create tables
    await run(`
      CREATE TABLE IF NOT EXISTS visitors (
        id TEXT PRIMARY KEY,
        ticket_number TEXT NOT NULL,
        visitor_name TEXT NOT NULL,
        visitor_email TEXT,
        visitor_phone TEXT,
        visitor_company TEXT,
        visiting_employee TEXT NOT NULL,
        purpose TEXT,
        check_in_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        check_out_time DATETIME,
        status TEXT DEFAULT 'checked_in'
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS employees (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        department TEXT,
        is_active BOOLEAN DEFAULT 1
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS admins (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS daily_counters (
        date TEXT PRIMARY KEY,
        counter INTEGER DEFAULT 0
      )
    `);

    // Insert default employees and admin if not exists
    await this.seedDefaultData();
  }

  private async seedDefaultData() {
    const get = promisify(this.db.get.bind(this.db));
    const run = promisify(this.db.run.bind(this.db));

    // Check if employees exist
    const employeeCount = await get('SELECT COUNT(*) as count FROM employees');
    if (employeeCount.count === 0) {
      const defaultEmployees = [
        { id: uuidv4(), name: 'John Doe', email: 'john.doe@company.com', department: 'Engineering' },
        { id: uuidv4(), name: 'Jane Smith', email: 'jane.smith@company.com', department: 'Marketing' },
        { id: uuidv4(), name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Sales' },
        { id: uuidv4(), name: 'Sarah Wilson', email: 'sarah.wilson@company.com', department: 'HR' },
      ];

      for (const employee of defaultEmployees) {
        await run(
          'INSERT INTO employees (id, name, email, department) VALUES (?, ?, ?, ?)',
          [employee.id, employee.name, employee.email, employee.department]
        );
      }
    }

    // Check if admin exists
    const adminCount = await get('SELECT COUNT(*) as count FROM admins');
    if (adminCount.count === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await run(
        'INSERT INTO admins (id, username, password_hash, email) VALUES (?, ?, ?, ?)',
        [uuidv4(), 'admin', hashedPassword, 'admin@company.com']
      );
    }
  }

  async generateTicketNumber(): Promise<string> {
    const today = format(new Date(), 'yyyy-MM-dd');
    const get = promisify(this.db.get.bind(this.db));
    const run = promisify(this.db.run.bind(this.db));

    let counter = await get('SELECT counter FROM daily_counters WHERE date = ?', [today]);
    
    if (!counter) {
      await run('INSERT INTO daily_counters (date, counter) VALUES (?, 1)', [today]);
      return '0001';
    } else {
      const newCounter = counter.counter + 1;
      await run('UPDATE daily_counters SET counter = ? WHERE date = ?', [newCounter, today]);
      return newCounter.toString().padStart(4, '0');
    }
  }

  async createVisitor(visitorData: {
    visitorName: string;
    visitorEmail?: string;
    visitorPhone?: string;
    visitorCompany?: string;
    visitingEmployee: string;
    purpose?: string;
  }) {
    const run = promisify(this.db.run.bind(this.db));
    
    const id = uuidv4();
    const ticketNumber = await this.generateTicketNumber();
    
    await run(`
      INSERT INTO visitors (
        id, ticket_number, visitor_name, visitor_email, visitor_phone, 
        visitor_company, visiting_employee, purpose
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id, ticketNumber, visitorData.visitorName, visitorData.visitorEmail,
      visitorData.visitorPhone, visitorData.visitorCompany, 
      visitorData.visitingEmployee, visitorData.purpose
    ]);

    return { id, ticketNumber };
  }

  async checkOutVisitor(ticketNumber: string) {
    const run = promisify(this.db.run.bind(this.db));
    
    await run(`
      UPDATE visitors 
      SET check_out_time = CURRENT_TIMESTAMP, status = 'checked_out'
      WHERE ticket_number = ? AND status = 'checked_in'
    `, [ticketNumber]);
  }

  async getEmployees() {
    const all = promisify(this.db.all.bind(this.db));
    return await all('SELECT * FROM employees WHERE is_active = 1 ORDER BY name');
  }

  async getVisitors(limit = 50, offset = 0) {
    const all = promisify(this.db.all.bind(this.db));
    return await all(`
      SELECT v.*, e.name as employee_name, e.department
      FROM visitors v
      LEFT JOIN employees e ON v.visiting_employee = e.id
      ORDER BY v.check_in_time DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
  }

  async getTodayVisitors() {
    const all = promisify(this.db.all.bind(this.db));
    const today = format(new Date(), 'yyyy-MM-dd');
    
    return await all(`
      SELECT v.*, e.name as employee_name, e.department
      FROM visitors v
      LEFT JOIN employees e ON v.visiting_employee = e.id
      WHERE DATE(v.check_in_time) = ?
      ORDER BY v.check_in_time DESC
    `, [today]);
  }

  async getVisitorStats(days = 7) {
    const all = promisify(this.db.all.bind(this.db));
    const startDate = format(new Date(Date.now() - days * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    
    return await all(`
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

  async authenticateAdmin(username: string, password: string) {
    const get = promisify(this.db.get.bind(this.db));
    const bcrypt = require('bcryptjs');
    
    const admin = await get('SELECT * FROM admins WHERE username = ?', [username]);
    if (!admin) return null;
    
    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) return null;
    
    return { id: admin.id, username: admin.username, email: admin.email };
  }

  async findVisitorByTicket(ticketNumber: string) {
    const get = promisify(this.db.get.bind(this.db));
    return await get(`
      SELECT v.*, e.name as employee_name, e.department
      FROM visitors v
      LEFT JOIN employees e ON v.visiting_employee = e.id
      WHERE v.ticket_number = ?
    `, [ticketNumber]);
  }
}

export const database = new Database();
