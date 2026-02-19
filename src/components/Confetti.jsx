import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const COLORS = ['#7c6af7', '#db2777', '#06b6d4', '#f59e0b', '#10b981', '#f97316'];

const Confetti = forwardRef((_props, ref) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useImperativeHandle(ref, () => ({
        fire() {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.style.display = 'block';
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const pieces = Array.from({ length: 140 }, () => ({
                x: Math.random() * canvas.width,
                y: -10 - Math.random() * 200,
                w: Math.random() * 10 + 5,
                h: Math.random() * 5 + 3,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rot: Math.random() * Math.PI * 2,
                drot: (Math.random() - 0.5) * 0.15,
                dx: (Math.random() - 0.5) * 3,
                dy: Math.random() * 4 + 2,
                alpha: 1,
            }));

            cancelAnimationFrame(animRef.current);

            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let alive = false;
                pieces.forEach(p => {
                    if (p.alpha <= 0) return;
                    alive = true;
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                    p.x += p.dx;
                    p.y += p.dy;
                    p.rot += p.drot;
                    if (p.y > canvas.height * 0.7) p.alpha -= 0.02;
                });
                if (alive) { animRef.current = requestAnimationFrame(draw); }
                else { canvas.style.display = 'none'; }
            };
            draw();
        }
    }));

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'none',
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9990,
            }}
        />
    );
});

Confetti.displayName = 'Confetti';
export default Confetti;
