import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.png';

const skills = [
    'React.js', 'ASP.NET 8', 'C#', 'TypeScript', 'JavaScript',
    'Node.js', 'SQL Server', 'Docker', 'Firebase', 'Tailwind CSS',
    'PHP', 'Python', 'HTML & CSS', 'Tableau', '.NET Framework',
    'Entity Framework', 'Oracle DB', 'Cloud (OCI)', 'Figma', 'Git',
];

const About = () => {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(['.about-eyebrow', '.about-title', '.about-body-1', '.about-body-2', '.about-skills-label'], {
                scrollTrigger: { trigger: '#about', start: 'top 82%' },
                y: 32, autoAlpha: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
            });
            ScrollTrigger.batch('.skill-pill', {
                start: 'top 92%',
                onEnter: b => gsap.from(b, { scale: 0.8, autoAlpha: 0, duration: 0.35, stagger: 0.04, ease: 'back.out(1.6)' }),
            });
            gsap.from('.about-photo-wrap', {
                scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 80%' },
                x: 50, autoAlpha: 0, duration: 1, ease: 'power3.out',
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section className="section" id="about" ref={ref}>
            <hr className="section-divider" style={{ marginTop: 0, marginBottom: '3.5rem' }} />

            <div className="about-grid">
                <div className="about-content">
                    <div className="section-title-wrap">
                        <span className="section-num">01</span>
                        <p className="section-eyebrow about-eyebrow">About me</p>
                        <h2 className="section-title about-title">
                            Software Engineer from Tamil Nadu, India.
                        </h2>
                    </div>
                    <p className="section-body about-body-1">
                        I&apos;m <strong style={{ color: 'var(--text-1)' }}>Dinesh Karthick</strong>, a passionate
                        Full Stack Developer at <strong style={{ color: 'var(--text-1)' }}>CODUNT Technology</strong> in
                        Coimbatore — building scalable enterprise web applications with a focus on clean code
                        and exceptional user experience.
                    </p>
                    <p className="section-body about-body-2" style={{ marginTop: '-0.5rem' }}>
                        B.Sc. Computer Science at Arulmigu Palaniandavar College, currently pursuing MCA at
                        Bharathiar University. When not coding, I explore cloud architecture &amp; UI/UX design.
                    </p>

                    <div>
                        <p className="section-eyebrow about-skills-label" style={{ marginBottom: '0.85rem', marginTop: '0.5rem' }}>
                            Skills &amp; Tech
                        </p>
                        <div className="skills-wrap">
                            {skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
                        </div>
                    </div>
                </div>

                <div className="about-photo-wrap">
                    <img
                        src={profileImg}
                        alt="Dinesh Karthick"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
