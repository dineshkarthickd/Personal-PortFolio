import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        period: 'Dec 2024 – Present',
        role: 'Software Developer',
        company: 'CODUNT Technology',
        type: 'Full-time · On-site',
        location: 'Coimbatore, Tamil Nadu',
        icon: '💼',
        color: '#7c6af7',
    },
];

const education = [
    {
        period: 'Jun 2025 – Present',
        role: 'Master of Computer Applications',
        company: 'Bharathiar University',
        type: 'MCA · Full-time',
        location: 'Computer Science',
        icon: '🎓',
        color: '#06b6d4',
    },
    {
        period: 'Aug 2022 – Apr 2025',
        role: 'Bachelor of Science',
        company: 'Arulmigu Palaniandavar College',
        type: 'B.Sc. · Regular',
        location: 'Computer Science',
        icon: '📚',
        color: '#10b981',
    },
];

const ExpFlipCard = ({ item }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        navigator.vibrate?.(25);
        setFlipped(f => !f);
    };

    return (
        <div
            className={`exp-flip-card ${flipped ? 'exp-flipped' : ''}`}
            onClick={handleFlip}
        >
            <div className="exp-flip-inner">
                {/* FRONT */}
                <div className="exp-flip-front">
                    <span className="exp-flip-icon">{item.icon}</span>
                    <div className="exp-flip-front-body">
                        <p className="exp-flip-role">{item.role}</p>
                        <p className="exp-flip-company">{item.company}</p>
                        <span className="exp-flip-period">{item.period}</span>
                    </div>
                    {/* Flip indicator icon */}
                    <svg className="exp-flip-trigger-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6" /><path d="M2.5 12a10 10 0 0 1 17-7l2 2" />
                        <path d="M2.5 22v-6h6" /><path d="M21.5 12a10 10 0 0 1-17 7l-2-2" />
                    </svg>
                </div>

                {/* BACK */}
                <div className="exp-flip-back" style={{ '--exp-color': item.color }}>
                    <div className="exp-flip-back-header">
                        <span className="exp-flip-icon-back">{item.icon}</span>
                        <div>
                            <p className="exp-flip-back-role">{item.role}</p>
                            <p className="exp-flip-back-company">{item.company}</p>
                        </div>
                    </div>
                    <div className="exp-flip-tags">
                        <span className="exp-tag">{item.type}</span>
                        <span className="exp-tag">📍 {item.location}</span>
                    </div>
                    <span className="exp-flip-period-back">{item.period}</span>
                </div>
            </div>
        </div>
    );
};

const Experience = () => {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const shared = { force3D: true, lazy: false };

            gsap.from(['.exp-eyebrow', '.exp-title'], {
                scrollTrigger: { trigger: '#experience', start: 'top 85%', invalidateOnRefresh: true },
                y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', ...shared,
            });
            gsap.from('.exp-col-label', {
                scrollTrigger: { trigger: '.exp-grid', start: 'top 85%', invalidateOnRefresh: true },
                y: 16, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out', ...shared,
            });
            gsap.from('.exp-flip-card', {
                scrollTrigger: { trigger: '.exp-grid', start: 'top 80%', invalidateOnRefresh: true },
                y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', ...shared,
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section className="section" id="experience" ref={ref}>
            <hr className="section-divider" style={{ marginTop: 0, marginBottom: '3.5rem' }} />

            <div className="section-title-wrap" style={{ marginBottom: '2.5rem' }}>
                <span className="section-num">02</span>
                <p className="section-eyebrow exp-eyebrow">Career</p>
                <h2 className="section-title exp-title">Experience &amp; Education</h2>
            </div>

            <div className="exp-grid">
                <div>
                    <p className="exp-col-label">Work</p>
                    <div className="exp-cards-stack">
                        {experiences.map((e, i) => <ExpFlipCard key={i} item={e} />)}
                    </div>
                </div>
                <div>
                    <p className="exp-col-label">Education</p>
                    <div className="exp-cards-stack">
                        {education.map((e, i) => <ExpFlipCard key={i} item={e} />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
