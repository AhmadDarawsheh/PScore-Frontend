import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../App.css";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
export default function Root() {
  const { token, decodeToken } = useAuth();

  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);

  return (
    <div className="flex flex-row h-screen w-screen bg-neutral-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
