import React from 'react'
import './Footer.css'
import windowWidth from '../../Utils/windowWidth'
import { Instagram, Mail, LinkedIn, } from "@mui/icons-material";
import { Divider } from '@material-ui/core'
import footerlogo from '../../Assets/backyouup.svg'
import heartimg from '../../Assets/heartfooter.png'


function Footer() {
    const width = windowWidth()
    return (
        <div id="footer">
            <div className="footer-content" style={{ flexDirection: width < 900 ? "column" : "row" }}>
                <div className="footer-content-logo">
                    <img src={footerlogo} height="60px" alt="logofooter"></img>
                </div>
                <div className="footer-content-connect">
                    <div className="footer-content-connect-heading">
                        Connect With Us
                    </div>
                    <ul className="footer-content-connect-links">
                        <li>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                <LinkedIn />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                                <Instagram />
                            </a>
                        </li>
                        <li>
                            <a href="mailto:vibhore.jain.eng@gmail.com" target="_blank" rel="noreferrer">
                                <Mail />
                            </a>
                        </li>
                    </ul>

                </div>
                <div className="footer-content-made-with">
                    Made with <span><img src={heartimg} alt="imgheart" height="20px" id="footer-heart-img" /></span> In React
                </div>
            </div>
            <Divider className="footer-content-divider" />
            <div className="footer-content-copyright">
                &copy; {new Date().getFullYear().toString()}, Back You Up. All Rights Reserved.
            </div>
        </div>

    )
}

export default Footer