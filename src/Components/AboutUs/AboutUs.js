import React from 'react'
import './AboutUs.css'
function AboutUs() {
    return (
        <div id="aboutus">
            <div className="heading">
                <span className="why-heading">Why</span><span className="green-only"> Back You Up ? </span>
            </div>
            <div className="aboutus-content">
                <div className="aboutus-para">
                    <p style={{ maxWidth: "700px", lineHeight: "25px" }}>
                    BackYouUp is designed exclusively for the students of SGSITS, keeping in mind how important it is for a person to complete his/her graduation. Being a part of 
                    BackyouUp, you get the benefit of taking your graduation forward without anything letting you to stop it at any condition, So that you actually shape yourself to 
                    stand on your own in the job market. Trust us we do have a very smooth service with claim process.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
