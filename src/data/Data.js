import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <ListIcon />,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <PersonIcon />,
  },
];

export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: <PersonIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <AccountCircleIcon />,
  },

];
