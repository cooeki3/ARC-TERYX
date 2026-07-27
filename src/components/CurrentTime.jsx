import { useEffect, useRef } from "react";

export default function CurrentTime({ localTimeRef, hqTimeRef, startClock }) {
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            localTimeRef.current.textContent =
                new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: "short",
                    hour12: false,
                }).format(now);

            hqTimeRef.current.textContent =
                new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: "short",
                    hour12: false,
                    timeZone: "America/Vancouver"
                }).format(now);
        };

        updateTime();

        if (!startClock) return;

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);

    }, [startClock]);

    return (
        <div className="current-time">
            <div className="row row-local">
                <span>LOCAL TIME</span>
                <span ref={localTimeRef}></span>
            </div>

            <div className="row row-hq">
                <span>ARC'TERYX HQ</span>
                <span ref={hqTimeRef}></span>
            </div>

            <div className="row row-location">
                <span>BASE LOCATION</span>
                <span>NORTH VANCOUVER, CANADA</span>
            </div>

            <div className="row row-coordinates">
                <span>COORDINATES</span>
                <span>49.3206° N / 122.9540° W</span>
            </div>
        </div>
    );
}