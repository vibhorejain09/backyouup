import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
function VerifiedRoute({ children }) {
  const { currentUser } = useAuth()
  console.log(currentUser)
        return currentUser && !currentUser.emailVerified ? children : <Navigate to="/"/>  
}

export default VerifiedRoute