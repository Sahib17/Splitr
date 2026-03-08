import { Button } from "@/components/ui/button"
import { logout } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/useAuth"

const LogoutButton = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleLogout = async () => {
    navigate('/');
    await logout()
    setUser(null)
  }

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton