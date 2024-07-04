import { Outlet } from "react-router-dom";
import TheNavBar from "../components/TheNavBar";

const TheGuestLayout = () => {
  return (
    <div>
      <TheNavBar />
      <Outlet />
    </div>
  );
};

export default TheGuestLayout;
