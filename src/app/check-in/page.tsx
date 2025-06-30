import { CheckinModule } from '../../modules/CheckinModule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check In - Visitor Kiosk',
  description: 'Check in to the facility. Enter your information and select the person you are visiting.',
  keywords: ['check in', 'visitor check in', 'visitor registration', 'facility entry', 'appointment check in']
};

const CheckInPage = () => {
  return <CheckinModule />
}

export default CheckInPage
