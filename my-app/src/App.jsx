import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";

function App() {
  // const [count, setCount] = useState(0)
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />

          </Routes>

        )}
        {/* <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/register' element={<Register/>}/>

      </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
