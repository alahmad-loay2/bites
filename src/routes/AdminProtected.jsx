import { Navigate, Outlet } from "react-router-dom";
import getUserInfo from "../firebase/getUserInfo";
import Loading from "../components/Loading";

const AdminProtected = () => {
  const { userInfo, loading } = getUserInfo();
  if (loading) return <Loading text={"Loading Admins..."}/>;
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default AdminProtected;