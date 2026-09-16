import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const sessionRaw = sessionStorage.getItem('ricgcw_admin_session') || localStorage.getItem('ricgcw_admin_session');

  let isAuthenticated = false;
  if (sessionRaw) {
    if (sessionRaw === 'active' || sessionRaw === 'true') {
      isAuthenticated = true;
    } else {
      try {
        const parsed = JSON.parse(sessionRaw);
        if (parsed?.authenticated) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
