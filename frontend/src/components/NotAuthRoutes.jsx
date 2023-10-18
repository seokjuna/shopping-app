import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function NotAuthRoutes({ isAuth }) {
  return (
    isAuth ? <Navigate to={'/'} /> : <Outlet />
  )
}

export default NotAuthRoutes