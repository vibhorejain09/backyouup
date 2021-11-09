import React, { useState } from "react"
import { Alert, Box, Button, Typography } from "@mui/material"
import { useAuth } from "../../Contexts/AuthContext"
import { sendEmailVerification } from "firebase/auth"
function VerifyEmail() {
  const [loading, setLoading] = useState(false)
  const [severity, setSeverity] = useState("")
  const [message, setMessage] = useState(null)
  const { currentUser } = useAuth()
  console.log(currentUser)
  async function handleSubmit() {
    setLoading(true)
    setMessage(null)
    setSeverity("")
    await sendEmailVerification(currentUser)
      .then(() => {
        setMessage("Verification Email Sent!!")
        setSeverity("success")
        setLoading(false)
      })
      .catch(() => {
        setMessage("Something went wrong. Please try again..")
        setSeverity("error")
        setLoading(false)
      })
  }
  return (
    <Box sx={{ pt: 12, display: "flex", justifyContent: "center", minHeight:"100vh" }}>
      <Box sx={{ maxWidth: "800px" }}>
        {message && <Alert severity={severity}>{message}</Alert>}
        <Typography component="h2" variant="h5" sx={{ textAlign: "center", color: "rgb(var(--green--color))" }}>Please verify your account to continue</Typography>
        <Button variant="contained" disabled={loading} onClick={handleSubmit}>
           Send Email
        </Button>
      </Box>
    </Box>
  )
}

export default VerifyEmail