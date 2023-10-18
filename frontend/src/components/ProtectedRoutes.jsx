import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes({ isAuth }) {
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default ProtectedRoutes