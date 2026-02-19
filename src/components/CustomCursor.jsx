import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: -200, y: -200 });
    const smoothPos = useRef({ x: -200, y: -200 });
    const rafRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia('(hover: none)').matches;
        const isMobile = window.innerWidth <= 768;
        if (isTouch || isMobile) return;
        setEnabled(true);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        document.body.style.cursor = 'none';

        const lerp = (a, b, t) => a + (b - a) * t;

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        const animate = () => {
            smoothPos.current.x = lerp(smoothPos.current.x, pos.current.x, 0.1);
            smoothPos.current.y = lerp(smoothPos.current.y, pos.current.y, 0.1);
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        const onEnter = () => {
            dotRef.current?.classList.add('cursor-hover');
            ringRef.current?.classList.add('cursor-hover');
        };
        const onLeave = () => {
            dotRef.current?.classList.remove('cursor-hover');
            ringRef.current?.classList.remove('cursor-hover');
        };

        window.addEventListener('mousemove', onMove);
        document.querySelectorAll('a, button, [role="button"], .exp-flip-card')
            .forEach(el => {
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [enabled]);

    // Don't render anything on mobile/touch
    if (!enabled) return null;

    return (
        <>
            {/* Precise dot */}
            <div ref={dotRef} className="cursor-dot" />
            {/* Slow-lagging gradient ring */}
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
};

export default CustomCursor;
