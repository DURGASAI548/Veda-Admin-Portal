import React, { Component } from "react";
import { Navigate } from "react-router-dom";


// Dashboard

import DashboardFinal from "../Dashboardfolder/rootdashbord.js";
import SecondDashboard from "../Dashboardfolder/secondrootdashboard.js"

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";

import Login1 from "../Pages/AuthenticationPages/Login";
import Register1 from "../Pages/AuthenticationPages/Register";
import RecoverPassword from "../Pages/AuthenticationPages/RecoverPassword";
import LockScreen from "../Pages/AuthenticationPages/LockScreen";

import Maintenance from "../Pages/Utility/Maintenance-Page";
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";
// added dummy comment  
// Import UIElement Pages
import ParentComponent from "../Pages/Forms/ParentComponent.js";
// Import Forms

import FormValidations from "../Pages/Forms/FormValidations";
import AddFaculty from "../Pages/Forms/AddFacultyAdmin.js";
import AddStudent from "../Pages/Forms/AddStudentAdmin.js";
import EditStudent from "../Pages/Forms/EditStudent.js";
import StudentAdminCards from "../Pages/UiElements/StudentAdminCards.jsx";

import Departments from "../Pages/Forms/Departments.js";
import FacultyAdminCards from "../Pages/UiElements/FacultyAdminCards.jsx";
import EditFaculty from "../Pages/Forms/EditFacutly.js";
import EditEvent from "../Pages/Forms/Events/EditEvent.js";
import EditDepartment from "../Pages/Forms/Departments/EditDepartment.js";
import DepartmentCards from "../Pages/UiElements/DepartmentCards.jsx";
import EventCards from "../Pages/UiElements/EventCards.jsx";
import ComingSoon1 from "../Pages/Coming/ComingSoon.jsx";

// Colors Routers
import EventCatagory from "../Pages/UiElements/EventCatogory.jsx";
import EventSubCatagorys from "../Pages/UiElements/EventSubCatagory.jsx";
import AddEventCatagory from "../Pages/Forms/colors/eventcatagory/addEventCatagory.jsx";
import EditEventCatagory from "../Pages/Forms/colors/eventcatagory/editEventCatagory.jsx";
import AddEventSubCatagory from "../Pages/Forms/colors/eventSubCatagory/addEventSubCatagory.jsx";
import EditEventSubCatagory from "../Pages/Forms/colors/eventSubCatagory/editEentSubCatagory.jsx";


const authProtectedRoutes = [

  // Forms page
  { path: "/AddEvent", component: <FormValidations /> },
  { path: "/parent", component: <ParentComponent /> },
  { path: "/AddDepartments", component: <Departments /> },
  { path: "/AddFaculty", component: <AddFaculty /> },
  { path: "/AddStudent", component: <AddStudent /> },
  { path: "/EditStudent", component: <EditStudent /> },
  { path: "/ViewStudent", component: <StudentAdminCards /> },
  { path: "/ViewFaculty", component: <FacultyAdminCards /> },
  { path: "/ViewEvents", component: <EventCards /> },
  { path: "/ViewDepartments", component: <DepartmentCards /> },
  { path: "/EditFaculty", component: <EditFaculty /> },
  { path: "/EditEvent", component: <EditEvent /> },
  { path: "/EditDepartment", component: <EditDepartment /> },
  { path: "/dashboard", component: <DashboardFinal /> },
  { path: "/Users", component: <SecondDashboard /> },


  // colors pathss
  {path: "/EventCatagory", component: <EventCatagory />},
  {path: "/EventSubCatagorys", component: <EventSubCatagorys />},
  {path: "/AddEventCatagory", component: <AddEventCatagory />},
  {path: "/EditEventCatagory", component: <EditEventCatagory />},
  {path: "/AddEventSubCatagory", component: <AddEventSubCatagory />},
  {path: "/EditEventSubCatagory", component: <EditEventSubCatagory />},


  {
    path: "",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner Pages
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <RecoverPassword /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },

  // Utility Pages
  { path: "*", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
