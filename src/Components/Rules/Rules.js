import React, { useState } from 'react'
import './Rules.css'
import { Button, ButtonGroup, Typography, Checkbox, FormGroup, FormControlLabel, Link } from '@mui/material';
import rulesData from './data';
function RulesComponent(props) {
    return (
        <div className="rules-component">
            <div className="rules-component-datakey">
                <span style={{ fontWeight: "bold" }}>{props.dataKey}</span>
            </div>
            <div className="rules-component-datakeycontent">
                <span style={{ marginLeft: "0.5rem" }}>
                    {props.dataKeyContent}
                </span>
            </div>
        </div>
    )
}

function Rules() {
    const [tab, setTab] = useState(0);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    

    return (
        <div id="rules">

            <Typography component="h2" variant="h5" sx={{ textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "bold" }}>
                All Information
            </Typography>
            <div className="rules-main-container">
                <div className="rules-tabgroup-container">
                    <ButtonGroup variant="outlined" aria-label="outlined button group" size="large">
                        <Button onClick={() => setTab(0)}
                            style={{
                                fontSize: "12px",
                                color: tab === 0 ? 'rgb(var(--white-color))' : 'rgb(var(--blackshade-color))',
                                backgroundColor: tab === 0 ? 'rgb(var(--blackshade-color))' : 'rgb(var(--white-color))'
                            }}
                        >
                            Terms and Conditions
                        </Button>
                        <Button onClick={() => setTab(1)}
                            style={{
                                fontSize: "12px",
                                color: tab === 1 ? 'rgb(var(--white-color))' : 'rgb(var(--blackshade-color))',
                                backgroundColor: tab === 1 ? 'rgb(var(--blackshade-color))' : 'rgb(var(--white-color))'
                            }}
                        >
                            Eligiblity
                        </Button>
                        <Button onClick={() => setTab(2)}
                            style={{
                                fontSize: "12px",
                                color: tab === 2 ? 'rgb(var(--white-color))' : 'rgb(var(--blacksahde-color))',
                                backgroundColor: tab === 2 ? 'rgb(var(--blackshade-color))' : 'rgb(var(--white-color))'
                            }}
                        >
                            Premium Amount
                        </Button>
                    </ButtonGroup>
                </div>
                <div style={{ padding: "1rem", fontSize: "20px" }}>
                    <strong style={{ color: "rgb(var(--green-color))" }}>*</strong> All the information to be read carefully
                </div>
                <div className="rules-information-container">
                    {
                        rulesData[tab].headingData.map(
                            data =>
                                <RulesComponent key={data.dataKey} dataKey={data.dataKey} heading={rulesData[tab].heading} dataKeyContent={data.dataKeyContent} />
                        )
                    }
                </div>
            </div>
            <div className="rules-agree-check">
                <FormGroup>
                    <FormControlLabel control={<Checkbox {...label} color="success" />} label="I have read all information carefully and accept all the terms and conditions. " />
                </FormGroup>
                <span>
                    {
                        <Checkbox checked={checked} onChange={handleChange} /> ?
                            <div className="btn" id="rules-next-pay">
                                <Link href="https://rzp.io/i/neHzGIHBN" underline="none" color="rgb(var(--green-color)">
                                    Pay
                                </Link>
                            </div> : " "
                    }
                </span>
            </div>

        </div>

    )
}

export default Rules
