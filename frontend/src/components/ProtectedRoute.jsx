import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap any page that requires login (and optionally specific roles):
// <ProtectedRoute roles={["organizer","admin"]}><CreateEventPage/></ProtectedRoute>
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
