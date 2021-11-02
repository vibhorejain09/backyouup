import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, FormatQuote } from "@mui/icons-material";
import data from "./data";
import './Team.css';
function Team() {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = people.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1);
        }, 2000);
        return () => clearInterval(slider);
    }, [index]);

    return (
        <div id="team">
            <div className="heading">
                <span className="why-heading"> Our Team </span>
            </div>
            <div className="section-center">
                {people.map((person, personIndex) => {
                    const { id, image, name, title, description } = person;
                    // more stuff coming up
                    let position = "nextSlide";
                    if (personIndex === index) {
                        position = "activeSlide";
                    }
                    if (
                        personIndex === index - 1 ||
                        (index === 0 && personIndex === people.length - 1)
                    ) {
                        position = "lastSlide";
                    }
                    return (
                        <article className={position} key={id}>
                            <img src={image} alt={name} className="person-img" />
                            <h4>{name}</h4>
                            <p className="title">{title}</p>
                            <p className="text">{description}</p>
                            <FormatQuote className="icon" />
                        </article>
                    );
                })}
                <button className="prev" onClick={() => setIndex(index - 1)}>
                    <ChevronLeft />
                </button>
                <button className="next" onClick={() => setIndex(index + 1)}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}

export default Team;