import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlipCard from './FlipCard';

const categories = [
    {
        label: 'Cloud & DevOps',
        color: '#0f62fe',
        items: [
            {
                title: "Docker For .NET Developers",
                issuer: "Udemy",
                date: "2024",
                details: "Containerizing .NET apps, building, shipping, and running distributed applications.",
                skills: ["Docker", ".NET", "Microservices"],
                link: "#"
            },
            {
                title: "Fundamentals of Coding and Cloud",
                issuer: "IBM",
                date: "2023",
                details: "Cloud computing concepts, IaaS/PaaS/SaaS models, and cloud deployment principles.",
                skills: ["Cloud Basics", "DevOps"],
                link: "#"
            },
            {
                title: "Journey to Cloud: Solutioning",
                issuer: "IBM",
                date: "2023",
                details: "Cloud migration strategy, business requirement analysis, and scalable architecture design.",
                skills: ["Architecture", "Strategy"],
                link: "#"
            },
            {
                title: "Oracle Cloud Infrastructure",
                issuer: "Oracle",
                date: "2024",
                details: "OCI core concepts: IAM, networking, compute, storage, and security.",
                skills: ["OCI", "Security"],
                link: "#"
            },
            {
                title: "Oracle Cloud Architecture",
                issuer: "Oracle",
                date: "2024",
                details: "Designing cloud-native applications on OCI using best practices and patterns.",
                skills: ["Cloud Native", "Microservices"],
                link: "#"
            },
            {
                title: "Oracle Database Foundation",
                issuer: "Oracle",
                date: "2024",
                details: "Fundamental concepts of relational databases, SQL, and Oracle Database architecture.",
                skills: ["Oracle DB", "SQL"],
                link: "#"
            },
        ]
    },
    {
        label: 'Full Stack Development',
        color: '#a435f0',
        items: [
            {
                title: ".NET Core Entity Framework",
                issuer: "Udemy",
                date: "2023",
                details: "ORM mastery with EF Core, database migrations, LINQ, and performance tuning.",
                skills: ["EF Core", "SQL", "LINQ"],
                link: "#"
            },
            {
                title: "Advanced C# Programming",
                issuer: "Udemy",
                date: "2023",
                details: "Delegates, events, lambda expressions, generics, and async programming in C#.",
                skills: ["C#", "Async", "Generics"],
                link: "#"
            },
            {
                title: "Node.js Advanced Concepts",
                issuer: "Udemy",
                date: "2024",
                details: "Event loop, streams, buffering, and building performant Node.js services.",
                skills: ["Node.js", "Streams"],
                link: "#"
            },
            {
                title: "SQL Server Administration",
                issuer: "Udemy",
                date: "2023",
                details: "SQL Server management, backups, security, and performance optimization.",
                skills: ["SQL Server", "DBA"],
                link: "#"
            },
            {
                title: "HTML, CSS & JavaScript",
                issuer: "Coursera",
                date: "2023",
                details: "Comprehensive front-end development course covering semantic HTML, modern CSS, and JS ES6+.",
                skills: ["HTML5", "CSS3", "JS"],
                link: "#"
            },
            {
                title: "Beginning of PHP",
                issuer: "SoloLearn",
                date: "2023",
                details: "Introduction to server-side scripting with PHP, handling forms, sessions, and database connectivity.",
                skills: ["PHP", "Backend"],
                link: "#"
            },
        ]
    },
    {
        label: 'Data & Design',
        color: '#22d3ee',
        items: [
            {
                title: "Python + SQL + Tableau",
                issuer: "Udemy",
                date: "2023",
                details: "Data integration and visualization using Python, SQL, and Tableau.",
                skills: ["Python", "Tableau", "Data"],
                link: "#"
            },
            {
                title: "Basics of Python",
                issuer: "Infosys",
                date: "2023",
                details: "Core Python programming concepts, data structures, and algorithms.",
                skills: ["Python", "Algorithms"],
                link: "#"
            },
            {
                title: "Figma UI UX Design",
                issuer: "Udemy",
                date: "2023",
                details: "Principles of UI/UX design, prototyping, and wireframing in Figma.",
                skills: ["Figma", "UI/UX"],
                link: "#"
            },
        ]
    },
    {
        label: 'General & Tools',
        color: '#00a4ef',
        items: [
            {
                title: "Intro to Microsoft Office",
                issuer: "Microsoft",
                date: "2023",
                details: "Proficiency in Word, Excel, and PowerPoint for office productivity.",
                skills: ["Office 365", "Excel"],
                link: "#"
            },
            {
                title: "English Communication",
                issuer: "Coursera",
                date: "2023",
                details: "Professional business communication skills in English.",
                skills: ["Communication", "Soft Skills"],
                link: "#"
            },
            {
                title: "Responsive Site - Aalam Studio",
                issuer: "Personal",
                date: "2025",
                details: "Designed and developed a responsive website for a photography studio.",
                skills: ["React", "Web Design"],
                link: "#"
            },
        ]
    }
];

const Certificates = () => {
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const shared = { force3D: true, lazy: false };

            gsap.from(['.cert-eyebrow', '.cert-title'], {
                scrollTrigger: { trigger: '#certificates', start: 'top 80%', invalidateOnRefresh: true },
                y: 24, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out', ...shared,
            });

            categories.forEach((_cat, i) => {
                ScrollTrigger.batch(`.cat-group-${i} .flip-card-outer`, {
                    start: 'top 88%',
                    invalidateOnRefresh: true,
                    onEnter: batch => gsap.from(batch, {
                        y: 24, opacity: 0, stagger: 0.07, duration: 0.5,
                        ease: 'power2.out', force3D: true, lazy: false,
                    }),
                });
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section className="section" id="certificates" ref={ref}>
            <div className="section-title-wrap">
                <span className="section-num">04</span>
                <p className="section-eyebrow cert-eyebrow">Certifications</p>
                <h2 className="section-title cert-title">
                    Courses &amp; Certifications
                </h2>
            </div>

            <p className="section-body" style={{ marginBottom: '3rem' }}>
                Continuous upskilling across full-stack, cloud, data &amp; design. Click a card to see details.
            </p>

            <div className="cert-categories">
                {categories.map((cat, i) => (
                    <div key={i} className={`cert-category-group cat-group-${i}`} style={{ marginBottom: '3rem' }}>
                        <div className="cert-cat-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, boxShadow: `0 0 12px ${cat.color}` }}></span>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-1)' }}>{cat.label}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontWeight: 500 }}>{cat.items.length}</span>
                        </div>

                        <div className="cert-list-stack">
                            {cat.items.map((cert, j) => (
                                <FlipCard key={j} index={j} {...cert} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;
