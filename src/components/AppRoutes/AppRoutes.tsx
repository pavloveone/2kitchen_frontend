import { Route, Routes } from 'react-router-dom';
import { Start } from '../Start';
import { Menu } from '../Menu';
import { CheckoutOrder } from '../CheckoutOrder';

export const AppRoutes = () => (
  <Routes>
    <Route index element={<Start />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/order/:orderId" element={<CheckoutOrder />} />
  </Routes>
);
