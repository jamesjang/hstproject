/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Database from "views/Database.jsx";
import Company from "views/Company.jsx";

const dashboardRoutes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: "pe-7s-cloud-download",
    component: Dashboard,
    layout: "/"
  },
  {
    path: "Database",
    name: "Database",
    icon: "pe-7s-server",
    component: Database,
    layout: "/"
  },
  {
    path: "Company",
    name: "Company",
    icon: "pe-7s-id",
    component: Company,
    layout: "/"
  }
  /*
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;
