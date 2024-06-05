import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from './methods/storage'

const ProtectedRoute = () => {
  const auth = getToken()

  return auth
    ? (
    <Outlet />
      )
    : (
    <Navigate to={`/login`} />
      )
}

export default ProtectedRoute
