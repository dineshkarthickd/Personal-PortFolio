import { useEffect, useState } from 'react';

const PageLoader = () => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setVisible(false), 600);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`page-loader ${fadeOut ? 'page-loader-out' : ''}`}>
            <div className="pl-inner">
                <div className="pl-logo">
                    <span>D</span>
                    <span>K</span>
                </div>
                <div className="pl-bar-track">
                    <div className="pl-bar-fill" />
                </div>
                <p className="pl-tagline">Loading experience…</p>
            </div>
        </div>
    );
};

export default PageLoader;
