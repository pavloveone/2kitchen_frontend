import { Route, Routes } from 'react-router-dom';
import { Start } from '../Start';
import { Menu } from '../Menu';
import { CheckoutOrder } from '../CheckoutOrder';
import { AdminPanel } from '../Admin';
import { OrderSuccess } from '../OrderSuccess';

export const AppRoutes = () => (
  <Routes>
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/order-success" element={<OrderSuccess />} />
    <Route index element={<Start />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/checkout" element={<CheckoutOrder />} />
  </Routes>
);
