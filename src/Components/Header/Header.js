import React, { useState } from 'react'
import './Header.css'
import useWindowWidth from "../../Utils/windowWidth";
import headerlogo from '../../Assets/backyouup.svg';
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { People, Info, LiveHelp, Home, Menu, Login, Logout, Dashboard as DashboardIcon, ContactMail, AccountCircle } from "@mui/icons-material";
import scrollToElement from "../../Utils/scrollToElement";
import { useAuth } from '../../Contexts/AuthContext';
import { Link } from "@mui/material"
import { useNavigate } from 'react-router-dom'
function Header() {
    const width = useWindowWidth();
    const [open, setOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    console.log(currentUser);
    const toggleDrawer = (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(!open);
    };
    const handleLogout = async () => {
        try {

            await logout()
        }
        catch {
            alert("Failed to logout")
        }
    }
    return (
        <div id="header" style={{
            justifyContent: width > 800 ? "space-around" : "space-between",
            padding: width > 800 ? "0.75rem 0" : "0.75rem 0rem"
        }}>
            <div className="header-logo">
                <img src={headerlogo} height="50px" alt="backyouup" className="header-logo-byu" />
            </div>
            {width < 800 ? (
                <React.Fragment key={"left"}>
                    <Button onClick={toggleDrawer}><Menu fontSize="large" /></Button>
                    <Drawer anchor="left" open={open} onClose={toggleDrawer} >
                        <div
                            style={{ width: "250px", zIndex: 9 }}
                            role="presentation"
                            onClick={toggleDrawer}
                            onKeyDown={toggleDrawer}
                        >
                            <div className="header-logo">
                                <img src={headerlogo} height="50px" alt="backyouup" className="header-logo-byu" />
                            </div>
                            <List>

                                <ListItem className="sidebar-link " button component="a" href="#home" key={"Home"}>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <Link href="/" underline="none" color="rgb(var(--blackshade-color)" >
                                        <ListItemText primary={"Home"} />
                                    </Link>
                                </ListItem>


                                <ListItem className="sidebar-link" button component="a" href="#aboutus" key={"About Us"}>
                                    <ListItemIcon>
                                        <Info />
                                    </ListItemIcon>
                                    <Link href="/" underline="none" color="rgb(var(--blackshade-color)" >
                                        <ListItemText primary={"About us"} />
                                    </Link>
                                </ListItem>


                                <ListItem className="sidebar-link" button component="a" href="#faqs" key={"FAQs"}>
                                    <ListItemIcon>
                                        <LiveHelp />
                                    </ListItemIcon>
                                    <Link href="/" underline="none" color="rgb(var(--blackshade-color)" >
                                        <ListItemText primary={"FAQs"} />
                                    </Link>
                                </ListItem>


                                <ListItem className="sidebar-link" button component="a" href="#team" key={"Team"}>
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <Link href="/" underline="none" color="rgb(var(--blackshade-color)" >
                                        <ListItemText primary={"Team"} />
                                    </Link>
                                </ListItem>

                                {
                                    currentUser ?

                                        <>
                                            <Link href="/" underline="none" color="rgb(var(--blackshade-color)" >
                                                <ListItem className="sidebar-link" button component="a" href="#dashboard" key={"Dashboard"}>
                                                    <ListItemIcon>
                                                        <DashboardIcon />
                                                    </ListItemIcon>
                                                    <Link href="/dashboard" underline="none" color="rgb(var(--blackshade-color)" >
                                                        <ListItemText primary={"Dashboard"} />
                                                    </Link>
                                                </ListItem>
                                            </Link>
                                            <ListItem className="sidebar-link" button component="a" href="#conatctus" key={"ContactUs"}>
                                                <ListItemIcon>
                                                    <ContactMail />
                                                </ListItemIcon>
                                                <Link href="/contactus" underline="none" color="rgb(var(--blackshade-color)" >
                                                    <ListItemText primary={"Contact Us"} />
                                                </Link>
                                            </ListItem>
                                            <ListItem className="sidebar-link" button component="a" href="#profile" key={"profile"}>
                                                <ListItemIcon>
                                                    <AccountCircle />
                                                </ListItemIcon>
                                                <span style={{ backgroundColor: "rgb(var(--green-color))", borderRadius: "10px", color: "rgb(var(--home-color))", padding: "0.5rem 0.5rem" }}><Link href="/profile" underline="none" color="rgb(var(--green-color)">{currentUser.displayName[0]}</Link></span>
                                            </ListItem>
                                        </> : " "
                                }
                                {
                                    currentUser ?
                                        <ListItem className="sidebar-link" button onClick={handleLogout} component="a" >
                                            <ListItemIcon>
                                                <Logout />
                                            </ListItemIcon>
                                            <div className="login-btn-container">
                                                <div className="btn">
                                                    <Link href="/" underline="none" color="rgb(var(--green-color)">
                                                        Logout
                                                    </Link>
                                                </div>
                                            </div>
                                        </ListItem> :
                                        <ListItem className="sidebar-link" button component="a" >
                                            <ListItemIcon>
                                                <Login />
                                            </ListItemIcon>
                                            <div className="login-btn-container">
                                                <div className="btn">
                                                    <Link href="/login" underline="none" color="rgb(var(--green-color)">
                                                        Login
                                                    </Link>
                                                </div>
                                            </div>
                                        </ListItem>
                                }
                            </List>
                        </div>
                    </Drawer>
                </React.Fragment>
            ) : (
                <ul className="header-items">
                    <li onClick={() => { navigate("/"); scrollToElement("home") }}>Home </li>
                    <li onClick={() => { navigate("/"); scrollToElement("aboutus") }}> About Us</li>
                    <li onClick={() => { navigate("/"); scrollToElement("faqs") }}>FAQs</li>
                    <li onClick={() => { navigate("/"); scrollToElement("team") }}>Team</li>
                    {
                        currentUser ?

                            <>
                                <li ><Link href="/dashboard" underline="none" color="rgb(var(--green-color)">Dashboard</Link></li>
                                <li ><Link href="/contactus" underline="none" color="rgb(var(--green-color)">Contact Us</Link></li>

                                <span style={{ backgroundColor: "rgb(var(--green-color))", borderRadius: "10px", color: "rgb(var(--home-color))", padding: "0.5rem 0.5rem" }}><Link href="/profile" underline="none" color="rgb(var(--green-color)">{currentUser.displayName ? currentUser.displayName[0] : "B"}</Link></span>
                            </> : " "
                    }
                    <span>
                        <div className="login-btn-container">
                            <div className="btn">
                                {currentUser ? <span onClick={handleLogout}><Link href="/" underline="none" color="rgb(var(--green-color)">Logout</Link></span> :
                                    <Link href="/login" underline="none" color="rgb(var(--green-color)">
                                        Login
                                    </Link>
                                }
                            </div>
                        </div>
                    </span>
                </ul>
            )
            }
        </div>
    )
}

export default Header
