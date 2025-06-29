export interface Visitor {
  id: string;
  ticket_number: string;
  visitor_name: string;
  visitor_email?: string;
  visitor_phone?: string;
  visitor_company?: string;
  visiting_employee: string;
  visiting_employee_name?: string;
  visiting_employee_email?: string;
  purpose?: string;
  check_in_time: string;
  check_out_time?: string;
  status: 'checked_in' | 'checked_out';
  employee_name?: string;
  department?: string;
}

export interface CreateVisitorRequest {
  visitorName: string;
  visitorEmail?: string;
  visitorPhone?: string;
  visitorCompany?: string;
  visitingEmployee: string;
  visitingEmployeeName: string;
  visitingEmployeeEmail: string;
  purpose?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  title?: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
}

export interface VisitorStats {
  todayVisitors: number;
  activeVisitors: number;
  checkedOutToday: number;
  weeklyStats: Array<{
    date: string;
    total_visitors: number;
    checked_out: number;
    still_in: number;
  }>;
}

export interface DatabaseResult {
  [key: string]: string | number | boolean | null | undefined;
}

export interface CheckInResponse {
  success: boolean;
  visitor?: {
    id: string;
    ticketNumber: string;
  };
  error?: string;
}

export interface CheckOutResponse {
  success: boolean;
  visitor?: Visitor;
  error?: string;
}
