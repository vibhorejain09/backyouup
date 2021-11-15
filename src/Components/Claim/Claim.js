import React, {useState, useRef} from 'react'
import './Claim.css'
import {addDoc, collection} from "@firebase/firestore"
import { useNavigate } from "react-router-dom"
import {db} from "../../Utils/firebase"
import { Container, Box, Grid, TextField, Typography, Button, Alert } from "@mui/material"
import { InsertDriveFile } from "@mui/icons-material";
function Claim() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const navigate = useNavigate()
    const formRef=useRef()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setMessage("")
        setSeverity("")
        if(!formRef.current.reportValidity()){
            setLoading(false)
            return
        }
        await addDoc(collection(db, "claimantData"), {email: email, name: name, msg: msg}).then(
             navigate("/")   
        ).catch(
            () => {setMessage("Something went wrong.."); setSeverity("error")}
        )
    }
    return (
        <div id="claim">
            <Container component="main" maxWidth="xs">
                <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                    <InsertDriveFile fontSize="large" />
                </Box>
                <Typography component="h2" variant="h5" sx={{ textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "bold" }}>
                    Claim Policy
                </Typography>
                {message ? <Alert severity={severity}>{message}</Alert> :""}
                <Box ref={formRef} onSubmit={handleSubmit} component="form"  noValidate sx={{ mt: 4 }}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} >
                            <TextField onChange={e => setName(e.target.value)} required fullWidth id="name" label="Full Name" name="name" autoComplete="name"  value={name}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField  onChange={e => setEmail(e.target.value)} required fullWidth id="email" label="Email Address" name="email" autoComplete="email"  value={email}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField  onChange={e => setMsg(e.target.value)} required multiline fullWidth id="msg" label="Write Reason of Claim in 150-200 words" name="msg" value={msg}/>
                        </Grid>

                    </Grid>
                    <Button type="submit"  disabled={loading} fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} style={{ backgroundColor: "rgb(var(--green-color))" }}>
                        Submit
                    </Button>
                </Box>
            </Container>
        </div>
    )
}

export default Claim
