import React, { useState, useRef } from 'react'
import './FAQs.css';
import faqsarr from './data';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

function FaqAccordion(props) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");

    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
            setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
        );

    }

    return (
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className="accordion__title">{props.ques}</p>
                {setHeight !== "0px" ? <RemoveCircleOutline className="accordion__icon" width={10} fill={"#777"} /> : <AddCircleOutline className="accordion__icon" width={10} fill={"#777"} />}
            </button>
            <div
                ref={content}
                style={{ maxHeight: `${setHeight}` }}
                className="accordion__content"
            >
                <div
                    className="accordion__text"
                    dangerouslySetInnerHTML={{ __html: props.ans }}
                />
            </div>
        </div>
    );
}
function FAQs() {
    return (
        <div id="faqs">
            <div className="heading">
                <span className="why-heading"> FAQs </span>
            </div>
            <div className="faqs-accordion-container">
                <div className="faqs-accordian-container-left">
                    {faqsarr.slice(0, faqsarr.length / 2).map(faqsarr => <FaqAccordion key={faqsarr.ques}
                        ques={faqsarr.ques}
                        ans={faqsarr.ans} />)}
                </div>
                <div className="faqs-accordian-container-right">
                    {faqsarr.slice(faqsarr.length / 2, faqsarr.length).map(faqsarr => <FaqAccordion key={faqsarr.ques}
                        ques={faqsarr.ques}
                        ans={faqsarr.ans} />)}
                </div>

            </div>
        </div>
    )
}

export default FAQs
