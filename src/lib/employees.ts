export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  title?: string;
}

export const EMPLOYEES: Employee[] = [
  {
    id: 'emp_001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    title: 'Senior Software Engineer'
  },
  {
    id: 'emp_002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    title: 'Marketing Manager'
  },
  {
    id: 'emp_003',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    department: 'Sales',
    title: 'Sales Director'
  },
  {
    id: 'emp_004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Human Resources',
    title: 'HR Manager'
  },
  {
    id: 'emp_005',
    name: 'David Brown',
    email: 'david.brown@company.com',
    department: 'Engineering',
    title: 'Frontend Developer'
  },
  {
    id: 'emp_006',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Design',
    title: 'UX Designer'
  },
  {
    id: 'emp_007',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Engineering',
    title: 'Backend Developer'
  },
  {
    id: 'emp_008',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    department: 'Finance',
    title: 'Financial Analyst'
  },
  {
    id: 'emp_009',
    name: 'Tom Anderson',
    email: 'tom.anderson@company.com',
    department: 'Operations',
    title: 'Operations Manager'
  },
  {
    id: 'emp_010',
    name: 'Anna Kowalski',
    email: 'anna.kowalski@company.com',
    department: 'Marketing',
    title: 'Content Marketing Specialist'
  },
  {
    id: 'emp_011',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Sales',
    title: 'Account Executive'
  },
  {
    id: 'emp_012',
    name: 'Rachel Green',
    email: 'rachel.green@company.com',
    department: 'Customer Success',
    title: 'Customer Success Manager'
  },
  {
    id: 'emp_013',
    name: 'Kevin Park',
    email: 'kevin.park@company.com',
    department: 'Engineering',
    title: 'DevOps Engineer'
  },
  {
    id: 'emp_014',
    name: 'Sophie Turner',
    email: 'sophie.turner@company.com',
    department: 'Legal',
    title: 'Legal Counsel'
  },
  {
    id: 'emp_015',
    name: 'Daniel Kim',
    email: 'daniel.kim@company.com',
    department: 'Product',
    title: 'Product Manager'
  },
  {
    id: 'emp_016',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@company.com',
    department: 'Design',
    title: 'Visual Designer'
  },
  {
    id: 'emp_017',
    name: 'Ryan Thompson',
    email: 'ryan.thompson@company.com',
    department: 'Engineering',
    title: 'QA Engineer'
  },
  {
    id: 'emp_018',
    name: 'Amanda Lee',
    email: 'amanda.lee@company.com',
    department: 'Human Resources',
    title: 'Talent Acquisition Specialist'
  },
  {
    id: 'emp_019',
    name: 'Chris Evans',
    email: 'chris.evans@company.com',
    department: 'Sales',
    title: 'Sales Representative'
  },
  {
    id: 'emp_020',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@company.com',
    department: 'Finance',
    title: 'Accounting Manager'
  }
];

export const getEmployeeById = (id: string): Employee | undefined => {
  return EMPLOYEES.find(employee => employee.id === id);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return EMPLOYEES.filter(employee => employee.department === department);
};

export const getAllDepartments = (): string[] => {
  const departments = new Set(EMPLOYEES.map(employee => employee.department));
  return Array.from(departments).sort();
};
