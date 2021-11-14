import React, { useState, useEffect } from 'react'
import './Profile.css'
import {updateProfile} from '@firebase/auth'
import {getDoc, doc, updateDoc} from "@firebase/firestore"
import {db} from "../../Utils/firebase"
import { useAuth } from "../../Contexts/AuthContext"
import { Box, Typography } from "@mui/material"
import { AccountCircle } from "@mui/icons-material";
function Profile() {
    const { currentUser } = useAuth()
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(currentUser.displayName)
    const [editPhone, setEditPhone] = useState(false)
    const [phone, setPhone] = useState("")
    const [editAddress, setEditAddress] = useState(false)
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    console.log(currentUser)
    useEffect(()=>{
       async function fetchUserData(){
            const docSnap = await getDoc(doc(db, 'userData', currentUser.uid))
            const data = docSnap.data()
            setPhone(data.phone)
            setAddress(data.address)
            setGender(data.gender)
        }
        fetchUserData()
    }, [currentUser])
    const handleNameUpdate = async (e) => {
        e.preventDefault()
        await updateProfile(currentUser, {displayName : name})
        await updateDoc(doc(db, "userData", currentUser.uid), {
            name : name
        })
        setEditName(false)
    }
    const handlePhoneUpdate = async (e) => {
        e.preventDefault()
        await updateDoc(doc(db, "userData", currentUser.uid), {
            phone : phone
        })
        setEditPhone(false)
    }
    const handleAddressUpdate = async (e) => {
        e.preventDefault()
        
        await updateDoc(doc(db, "userData", currentUser.uid), {
            address : address
        })
        setEditAddress(false)
    }
    return (
        <div id="profile">
            <Box sx={{ p: 4, pt: 12 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                    <AccountCircle fontSize="large" style={{color: "rgb(var(--blackshade-color))"}} />
                </Box>
                <Typography component="h2" variant="h5" sx={{ pb: 5, textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "bold" }}>
                    My Profile
                </Typography>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div>Name :</div>
                    {editName ? (
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        ) : (
                            <div style={{padding: "1rem"}}>{name}</div>
                            )}
                    {editName ? (
                        <div onClick={handleNameUpdate}><span className="btn">Update</span></div>
                    ) : (
                        <div onClick={() => setEditName(true)}><span className="btn">Edit</span></div>
                    )}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div>Phone :</div>
                    {editPhone ? (
                        <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                    ) : (
                        <div style={{padding: "1rem"}} >{phone}</div>
                    )}
                    {editPhone ? (
                        <div onClick={handlePhoneUpdate}><span className="btn">Update</span></div>
                    ) : (
                        <div onClick={() => setEditPhone(true)}><span className="btn">Edit</span></div>
                        )}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div>Address :</div>
                    {editAddress ? (
                        <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                        ) : (
                            <div style={{padding: "1rem"}}>{address}</div>
                            )}
                    {editAddress ? (
                        <div onClick={handleAddressUpdate} style={{padding:"1rem"}}><span className="btn" >Update</span></div>
                        ) : (
                            <div onClick={() => setEditAddress(true)}><span className="btn">Edit</span></div>
                            )}
                        
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "1rem"}}>
                        <div> Email : </div>
                        <div style={{ paddingLeft: "1rem" }}> {currentUser.email}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" , paddingTop: "1.5rem" }}>
                        <div> Gender : </div>
                        <div style={{ paddingLeft: "1rem" }}> {gender}</div>
                    </div>
            </Box> 
        </div>
    )
}

export default Profile
