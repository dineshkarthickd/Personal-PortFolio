import { useEffect, useState } from 'react';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
];

const SectionDots = () => {
    const [active, setActive] = useState('hero');

    useEffect(() => {
        const observers = sections.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id); },
                { threshold: 0.4 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="section-dots" aria-label="Section navigation">
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    className={`sd-dot ${active === id ? 'sd-active' : ''}`}
                    onClick={() => scrollTo(id)}
                    aria-label={label}
                    title={label}
                >
                    <span className="sd-tooltip">{label}</span>
                </button>
            ))}
        </nav>
    );
};

export default SectionDots;
