import { useEffect, useRef } from 'react';

const skills = [
    { label: 'React.js', size: 1.1 },
    { label: 'ASP.NET 8', size: 1.05 },
    { label: 'C#', size: 1.0 },
    { label: 'TypeScript', size: 1.0 },
    { label: 'JavaScript', size: 1.05 },
    { label: 'Node.js', size: 0.9 },
    { label: 'SQL Server', size: 1.0 },
    { label: 'Docker', size: 0.9 },
    { label: 'Firebase', size: 0.85 },
    { label: 'Tailwind', size: 0.85 },
    { label: 'PHP', size: 0.8 },
    { label: 'Python', size: 0.85 },
    { label: 'Figma', size: 0.8 },
    { label: 'Git', size: 0.8 },
    { label: 'Oracle DB', size: 0.8 },
    { label: 'EF Core', size: 0.8 },
];

/* Distribute points evenly on a sphere surface */
const getSpherePoints = (n, radius) =>
    Array.from({ length: n }, (_, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        return {
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.sin(phi) * Math.sin(theta),
            z: radius * Math.cos(phi),
        };
    });

const SkillCloud = () => {
    const containerRef = useRef(null);
    const points = getSpherePoints(skills.length, 120);
    const animRef = useRef(null);
    const rotRef = useRef({ ax: 0.003, ay: 0.006 });
    const matRef = useRef([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const tags = Array.from(container.querySelectorAll('.sc-tag'));

        const rotateX = (m, a) => {
            const c = Math.cos(a), s = Math.sin(a);
            return [
                m[0], m[1] * c - m[2] * s, m[1] * s + m[2] * c, 0,
                m[4], m[5] * c - m[6] * s, m[5] * s + m[6] * c, 0,
                m[8], m[9] * c - m[10] * s, m[9] * s + m[10] * c, 0,
                0, 0, 0, 1
            ];
        };
        const rotateY = (m, a) => {
            const c = Math.cos(a), s = Math.sin(a);
            return [
                m[0] * c + m[2] * s, m[1], -m[0] * s + m[2] * c, 0,
                m[4] * c + m[6] * s, m[5], -m[4] * s + m[6] * c, 0,
                m[8] * c + m[10] * s, m[9], -m[8] * s + m[10] * c, 0,
                0, 0, 0, 1
            ];
        };

        const animate = () => {
            matRef.current = rotateX(matRef.current, rotRef.current.ax);
            matRef.current = rotateY(matRef.current, rotRef.current.ay);
            const m = matRef.current;

            tags.forEach((tag, i) => {
                const p = points[i];
                const x = m[0] * p.x + m[1] * p.y + m[2] * p.z;
                const y = m[4] * p.x + m[5] * p.y + m[6] * p.z;
                const z = m[8] * p.x + m[9] * p.y + m[10] * p.z;
                const scale = (z + 160) / 280;
                tag.style.transform = `translate(${x}px, ${y}px) scale(${scale * 0.9 + 0.1})`;
                tag.style.opacity = scale * 0.85 + 0.15;
                tag.style.zIndex = Math.round(scale * 100);
            });
            animRef.current = requestAnimationFrame(animate);
        };
        animate();

        const onMove = (e) => {
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            rotRef.current = {
                ax: ((e.clientY - cy) / rect.height) * 0.025,
                ay: ((e.clientX - cx) / rect.width) * 0.025,
            };
        };
        const onLeave = () => { rotRef.current = { ax: 0.003, ay: 0.006 }; };

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(animRef.current);
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div className="skill-cloud-wrap">
            <div ref={containerRef} className="skill-cloud">
                {skills.map((s, i) => (
                    <span
                        key={i}
                        className="sc-tag"
                        style={{ fontSize: `${s.size * 0.8}rem` }}
                    >
                        {s.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillCloud;
