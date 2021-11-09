import React, { useState, useRef } from 'react'
import { useAuth } from "../../Contexts/AuthContext"
import "./Signup.css"
import { useNavigate } from "react-router-dom"
import { Container, Box, Grid, TextField, Typography, Select, FormControl, InputLabel, MenuItem, Button, Link, Alert } from "@mui/material"
import { Login } from "@mui/icons-material";
function Signup() {
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const { signup } = useAuth()
    const navigate = useNavigate()
    const formRef=useRef()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)
         if(!formRef.current.reportValidity())
         {
             return 
         }   
        if (password !== confirmPassword) {
            setSeverity("error")
            setLoading(false)
            return setMessage("Passwords do not match")
        }
        try {
            await signup(
                name,
                email,
                password,
                phone,
                address,
                gender,
            ).then(() => navigate("/"))
        } catch (e) {
            if (e.code === "auth/weak-password") {
                setMessage("The password is too weak.")
                setSeverity("error")
            } else if (e.code === "auth/email-already-in-use") {
                setSeverity("error")
                setMessage("Email already exists.")
            } else if (e.code === "auth/invalid-email") {
                setSeverity("error")
                setMessage("Please Enter a valid email address.")
            } else if (e.code === "auth/operation-not-allowed") {
                setSeverity("error")
                setMessage("The feature is disabled by the Admin.")
            } else {
                setSeverity("error")
                setMessage("Something unexpected happened!")
            }
            setLoading(false)
        }
    }
    return (
        <div id="signup">
            <Container component="main" maxWidth="xs" sx={{ pt: 12 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                    <Login />
                </Box>
                <Typography component="h2" variant="h5" sx={{ textAlign: "center" }}>
                    Sign Up
                </Typography>
                {message ? <Alert severity={severity}>{message}</Alert> :""}
                <Box component="form" ref={formRef} noValidate sx={{ mt: 4 }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField onChange={e => setName(e.target.value)} required fullWidth id="name" label="Full Name" name="name" autoComplete="name" value={name} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField onChange={e => setEmail(e.target.value)} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={e => setPassword(e.target.value)} required fullWidth id="password" label="Password" type="password" name="password" value={password} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={e => setConfirmPassword(e.target.value)} required fullWidth id="confirm-password" label="Confirm Password" type="password" name="confirm-password" value={confirmPassword} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={e => setPhone(e.target.value)} required fullWidth id="phone" label="Phone" name="phone" type="number" autoComplete="number" value={phone} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={e => setAddress(e.target.value)} required fullWidth id="address" label="Address" name="address" autoComplete="address" value={address} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    onChange={e => setGender(e.target.value)}
                                    required
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/login">
                                Already have an account? Sign In.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default Signup
