import { Navigate, Outlet, useParams } from 'react-router-dom'
import { getToken } from './methods/storage'

const ProtectedRoute = () => {
  const auth = getToken()
  const { workspace, group } = useParams()

  return auth
    ? (
    <Outlet />
      )
    : (
    <Navigate to={`/login`} />
      )
}

export default ProtectedRoute
