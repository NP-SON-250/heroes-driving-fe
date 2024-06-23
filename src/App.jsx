import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLay from "./components/Loyouts/UserLay";
import LoginRegisterLayt from "./components/Loyouts/LoginRegisterLayt";
import Layouts from "./components/Admin/Layouts";
import Home from "./components/Contents/Home";
import Login from "./components/Contents/Login";
import Register from "./components/Contents/Register";
import Dashboards from "./components/Admin/Dashboards";
import Users from "./components/Admin/Users/Users";
import Payments from "./components/Admin/Payments/Payments";
import AdminBlogs from "./components/Admin/Blogs/Blogs";
import Exams from "./components/Admin/Exams/Exams";
import AdminCategories from "./components/Admin/Exams/AdminCategories";
import Questions from "./components/Admin/Exams/Questions";
import Options from "./components/Admin/Exams/Options";
import ConductExam from "./Users/Conduct";
import PaidCategories from "./components/PaidCategories/PaidCategories";
import PrivateRoute from "./components/PrivateRoute ";
import ExamResponses from "./Users/ExamResponses";
const App = () => {
  return (
    <>
      <Routes>
        {/* Users routes */}
        <Route element={<UserLay />}>
          <Route index element={<Home />} />
          <Route path="/categories" element={<PaidCategories />} />
          <Route path="/users/conduct/:id" element={<ConductExam />} />
          <Route path="/test/results" element={<ExamResponses />} />
        </Route>
        {/* Login register routes */}
        <Route element={<LoginRegisterLayt />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Admin route */}
        <Route element={<Layouts />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboards />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/categories"
            element={
              <PrivateRoute>
                <AdminCategories />
              </PrivateRoute>
            }
          />
          <Route
            path="/admins/exams/:id"
            element={
              <PrivateRoute>
                <Exams />
              </PrivateRoute>
            }
          />
          <Route
            path="/admins/questions/:id"
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
          <Route
            path="/admins/options/:id"
            element={
              <PrivateRoute>
                <Options />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/payments"
            element={
              <PrivateRoute>
                <Payments />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/blogs"
            element={
              <PrivateRoute>
                <AdminBlogs />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
