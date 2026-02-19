import { useRef, useCallback } from 'react';

/**
 * useMagnet — makes an element magnetically follow the cursor when hovered.
 * Usage: spread {...magnetProps} onto the target element.
 */
const useMagnet = (strength = 0.35) => {
    const ref = useRef(null);

    const onMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    }, [strength]);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'translate(0,0) scale(1)';
        el.style.transition = 'transform 0.45s cubic-bezier(.23,1,.32,1)';
        setTimeout(() => { if (el) el.style.transition = ''; }, 450);
    }, []);

    return {
        ref,
        onMouseMove,
        onMouseLeave,
        style: { transition: 'transform 0.12s ease', display: 'inline-flex' },
    };
};

export default useMagnet;
