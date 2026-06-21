import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import profileImg from '../assets/hero.png';
import FloatingParticles from './FloatingParticles';
import useMagnet from '../hooks/useMagnet';


const Hero = () => {
    const sectionRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.hero-badge', { y: -16, autoAlpha: 0, duration: 0.55 })
                .from('.hero-title', { y: 48, autoAlpha: 0, duration: 0.75 }, '-=0.3')
                .from('.hero-sub', { y: 28, autoAlpha: 0, duration: 0.65 }, '-=0.45')
                .from('.hero-stats-row', { y: 16, autoAlpha: 0, duration: 0.5 }, '-=0.3')
                .from('.hero-cta', { y: 18, autoAlpha: 0, duration: 0.8 }, '-=0.35')
                .from('.hero-photo-card', { x: 60, autoAlpha: 0, duration: 1.0, ease: 'power3.out' }, 0.1);
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const onMouseMove = useCallback((e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect || !glowRef.current) return;
        gsap.to(glowRef.current, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            opacity: 1, duration: 0.6, ease: 'power2.out',
        });
    }, []);

    const onMouseLeave = useCallback(() => {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    }, []);

    const linkedInMagnet = useMagnet(0.38);
    const contactMagnet = useMagnet(0.38);
    const githubMagnet = useMagnet(0.38);

    const haptic = () => navigator.vibrate?.(30);

    return (
        <section
            className="hero"
            id="hero"
            ref={sectionRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            {/* Aurora animated background */}
            <div className="hero-aurora" aria-hidden="true" />
            {/* Floating particles canvas */}
            <FloatingParticles />

            <div ref={glowRef} className="hero-cursor-glow" style={{ opacity: 0 }} />

            <div className="hero-inner">
                {/* LEFT */}
                <div className="hero-left">
                    <div className="hero-badge">
                        <div className="status-dot" />
                        Available for opportunities
                    </div>

                    <h1 className="hero-title">
                        Crafting <span className="grad">beautiful</span><br />
                        web experiences.
                    </h1>

                    <p className="hero-sub">
                        Full Stack Developer specializing in{' '}
                        <strong>React.js</strong>, <strong>ASP.NET 8</strong> &amp; <strong>SQL Server</strong>.
                        Currently building at{' '}
                        <a
                            href="https://www.linkedin.com/company/codunt"
                            target="_blank" rel="noreferrer"
                            style={{ color: 'var(--text-1)', textDecoration: 'underline', textDecorationColor: 'rgba(124,106,247,0.5)', textUnderlineOffset: '3px' }}
                        >
                            CODUNT Technology
                        </a>.
                    </p>

                    {/* Stats */}
                    <div className="hero-stats-row">
                        <div className="hero-stat">
                            <span className="hero-stat-num">1+</span>
                            <span className="hero-stat-label">Yr. Experience</span>
                        </div>
                        <div className="hero-stat-sep" />
                        <div className="hero-stat">
                            <span className="hero-stat-num">10+</span>
                            <span className="hero-stat-label">Technologies</span>
                        </div>
                        <div className="hero-stat-sep" />
                        <div className="hero-stat">
                            <span className="hero-stat-num">18+</span>
                            <span className="hero-stat-label">Certificates</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="hero-cta">
                        <a
                            href="https://www.linkedin.com/in/dinesh-karthick-94a920295"
                            target="_blank" rel="noreferrer"
                            className="btn-primary"
                            onClick={haptic}
                            {...linkedInMagnet}
                        >
                            LinkedIn ↗
                        </a>
                        <a href="#contact" className="btn-ghost" onClick={haptic} {...contactMagnet}>Get in touch</a>
                        <a
                            href="https://github.com/dineshkarthickd"
                            target="_blank" rel="noreferrer"
                            className="btn-ghost"
                            onClick={haptic}
                            {...githubMagnet}
                        >
                            GitHub ↗
                        </a>
                    </div>
                </div>

                {/* RIGHT — glass photo card */}
                <div className="hero-photo-card">
                    <span className="shimmer-sweep" />
                    <img
                        src={profileImg}
                        alt="Dinesh Karthick"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="hero-stats">
                        {/* <div className="hero-stat-chip">🏢 <span>CODUNT Technology</span></div> */}
                        <div className="hero-stat-chip">📍 <span>Palani, Tamil Nadu</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
