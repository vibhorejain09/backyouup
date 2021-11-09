import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
function PrivateRoute({children}) {
  const { currentUser } = useAuth()

        return currentUser ? (
          currentUser.emailVerified ? (
            children
          ) : (
            <Navigate to="/verifyemail" />
          )
        ) : (
          <Navigate to="/" />
        )
}

export default PrivateRoute