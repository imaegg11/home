import { useState, useEffect } from "react"

export function Time() {
    
    const [time, setTime] = useState(get_time());
    const [trail, setTrail] = useState(get_trail());

    useEffect(() => {
        setInterval(() => {
            setTime(get_time());
            setTrail(get_trail());
        }, 1000);
    }, []);

    return (
        <p className="text">{time} <span className="accent-text">{trail}</span></p>
    )

}

function get_trail() {
    const current_date = new Date();

    let hour = current_date.getHours()
    let trail = hour >= 12 ? "PM" : "AM"

    return trail;
}

function get_time() {
    const current_date = new Date();

    let hour = current_date.getHours()
    let minute = current_date.getMinutes()
    let trail = hour >= 12 ? "PM" : "AM"

    if (minute <= 9) minute = `0${minute}`;
    if (hour > 12) hour %= 12;
    else if (hour == 0) hour = 12;
    
    return `${hour}:${minute}`;
}