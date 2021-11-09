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
function Header() {
    const width = useWindowWidth();
    const [open, setOpen] = useState(false);
    const { currentUser, logout } = useAuth();
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

                                                    <ListItemText primary={"Dashboard"} />
                                                </ListItem>
                                            </Link>
                                            <ListItem className="sidebar-link" button component="a" href="#conatctus" key={"ContactUs"}>
                                                <ListItemIcon>
                                                    <ContactMail />
                                                </ListItemIcon>
                                                <ListItemText primary={"Contact Us"} />
                                            </ListItem>
                                            <ListItem className="sidebar-link" button component="a" href="#profile" key={"profile"}>
                                                <ListItemIcon>
                                                    <AccountCircle />
                                                </ListItemIcon>
                                                <span style={{ backgroundColor: "rgb(var(--green-color))", borderRadius: "10px", color: "rgb(var(--home-color))", padding: "0.5rem 0.5rem" }}>{currentUser.displayName[0]}</span>                
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

                                                    Logout

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
                    <li onClick={() => scrollToElement("home")}><Link href="/" underline="none" color="rgb(var(--blackshade-color)" >Home</Link> </li>
                    <li onClick={() => scrollToElement("aboutus")}><Link href="/" underline="none" color="rgb(var(--blackshade-color)" >About Us</Link></li>
                    <li onClick={() => scrollToElement("faqs")}><Link href="/" underline="none" color="rgb(var(--blackshade-color)" >FAQs</Link></li>
                    <li onClick={() => scrollToElement("team")}><Link href="/" underline="none" color="rgb(var(--blackshade-color)" >Team</Link></li>
                    {
                        currentUser ?

                            <>
                                <li >Dashboard</li>
                                <li >Contact Us</li>
                                <span style={{ backgroundColor: "rgb(var(--green-color))", borderRadius: "10px", color: "rgb(var(--home-color))", padding: "0.5rem 0.5rem" }}>{currentUser.displayName ? currentUser.displayName[0] : "B"}</span>
                            </> : " "
                    }
                    <span>
                        <div className="login-btn-container">
                            <div className="btn">
                                {currentUser ? <span onClick={handleLogout}>Logout</span> :
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
