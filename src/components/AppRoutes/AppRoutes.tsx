import { Route, Routes } from "react-router-dom";
import { Start } from "../Start";
import { Menu } from "../Menu";

export const AppRoutes = () => (
    <Routes>
      <Route index element={<Start />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
)