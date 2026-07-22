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
        const ripples = [];

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

                        velocityX: 0,
                        velocityY: 0,

                        opacity: 0.15,
                        size: radius,
                        hover: 0,
                    });
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            const time = Date.now() * 0.001;

            const rect = canvas.getBoundingClientRect();

            const localMouse = {
                x: mouse.x !== null ? mouse.x - rect.left : null,
                y: mouse.y !== null ? mouse.y - rect.top : null,
            };


            dots.forEach(dot => {
                let targetX = dot.ox;
                let targetY = dot.oy;

                let distance = Infinity;


                // Floating wave
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



                // Mouse interaction
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



                // Liquid ripple
                const now = performance.now();

                ripples.forEach(ripple => {
                    const age = (now - ripple.start) / 1000;

                    const rippleRadius = age * 600;
                    const waveWidth = 80;

                    const dx = dot.ox - ripple.x;
                    const dy = dot.oy - ripple.y;

                    const dist = Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                    const difference = dist - rippleRadius;

                    const strength = Math.exp(
                        -(difference * difference) /
                        (2 * waveWidth * waveWidth)
                    );


                    if (dist > 0.001) {
                        const nx = dx / dist;
                        const ny = dy / dist;

                        targetX += nx * strength * 12;
                        targetY += ny * strength * 12;

                        targetY -= strength * 8;

                        // dot.opacity += strength * 0.15;
                    }
                });



                // Physics movement
                dot.velocityX +=
                    (targetX - dot.x) * 0.002;

                dot.velocityY +=
                    (targetY - dot.y) * 0.002;


                dot.velocityX *= 0.92;
                dot.velocityY *= 0.92;


                dot.x += dot.velocityX;
                dot.y += dot.velocityY;



                // Hover animation
                const hover =
                    distance < influence ? 1 : 0;

                dot.hover +=
                    (hover - dot.hover) * 0.015;



                // Opacity
                const waveBrightness =
                    (wave + 1) / 2;

                const targetOpacity =
                    0.05 +
                    waveBrightness * 0.12 +
                    dot.hover * 0.25;


                dot.opacity +=
                    (targetOpacity - dot.opacity) * 0.05;



                // Size
                const targetSize =
                    radius + dot.hover * 1;

                dot.size +=
                    (targetSize - dot.size) * 0.015;



                // Draw
                ctx.beginPath();

                ctx.arc(
                    dot.x,
                    dot.y,
                    dot.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(49, 49, 51, ${dot.opacity})`;

                ctx.fill();
            });



            // Remove old ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                if (
                    performance.now() -
                    ripples[i].start >
                    1800
                ) {
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
            const rect =
                canvas.getBoundingClientRect();

            ripples.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                start: performance.now(),
            });
        }



        resize();
        draw();


        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseleave", leave);
        window.addEventListener("click", click);


        return () => {
            cancelAnimationFrame(animationFrame);

            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseleave", leave);
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