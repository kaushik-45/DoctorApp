import React from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../data/Data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge } from "antd";
import swal from "sweetalert";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //logout function
  const handleLogout = () => {
    localStorage.clear();
    swal({
      title: "Logout Successfully",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
    navigate("/login");
  };
  //==== doctor Menu ====
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <ListIcon />,
    },
    {
      name: "Profile",
      path: `/doctor/profile/:${user?._id}`,
      icon: <AccountCircleIcon />,
    },
  ];

  //==== doctor Menu ====
  //rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                return (
                  <>
                    <div className="menu-item">
                      <span className="icon"> {menu.icon}</span>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <span className="icon">
                  <LogoutIcon />
                </span>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user ? user.notification.length : "0"}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <NotificationsActiveIcon />
                </Badge>
                {<Link to="/"> {user ? user.name : "No user"}</Link>}
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
