import { useState, useEffect, useRef } from 'react';

const links = [
    { label: 'About', href: '#about', icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>, icon2: <circle cx="12" cy="7" r="4"></circle> },
    { label: 'Experience', href: '#experience', icon: <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>, icon2: <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path> },
    { label: 'Projects', href: '#projects', icon: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path> },
    { label: 'Certificates', href: '#certificates', icon: <circle cx="12" cy="8" r="7"></circle>, icon2: <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline> },
    { label: 'Contact', href: '#contact', icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>, icon2: <polyline points="22,6 12,13 2,6"></polyline> },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    // Liquid Navbar State
    const [activeIndex, setActiveIndex] = useState(-1);
    const [hoverIndex, setHoverIndex] = useState(null);
    const navRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Theme toggle effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Update indicator position
    useEffect(() => {
        const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex;
        if (targetIndex >= 0 && navRef.current) {
            const items = navRef.current.querySelectorAll('.nav-link-pill');
            const target = items[targetIndex];
            if (target) {
                setIndicatorStyle({
                    left: target.offsetLeft,
                    width: target.offsetWidth,
                    opacity: 1
                });
            }
        } else {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [activeIndex, hoverIndex]);

    // Scroll Spy to set active index
    useEffect(() => {
        const sections = links.map(l => document.querySelector(l.href));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = links.findIndex(l => l.href === '#' + entry.target.id);
                        if (index !== -1) setActiveIndex(index);
                    }
                });
            },
            { rootMargin: '-40% 0px -50% 0px' }
        );

        sections.forEach(s => s && observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        setTheme(prev =>
            prev === 'dark' ? 'light' :
                prev === 'light' ? 'stranger' : 'dark'
        );
    };

    const themeIcon = theme === 'dark' ? '☀️' : theme === 'light' ? '🔴' : '🌙';
    const themeLabel = theme === 'dark' ? '☀️ Light Mode' : theme === 'light' ? '🔴 Stranger Things' : '🌙 Dark Mode';

    const handleNav = (e, index, href) => {
        e.preventDefault();
        setActiveIndex(index);
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Floating pill navbar */}
            <div className="navbar-outer">
                <nav
                    className="navbar-pill"
                    ref={navRef}
                    style={{
                        boxShadow: scrolled
                            ? '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)'
                            : '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    {/* Liquid Backdrop */}
                    <div
                        className="nav-backdrop"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            opacity: indicatorStyle.opacity
                        }}
                    />

                    {/* Logo */}
                    <a href="#hero" className="nav-logo-pill" onClick={e => handleNav(e, -1, '#hero')}>
                        {/* Home icon — shown on mobile only */}
                        <svg className="nav-home-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        {/* Text — shown on desktop only */}
                        <span className="nav-logo-text">Dinesh <span>K.</span></span>
                    </a>

                    <div className="nav-divider" />

                    {/* Links */}
                    {links.map((l, i) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className={`nav-link-pill ${activeIndex === i ? 'active' : ''}`}
                            onClick={e => handleNav(e, i, l.href)}
                            onMouseEnter={() => setHoverIndex(i)}
                        >
                            {/* Icons rendered but hidden via CSS usually, or kept visible */}
                            <span className="nav-icon-wrap" style={{ display: 'flex', alignItems: 'center', marginRight: '6px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" /* Slightly smaller */
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {l.icon}
                                    {l.icon2}
                                </svg>
                            </span>
                            <span className="nav-label">{l.label}</span>
                        </a>
                    ))}

                    <div className="nav-divider" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="nav-link-pill"
                        style={{ padding: '0.4rem 0.6rem', fontSize: '1.1rem', cursor: 'pointer', background: 'transparent', border: 'none' }}
                        aria-label="Toggle theme"
                        onMouseEnter={() => setHoverIndex(null)} // Don't move backdrop to theme toggle
                    >
                        {themeIcon}
                    </button>

                    {/* Hire me CTA */}
                    <a
                        href="mailto:dineshkarthick1610@gmail.com"
                        className="nav-cta-pill"
                        onMouseEnter={() => setHoverIndex(null)}
                    >
                        Hire me
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="nav-hamburger"
                        aria-label="Toggle menu"
                        onClick={() => setOpen(o => !o)}
                    >
                        <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
                        <span style={{ opacity: open ? 0 : 1 }} />
                        <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
                    </button>
                </nav>
            </div>

            {/* Mobile dropdown */}
            <div className={`nav-mobile-dropdown ${open ? 'open' : ''}`}>
                {links.map((l, i) => (
                    <a
                        key={l.label}
                        href={l.href}
                        className="nav-mobile-link"
                        onClick={e => handleNav(e, i, l.href)}
                    >
                        {l.label}
                    </a>
                ))}
                <button
                    onClick={() => { toggleTheme(); setOpen(false); }}
                    className="nav-mobile-link"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    {themeLabel}
                </button>
                <a
                    href="mailto:dineshkarthick1610@gmail.com"
                    className="nav-mobile-link"
                    style={{ color: 'var(--violet)', fontWeight: 600 }}
                >
                    ✉ Hire me
                </a>
            </div>
        </>
    );
};

export default Navbar;
