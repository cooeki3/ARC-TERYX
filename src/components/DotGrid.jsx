import { useEffect, useRef } from "react";

function DotGrid() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width;
        let height;
        let rect;
        let animationFrame;

        const dots = [];
        const ripples = [];

        const mouse = {
            x: null,
            y: null,
        };

        const spacing = 55;
        const radius = 1.3;
        const influence = 220;

        function resize() {
            rect = canvas.getBoundingClientRect();

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
                        opacity: 0.12,
                        size: radius,
                        hover: 0,
                    });
                }
            }
        }

        function draw() {
            const now = performance.now();

            ctx.clearRect(0, 0, width, height);

            rect = canvas.getBoundingClientRect();

            const localMouse = {
                x: mouse.x !== null ? mouse.x - rect.left : null,
                y: mouse.y !== null ? mouse.y - rect.top : null,
            };

            dots.forEach(dot => {
                let targetX = dot.ox;
                let targetY = dot.oy;
                let distance = Infinity;

                if (localMouse.x !== null) {
                    const dx = localMouse.x - dot.x;
                    const dy = localMouse.y - dot.y;

                    distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance < influence) {
                        const force =
                            (influence - distance) / influence;

                        targetX -= dx * force * 0.2;
                        targetY -= dy * force * 0.2;
                    }
                }

                ripples.forEach(ripple => {
                    const age =
                        (now - ripple.start) / 1000;

                    const rippleRadius = age * 600;
                    const waveWidth = 80;

                    const dx = dot.ox - ripple.x;
                    const dy = dot.oy - ripple.y;

                    const dist = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    const difference =
                        dist - rippleRadius;

                    const strength =
                        Math.exp(
                            -(difference * difference) /
                            (2 * waveWidth * waveWidth)
                        );

                    if (dist > 0.001) {
                        const nx = dx / dist;
                        const ny = dy / dist;

                        targetX += nx * strength * 12;
                        targetY += ny * strength * 12;
                        targetY -= strength * 8;
                    }
                });

                dot.x += (targetX - dot.x) * 0.08;
                dot.y += (targetY - dot.y) * 0.08;

                let hover = 0;

                if (distance < influence) {
                    hover = 1 - distance / influence;
                }

                const hoverSpeed = hover > dot.hover ? 0.12 : 0.035;

                dot.hover += (hover - dot.hover) * hoverSpeed;

                const targetOpacity =
                    0.15 + dot.hover * 0.40;

                const opacitySpeed =
                    targetOpacity > dot.opacity ? 0.12 : 0.04;

                dot.opacity +=
                    (targetOpacity - dot.opacity) * opacitySpeed;

                const targetSize =
                    radius + dot.hover * 4;

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
                    `rgba(49,49,51,${dot.opacity})`;

                ctx.fill();
            });

            for (let i = ripples.length - 1; i >= 0; i--) {
                if (now - ripples[i].start > 1800) {
                    ripples.splice(i, 1);
                }
            }

            animationFrame = requestAnimationFrame(draw);
        }

        function move(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        function leave() {
            mouse.x = null;
            mouse.y = null;
        }

        function click(e) {
            const clickRect = canvas.getBoundingClientRect();

            if (ripples.length >= 3) {
                ripples.shift();
            }

            ripples.push({
                x: e.clientX - clickRect.left,
                y: e.clientY - clickRect.top,
                start: performance.now(),
            });
        }

        resize();
        draw();

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", move);
        canvas.addEventListener("mouseleave", leave);
        window.addEventListener("click", click);

        return () => {
            cancelAnimationFrame(animationFrame);

            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", move);
            canvas.removeEventListener("mouseleave", leave);
            window.removeEventListener("click", click);
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