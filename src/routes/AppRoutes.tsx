import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";
import Favorites from "../pages/Favorites";
import ProductDetail from "../pages/ProductDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="/favorites" element={<Favorites />} /> */}
      </Route>
    </Routes>
  );
}
