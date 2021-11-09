import React, {useState, useRef} from 'react'
import "./ForgotPassword.css"
import { Container, Box, Grid, TextField, Typography, Button, Link, Alert } from "@mui/material"
import { Login as LoginIcon } from "@mui/icons-material";
import { useAuth } from '../../Contexts/AuthContext'

function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [severity, setSeverity] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const formRef=useRef()
    const { resetPassword } = useAuth()
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setSeverity("")
      setMessage("")
      try {
        await resetPassword(email)
        setSeverity("success")
        setMessage(
          "Password reset email sent. Check your email for further instructions"
        )
      } catch (err) {
        setSeverity("error")
        console.log(err)
        if (err.code === "auth/invalid-email") {
          setMessage("Please enter a valid email")
        }
        if (err.code === "auth/missing-email") {
          setMessage("Please enter email")
        }
         else if (err.code === "auth/user-not-found") {
          setMessage("User does not exist")
        } else {
          setMessage("Something went wrong")
        }
      }
      setLoading(false)
    }
    return (
            <div id="forgotpassword">
                <Container component="main" maxWidth="xs">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                        <LoginIcon />
                    </Box>
                    <Typography component="h2" variant="h5" sx={{ textAlign: "center" }} style={{color: "rgb(var(--green-color))", fontWeight: "bold"}}>
                        Forgot Password
                    </Typography>
                    {message ? <Alert severity={severity}>{message}</Alert> : ""}
                    <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} >
                                <TextField onChange={e => setEmail(e.target.value)} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} />
                            </Grid>

                        </Grid>
                        <Button type="submit" fullWidth disabled={loading} variant="contained" sx={{ mt: 2, mb: 1 }} style={{backgroundColor: "rgb(var(--green-color))"}}>
                            {loading ? "Sending Link.." : "Send Link"}
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item sx={{  width: "100%" }}>
                                <Link href="/login" underline="none">
                                    <Button fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} style={{backgroundColor: "rgb(var(--green-color))"}}>
                                        Sign In
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
    )
}

export default ForgotPassword

