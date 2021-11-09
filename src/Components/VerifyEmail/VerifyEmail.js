import React, { useState } from "react"
import "./VerifyEmail.css"
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
    <div id="verify-email"> 
    <Box sx={{ pt: 12, display: "flex", justifyContent: "center", minHeight:"100vh" }}>
      <Box sx={{ maxWidth: "800px" }}>
        {message && <Alert severity={severity}>{message}</Alert>}
        <Typography component="h2" variant="h5" sx={{ textAlign: "center" }} style={{color: "rgb(var(--green-color))", fontWeight: "bold"}}>Please verify your account to continue</Typography>
        <Button variant="contained" fullWidth disabled={loading} onClick={handleSubmit} sx={{ mt: 2, mb: 2 }} style={{backgroundColor: "rgb(var(--green-color))"}}>
           Send Email
        </Button>
      </Box>
    </Box>
    </div>
  )
}

export default VerifyEmail