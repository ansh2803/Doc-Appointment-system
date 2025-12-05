import React from 'react';
import "../styles/LayoutStyles.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
// import { sidebarMenu } from './../Data/data';
import { userMenu, adminMenu } from '../Data/data';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
import { Badge } from 'antd';
import 'antd/dist/reset.css';




const Layout = ({ children }) => {
  const { user: reduxUser } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || localUser;
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  //LOGOUT function
  const handleLogout = () =>{
    localStorage.clear();
    dispatch(clearUser());
    message.success('Logout Successfully')
    Navigate('/login')
  }
  //Doctor menu
 const doctorMenu = [
    {
        name: "Home",
        path: '/',
        icon: "fa-solid fa-house-user",
    },
    {
       name: "Appointments",
       path: '/appointments',
       icon: "fa-solid fa-calendar-days",
    
    },
   
    {
        name: "Profile",
        path: `/doctor/profile/${user?._id}`,
        icon: "fa-solid fa-user",
    },
];
  
  // Filter userMenu to hide "Apply Doctor" for approved doctors
  const filteredUserMenu = userMenu.filter(menu => {
    if (menu.name === "Apply Doctor" && user?.isDoctor) {
      return false; // Hide "Apply Doctor" for approved doctors
    }
    return true;
  });

  // Update profile paths to include user ID
  const processedUserMenu = filteredUserMenu.map(menu => ({
    ...menu,
    path: menu.path === '/profile' ? `/profile/${user?._id}` : menu.path
  }));

  const processedAdminMenu = adminMenu.map(menu => ({
    ...menu,
    path: menu.path === '/profile' ? `/profile/${user?._id}` : menu.path
  }));

  //rendering menu list 
  const sidebarMenu = user?.isAdmin ? processedAdminMenu : user?.isDoctor ? doctorMenu : processedUserMenu;

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
              {sidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`menu-item ${isActive ? 'active' : ''}`}
                    key={index}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
               <div
                    className={`menu-item `} onClick={handleLogout}
                    // key={index}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    {/* <Link to="/login">Logout</Link> */}
                    <span>Logout</span>

                  </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
              <span style={{cursor:'pointer'}}
              onClick={()=> {Navigate('/notification')}}>
               <Badge count={user?.Notification?.length || 0}>
                 <i className="fa-solid fa-bell"></i>
               </Badge>
               </span>
               {user && ( <Link to={`/doctor/profile/${user?._id}`}>{user?.name}</Link>)}
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
