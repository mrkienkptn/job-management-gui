import React from 'react'

import Home from '../pages/home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Drawer from '../components/base_layout/Drawer'
export const routes = [
  {
    path: "/",
    main: Login
  },
  {
    path: "/login",
    main: Login
  },
  {
    path: "/register",
    main:  Register
  },
  // {
  //   path: "/create-project"
  // }
];

