import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useTilt from '../hooks/useTilt';

const projects = [
    {
        title: 'Aalam Studio — Premium Photography & Videography',
        description:
            'A fully responsive web presence for Aalam Studio, a premium photography and videography studio based in Palani. Built with React.js and TypeScript, featuring smooth animations, dynamic galleries, and Firebase integration for content management.',
        tags: ['React.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        link: 'https://aalam-studio.vercel.app/',
        period: 'Oct 2025 – Dec 2025',
    },
    {
        title: 'Dharmar Mahal — Invoice Generator',
        description:
            'A custom invoice generator application built specifically for Dharmar Mahal to streamline their billing and invoice management process with a clean, intuitive interface.',
        tags: ['React.js', 'Web App', 'CSS'],
        link: 'https://dharmar-mahal-invoice.vercel.app/',
        period: 'Aug 2025 – Nov 2025',
    },
    {
        title: 'Kailash Ghee — Premium Brand Showcase',
        description:
            'A premium landing page for Kailash Ghee featuring an elegant and luxury editorial UI. Designed to provide a sophisticated web presence with refined typography and responsive layouts.',
        tags: ['React.js', 'Vite', 'UI/UX', 'CSS'],
        link: 'https://kailash-ghee.vercel.app/',
        period: 'Jan 2026 – May 2026',
    },
];

const Projects = () => {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(['.proj-eyebrow', '.proj-title', '.proj-sub'], {
                scrollTrigger: { trigger: '#projects', start: 'top 84%' },
                y: 32, autoAlpha: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
            });
            gsap.from('.project-card', {
                scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' },
                y: 50, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            });
            ScrollTrigger.batch('.proj-tag', {
                start: 'top 92%',
                onEnter: b => gsap.from(b, { scale: 0.75, autoAlpha: 0, duration: 0.35, stagger: 0.05, ease: 'back.out(1.8)' }),
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section className="section" id="projects" ref={ref}>
            <hr className="section-divider" style={{ marginTop: 0, marginBottom: '3.5rem' }} />

            <div className="section-title-wrap">
                <span className="section-num">03</span>
                <p className="section-eyebrow proj-eyebrow">Work</p>
                <h2 className="section-title proj-title">Things I&apos;ve built</h2>
            </div>
            <p className="section-body proj-sub" style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
                Selected projects from work and personal exploration.
            </p>

            <div className="projects-grid">
                {projects.map((p, i) => {
                    const tilt = useTilt(10);
                    return (
                        <a key={i} href={p.link} className="project-card" target="_blank" rel="noreferrer"
                            {...tilt}>
                            <span className="shimmer-sweep" />
                            <div className="project-card-top">
                                <h3 className="project-title">{p.title}</h3>
                                <span className="project-arrow">↗</span>
                            </div>
                            <p className="project-period">{p.period}</p>
                            <p className="project-desc">{p.description}</p>
                            <div className="project-tags">
                                {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                            </div>
                        </a>
                    );
                })}
            </div>

            <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-3)', textAlign: 'center' }}>
                More on{' '}
                <a href="https://github.com/dineshkarthickd" target="_blank" rel="noreferrer"
                    style={{ color: 'var(--violet)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    GitHub ↗
                </a>
            </p>
        </section>
    );
};

export default Projects;
