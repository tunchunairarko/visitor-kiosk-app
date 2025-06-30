import { AdminDashboardModule } from '../../../modules/AdminDashboardModule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Visitor Kiosk',
  description: 'Administrative dashboard for managing visitors, viewing statistics, and exporting visitor data from the kiosk system.',
  keywords: ['admin dashboard', 'visitor statistics', 'visitor management', 'data export', 'administrative panel', 'visitor reports']
};

const AdminDashboard = () => {
  return <AdminDashboardModule />
}

export default AdminDashboard
