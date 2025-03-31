import { Navigate, Outlet } from "react-router-dom";
import getUserInfo from "../firebase/getUserInfo";

const AdminProtected = () => {
  const { userInfo, loading } = getUserInfo();
  if (loading) return <p>Loading...</p>;
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default AdminProtected;