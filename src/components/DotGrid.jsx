import { useEffect, useRef } from "react";

function DotGrid() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width;
        let height;
        let animationFrame;

        const dots = [];

        const mouse = {
            x: null,
            y: null,
        };

        const spacing = 55;
        const radius = 1.3;
        const influence = 160;

        function resize() {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            width = rect.width;
            height = rect.height;

            dots.length = 0;

            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    dots.push({
                        x,
                        y,
                        ox: x,
                        oy: y,
                        opacity: 0.35,
                        size: radius,
                        hover: 0,
                    });
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            const time = Date.now() * 0.001;

            // Convert cursor position to canvas coordinates
            const rect = canvas.getBoundingClientRect();

            const localMouse = {
                x: mouse.x !== null ? mouse.x - rect.left : null,
                y: mouse.y !== null ? mouse.y - rect.top : null,
            };

            dots.forEach(dot => {
                let targetX = dot.ox;
                let targetY = dot.oy;

                let distance = Infinity;

                // Wave movement
                const wave = Math.sin(
                    dot.ox * 0.005 +
                    dot.oy * 0.008 +
                    time * 0.8
                );

                targetY += wave * 12;

                targetX += Math.cos(
                    dot.oy * 0.01 +
                    time * 0.7
                ) * 1.5;

                // Cursor interaction
                if (localMouse.x !== null) {
                    const dx = localMouse.x - dot.x;
                    const dy = localMouse.y - dot.y;

                    distance = Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                    if (distance < influence) {
                        const force =
                            (influence - distance) / influence;

                        targetX -= dx * force * 0.2;
                        targetY -= dy * force * 0.2;
                    }
                }

                // Dots movement
                dot.x += (targetX - dot.x) * 0.03;
                dot.y += (targetY - dot.y) * 0.03;

                // Hover animation
                const hover = distance < influence ? 1 : 0;

                dot.hover += (hover - dot.hover) * 0.015;

                // Wave opacity
                const waveBrightness = (wave + 1) / 2;

                const targetOpacity =
                    0.15 +
                    waveBrightness * 0.25 +
                    dot.hover * 0.55;

                dot.opacity +=
                    (targetOpacity - dot.opacity) * 0.015;

                const targetSize =
                    radius + dot.hover * 1;

                dot.size +=
                    (targetSize - dot.size) * 0.015;

                ctx.beginPath();

                ctx.arc(
                    dot.x,
                    dot.y,
                    dot.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(220,220,215,${dot.opacity})`;

                ctx.fill();
            });

            animationFrame = requestAnimationFrame(draw);
        }

        function move(e) {
            // Keep mouse in viewport coordinates
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        function leave() {
            mouse.x = null;
            mouse.y = null;
        }

        resize();
        draw();

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseleave", leave);

        return () => {
            cancelAnimationFrame(animationFrame);

            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseleave", leave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="dot-grid"
        />
    );
}

export default DotGrid;