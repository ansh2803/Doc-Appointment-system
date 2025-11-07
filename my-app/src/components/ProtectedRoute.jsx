import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { getUser } from "../redux/features/userSlice"; // use the correct action name

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // ✅ fetch user data from backend
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        dispatch(getUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        // localStorage.removeItem("token");
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("Error in ProtectedRoute:", error);
      // localStorage.removeItem("token");
      localStorage.clear();
    }
  };

  // ✅ useEffect should be OUTSIDE getUserData
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getUserData();
    }
  }, [user]);

  // ✅ handle navigation properly
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div>Loading...</div>; // can replace with your spinner component
  }

  return children;
};

export default ProtectedRoute;
// export import {username , setname} from './data.jsx';