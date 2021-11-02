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
import { People, Info, LiveHelp, Home, Menu, Login } from "@mui/icons-material";
import scrollToElement from "../../Utils/scrollToElement";

function Header() {
    const width = useWindowWidth();
    const [open, setOpen] = useState(false);
    const toggleDrawer =  (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(!open);
    };
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
                                    <ListItemText primary={"Home"} />
                                </ListItem>
                                <ListItem className="sidebar-link" button component="a" href="#aboutus" key={"About Us"}>
                                    <ListItemIcon>
                                        <Info />
                                    </ListItemIcon>
                                    <ListItemText primary={"About us"} />
                                </ListItem>
                                <ListItem className="sidebar-link" button component="a" href="#faqs" key={"FAQs"}>
                                    <ListItemIcon>
                                        <LiveHelp />
                                    </ListItemIcon>
                                    <ListItemText primary={"FAQs"} />
                                </ListItem>
                                <ListItem className="sidebar-link" button component="a" href="#team" key={"Team"}>
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <ListItemText primary={"Team"} />
                                </ListItem>
                                <ListItem className="sidebar-link" button component="a" >
                                    <ListItemIcon>
                                        <Login />
                                    </ListItemIcon>
                                    <div className="login-btn-container">
                                        <div className="btn">
                                            Login
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </React.Fragment>
            ) : (
                <ul className="header-items">
                    <li onClick={() => scrollToElement("home")}>Home </li>
                    <li onClick={() => scrollToElement("aboutus")}>About Us</li>
                    <li onClick={() => scrollToElement("faqs")}>FAQs</li>
                    <li onClick={() => scrollToElement("team")}>Team</li>
                    <span>
                        <div className="login-btn-container">
                            <div className="btn">
                                Login
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
