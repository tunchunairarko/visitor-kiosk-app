import { AdminLoginModule } from '../../modules/AdminLoginModule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - Visitor Kiosk',
  description: 'Admin login portal for the Visitor Kiosk system. Access administrative features and visitor management tools.',
  keywords: ['admin login', 'administrator', 'visitor management', 'admin portal', 'system administration']
};

const AdminLoginPage = () => {
  return <AdminLoginModule />
}

export default AdminLoginPage
