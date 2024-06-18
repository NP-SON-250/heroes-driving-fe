import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLay from "./components/Loyouts/UserLay";
import LoginRegisterLayt from "./components/Loyouts/LoginRegisterLayt";
import Layouts from "./components/Admin/Layouts";
import Home from "./components/Contents/Home";
import Blogs from "./components/Contents/Blogs";
import Login from "./components/Contents/Login";
import Register from "./components/Contents/Register";
import Dashboards from "./components/Admin/Dashboards";
import Users from "./components/Admin/Users/Users";
import Reports from "./components/Admin/Reports/Reports";
import Payments from "./components/Admin/Payments/Payments";
import Settings from "./components/Admin/Settings/Settings";
import AdminCategories from "./components/Admin/Categories/AdminCategories";
import Questions from "./components/Admin/Categories/Questions";
import Options from "./components/Admin/Categories/Options";
import ConductExam from "./Users/Conduct";
import UserFreeExams from "./components/Contents/UserFreeExams";
import UserPaidExams from "./components/Contents/UserPaidExams";
import PrivateRoute from "./components/PrivateRoute ";
import ExamResponses from "./Users/ExamResponses";
const App = () => {
  return (
    <>
      <Routes>
        {/* Users routes */}
        <Route element={<UserLay />}>
          <Route index element={<Home />} />
          <Route path="/users/exams" element={<UserFreeExams />} />
          <Route path="/paidexams" element={<UserPaidExams />} />
          <Route path="/users/conduct/:id" element={<ConductExam />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/responses" element={<ExamResponses />} />
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
            path="admin/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/blogs"
            element={
              <PrivateRoute>
                <Settings />
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
        </Route>
      </Routes>
    </>
  );
};

export default App;
