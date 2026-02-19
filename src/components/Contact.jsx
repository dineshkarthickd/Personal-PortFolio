import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Confetti from './Confetti';

const Contact = () => {
    const ref = useRef(null);
    const confettiRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-card', {
                scrollTrigger: { trigger: '#contact', start: 'top 80%' },
                scale: 0.95, y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out',
            });
            gsap.from(['.contact-title', '.contact-sub', '.contact-email', '.socials'], {
                scrollTrigger: { trigger: '.contact-card', start: 'top 78%' },
                y: 24, autoAlpha: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out', delay: 0.2,
            });
            gsap.from('.social-pill', {
                scrollTrigger: { trigger: '.socials', start: 'top 90%' },
                y: 14, autoAlpha: 0, scale: 0.85, duration: 0.45, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.3,
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const haptic = (ms = 30) => navigator.vibrate?.(ms);

    const handleEmailClick = () => {
        haptic(50);
        confettiRef.current?.fire();
    };

    const handleShare = async () => {
        haptic(30);
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dinesh Karthick — Portfolio',
                    text: 'Check out this amazing Full Stack Developer portfolio!',
                    url: window.location.href,
                });
            } catch (_) { /* user dismissed */ }
        } else {
            navigator.clipboard?.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const socials = [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dinesh-karthick-94a920295', icon: '💼' },
        { label: 'GitHub', href: 'https://github.com/dineshkarthickd', icon: '🐙' },
        { label: 'Email', href: 'mailto:dineshkarthick1610@gmail.com', icon: '✉️', onClick: handleEmailClick },
    ];

    return (
        <section className="section" id="contact" ref={ref}>
            <Confetti ref={confettiRef} />
            <hr className="section-divider" style={{ marginTop: 0, marginBottom: '3.5rem' }} />

            <div className="contact-card">
                <h2 className="contact-title">Let&apos;s work together.</h2>
                <p className="contact-sub">
                    Have a project in mind or want to collaborate?
                    I&apos;m always open to new opportunities.
                </p>
                <a
                    href="mailto:dineshkarthick1610@gmail.com"
                    className="contact-email"
                    onClick={handleEmailClick}
                >
                    dineshkarthick1610@gmail.com
                </a>
                <div className="socials">
                    {socials.map(s => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="social-pill"
                            onClick={s.onClick ? (e) => { e.preventDefault(); s.onClick(); window.open(s.href); } : () => haptic()}
                        >
                            <span>{s.icon}</span> {s.label}
                        </a>
                    ))}

                    {/* Share button */}
                    <button className="social-pill share-pill" onClick={handleShare} aria-label="Share portfolio">
                        <span>🔗</span> Share
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
