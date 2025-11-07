import React from 'react';
import "../styles/LayoutStyles.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
// import { sidebarMenu } from './../Data/data';
import { userMenu, adminMenu } from '../Data/data';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';

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
  //rendering menu list 
  const sidebarMenu = user?.isAdmin ? adminMenu : userMenu;

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
                <i className="fa-solid fa-bell"></i>
                <Link to='/profile'>{user?.name}</Link>
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
