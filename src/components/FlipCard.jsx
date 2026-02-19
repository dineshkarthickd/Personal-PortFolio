import { useState } from 'react';

const FlipCard = ({ index, title, issuer, date, details, link, skills }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`flip-card-wrapper ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
                {/* FRONT FACE: List Row */}
                <div className="flip-card-front cert-row-face">
                    <span className="cert-row-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="cert-row-name">{title}</span>
                    <span className={`cert-row-badge ${issuer.toLowerCase() === 'udemy' ? 'badge-udemy' : 'badge-other'}`}>
                        {issuer}
                    </span>
                    <span className="click-hint-icon">👆</span>
                </div>

                {/* BACK FACE: Details Card */}
                <div className="flip-card-back">
                    <div className="fc-header">
                        <div className={`cert-dot cert-dot-${issuer.toLowerCase() === 'udemy' ? 'udemy' : issuer.toLowerCase() === 'ibm' ? 'ibm' : 'other'}`} />
                        <span className="fc-issuer">{issuer} - {date}</span>
                    </div>

                    <div className="fc-back-content">
                        <p className="fc-desc">{details}</p>

                        {skills && (
                            <div className="fc-skills">
                                {skills.map(s => <span key={s}>{s}</span>)}
                            </div>
                        )}

                        <a
                            // href={link || "#"}
                            // target="_blank"
                            rel="noreferrer"
                            className="fc-link-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Verify Credential
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
