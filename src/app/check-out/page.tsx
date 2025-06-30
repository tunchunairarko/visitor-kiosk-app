import { CheckoutModule } from '../../modules/CheckoutModule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check Out - Visitor Kiosk',
  description: 'Check out from the facility. Complete your visit by checking out through the visitor kiosk system.',
  keywords: ['check out', 'visitor check out', 'exit registration', 'facility exit', 'visit completion']
};

const CheckOutPage = () => {
  return <CheckoutModule />
}

export default CheckOutPage
