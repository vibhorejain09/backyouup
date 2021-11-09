import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
function FreeRoute({ children}) {
  const { currentUser } = useAuth()
  return (
  currentUser ? currentUser.emailVerified ? children : <Navigate to="/verifyemail"/> : children
  )
}

export default FreeRoute