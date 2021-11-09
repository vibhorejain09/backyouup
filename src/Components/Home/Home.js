import React from 'react'
import './Home.css'
import useWindowWidth from "../../Utils/windowWidth"
import homecoverlogo from '../../Assets/backyouupfull.svg'
import heroimg from '../../Assets/hero.png'
import { Instagram, LinkedIn, Mail } from '@material-ui/icons'
import { Link } from "@mui/material"
import { useAuth } from '../../Contexts/AuthContext';
function Home() {
    const width = useWindowWidth();
    const { currentUser } = useAuth();
    return (
        <div id="home" style={{ justifyContent: width > 800 ? "space-evenly" : "center" }}>
            <div className="home-container">
                <img src={homecoverlogo} height="120px" alt="homelogo" className="home-logo" />
                <div className="home-conatiner-info">
                    <div className="home-conatiner-follow">
                        Connect With Us:
                    </div>
                    <ul className="home-conatiner-follow-links">
                        <li>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                <LinkedIn />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                                <Instagram />
                            </a>
                        </li>
                        <li>
                            <a href="https://mail.com/" target="_blank" rel="noopener noreferrer">
                                <Mail />
                            </a>
                        </li>
                    </ul>
                </div>
                {
                    !currentUser ?
                    <>
                <div className="register-btn-container">
                    <div className="btn">
                        <Link href="/signup" underline="none" color="rgb(var(--green-color)">
                            Register/Sign up
                        </Link>
                    </div>
                </div>
                </> : " "
                }
            </div>
            {
                width > 800 ?
                    <div className="home-hero-img-conatiner">
                        <img src={heroimg} height="300px" alt="herohomeimg" className="home-hero-img" />
                    </div>
                    : " "
            }

        </div>
    )
}

export default Home
