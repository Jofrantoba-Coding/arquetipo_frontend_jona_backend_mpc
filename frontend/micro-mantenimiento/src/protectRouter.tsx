// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

/* Cookie Storage */
import { getToken } from './methods/storage'

const ProtectedRoute = () => {
  const auth = getToken()

  return auth
    ? <Outlet />
    : <Navigate to={`/login`} replace />
}

export default ProtectedRoute