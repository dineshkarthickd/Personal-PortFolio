import { useRef, useCallback } from 'react';

/**
 * useTilt — 3D mouse-parallax tilt effect on a card element.
 * Usage: spread {...tiltProps} onto the card.
 */
const useTilt = (maxDeg = 12) => {
    const ref = useRef(null);

    const onMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        el.style.transform =
            `perspective(800px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg) scale(1.03)`;
        el.style.transition = 'transform 0.1s ease';
    }, [maxDeg]);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        el.style.transition = 'transform 0.55s cubic-bezier(.23,1,.32,1)';
    }, []);

    return { ref, onMouseMove, onMouseLeave };
};

export default useTilt;
