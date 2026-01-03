// components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background ">
      <Navbar />
      <main className="pt-16">
        {" "}
        {/* Offset for fixed navbar */}
        <Outlet />
      </main>
    </div>
  );
}
