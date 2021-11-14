import React, {useState, useRef} from 'react'
import "./Login.css"
import { Container, Box, Grid, TextField, Typography, Button, Link, Alert } from "@mui/material"
import { Login as LoginIcon } from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../Contexts/AuthContext'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const {login} = useAuth()
    const formRef = useRef()
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setMessage("")
        setSeverity("")
        if(!formRef.current.reportValidity()){
            setLoading(false)
            return
        }
            await login(email, password)
            .then(() => {  
              navigate("/")
            })
            .catch((err) => {
              setSeverity("error")
              if (err.code === "auth/user-not-found") {
                setMessage(
                  "You are not registered with us. Please Sign Up and Log in again."
                )
              } else if (err.code === "auth/wrong-password") {
                setMessage("Incorrect Password")
              } else if (err.code === "auth/network-request-failed") {
                setMessage("Failed to connect to internet")
              } else if (err.code === "auth/timeout") {
                setMessage("Connection Timeout")
              } else {
                setMessage("Sorry. It didn't work.")
              }
              setLoading(false)
            })

    }
    return (
        <div id="login">
            <Container component="main" maxWidth="xs">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2}}>
                    <LoginIcon fontSize="large" />
                </Box>
                <Typography component="h2" variant="h5" sx={{textAlign: "center"}} style={{color: "rgb(var(--green-color))", fontWeight: "bold"}}>
                    Sign in
                </Typography>
            {
                message && <Alert severity={severity}>{message}</Alert>
            }
                <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                    <Grid container spacing={3}>
                        
                        <Grid item xs={12} >
                            <TextField onChange={e => setEmail(e.target.value)} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField  onChange={e => setPassword(e.target.value)} required fullWidth id="password" label="Password" type="password" name="password" value={password}/>
                        </Grid>
                        
                    </Grid>
                    <Button type="submit" disabled={loading} fullWidth variant="contained" sx={{mt: 2, mb: 2}} style={{backgroundColor: "rgb(var(--green-color))"}}>
                    {loading ? "Signing In.." : "Sign In"}
                    </Button>
                    <Grid container justifyContent = "center">
                        <Grid item sx={{mb:2}}>
                            <Link href="forgotpassword" underline="none" style={{color: "rgb(var(--blackshade-color))"}}>
                                Forgot Password ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" underline="none" style={{color: "rgb(var(--blackshade-color))"}}>
                                Don't have an account? Sign Up.
                            </Link>
                        </Grid>  
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default Login
