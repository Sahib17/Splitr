import { useAuth } from "@/context/useAuth"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute