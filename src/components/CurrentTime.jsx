import { useEffect, useState } from "react";

export default function CurrentTime() {
    const [localTime, setLocalTime] = useState("");
    const [hqTime, setHqTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            const formatTime = (timeZone) =>
                new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: "short",
                    hour12: false,
                    timeZone,
                }).format(now);

            setLocalTime(formatTime(Intl.DateTimeFormat().resolvedOptions().timeZone));

            setHqTime(formatTime("America/Vancouver"));
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="current-time">
            <div className="time-row">
                <span>LOCAL TIME</span>
                <span>{localTime}</span>
            </div>

            <div className="time-row">
                <span>ARC'TERYX HQ</span>
                <span>{hqTime}</span>
            </div>

            <div className="time-row">
                <span>BASE LOCATION</span>
                <span>NORTH VANCOUVER, CANADA</span>
            </div>

            <div className="time-row">
                <span>COORDINATES</span>
                <span>49.3206° N / 122.9540° W</span>
            </div>
        </div>
    );
}