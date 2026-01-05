import React, { useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import ProfessorDashboard from "./pages/ProfessorDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentReservation from "./pages/StudentReservation.jsx";
import ProfessorReservation from "./pages/ProfessorReservation.jsx";
import AdminSoftware from "./pages/AdminSoftware.jsx";
import Announcements from "./pages/Announcements.jsx";
import MalfunctionReport from "./pages/MalfunctionReport.jsx";
import AdminReports from "./pages/AdminReports.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminReservations from "./pages/AdminReservations.jsx";
import { getCurrentUser, logout } from "./services/authService";

function ProtectedLayout({ user, children, onLogout }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-container">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => getCurrentUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const onLoginSuccess = (nextUser) => {
    setUser(nextUser);
    if (nextUser.role === "admin") {
      navigate("/admin/dashboard");
    } else if (nextUser.role === "professor") {
      navigate("/professor/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  const defaultRoute = useMemo(() => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "professor") return "/professor/dashboard";
    return "/student/dashboard";
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      <Route path="/login" element={<Login onSuccess={onLoginSuccess} />} />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <StudentDashboard user={user} />
          </ProtectedLayout>
        }
      />
      <Route
        path="/student/reservation"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <StudentReservation user={user} />
          </ProtectedLayout>
        }
      />

      <Route
        path="/professor/dashboard"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <ProfessorDashboard user={user} />
          </ProtectedLayout>
        }
      />
      <Route
        path="/professor/reservation"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <ProfessorReservation user={user} />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <AdminDashboard user={user} />
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/software"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <AdminSoftware />
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <AdminReports />
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <AdminUsers />
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/reservations"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <AdminReservations />
          </ProtectedLayout>
        }
      />

      <Route
        path="/announcements"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <Announcements />
          </ProtectedLayout>
        }
      />
      <Route
        path="/malfunction-report"
        element={
          <ProtectedLayout user={user} onLogout={handleLogout}>
            <MalfunctionReport user={user} />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
}
