import { useEffect, useRef } from 'react';

const CELL_SIZE = 80;

export default function HeroGrid() {
    const gridRef = useRef(null);
    const timersRef = useRef(new WeakMap());

    useEffect(() => {
        const grid = gridRef.current;
        const timers = timersRef.current;
        let rafId;

        function buildGrid() {
            const width = grid.clientWidth;
            const height = grid.clientHeight;

            const cols = Math.max(1, Math.round(width / CELL_SIZE));
            const cellSize = width / cols;
            const rows = Math.max(1, Math.ceil(height / cellSize));

            grid.style.setProperty('--cols', cols);
            grid.style.setProperty('--rows', rows);

            grid.innerHTML = '';
            const total = cols * rows;
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < total; i++) {
                const cell = document.createElement('div');
                cell.className = 'hero-grid__cell';

                cell.addEventListener('mouseenter', () => {
                    const existing = timers.get(cell);
                    if (existing) {
                        clearTimeout(existing);
                        timers.delete(cell);
                    }
                    cell.classList.add('is-active');
                });

                cell.addEventListener('mouseleave', () => {
                    const timeoutId = setTimeout(() => {
                        cell.classList.remove('is-active');
                        timers.delete(cell);
                    }, 1000);
                    timers.set(cell, timeoutId);
                });

                fragment.appendChild(cell);
            }
            grid.appendChild(fragment);
        }

        function onResize() {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(buildGrid);
        }

        buildGrid();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(rafId);

            const cells = grid.querySelectorAll('.hero-grid__cell');
            cells.forEach((cell) => {
                const t = timers.get(cell);
                if (t) clearTimeout(t);
            });
        };
    }, []);

    return <div className="hero-grid" ref={gridRef} />;
}