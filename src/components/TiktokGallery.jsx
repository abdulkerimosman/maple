import React from 'react';

const TiktokGallery = () => {
    return (
        <section id="tiktok-gallery" className="tiktok-gallery">
            <div className="container">
                <div className="tiktok-header">
                    <h2 className="tiktok-title">TikTok Gallery</h2>
                    <p className="tiktok-subtitle">
                        Follow us on TikTok for more sweet moments!{' '}
                        <a
                            href="https://www.tiktok.com/@maple.et"
                            target="_blank"
                            rel="noreferrer"
                            className="tiktok-link"
                        >
                            @maple.et
                        </a>
                    </p>
                </div>

                <div className="tiktok-grid">
                    {/* Video 1 */}
                    <div className="tiktok-card">
                        <iframe
                            src="https://www.tiktok.com/embed/v2/7605899183748402453"
                            className="tiktok-iframe"
                            allow="encrypted-media;"
                            title="TikTok Video"
                            scrolling="no"
                        ></iframe>
                    </div>

                    {/* Video 2 */}
                    <div className="tiktok-card">
                        <iframe
                            src="https://www.tiktok.com/embed/v2/7599325178866240789"
                            className="tiktok-iframe"
                            allow="encrypted-media;"
                            title="TikTok Video"
                            scrolling="no"
                        ></iframe>
                    </div>

                </div>
            </div>

            <style>{`
                .tiktok-gallery {
                    background-color: var(--color-background);
                    padding-top: 5rem;
                    padding-bottom: 5rem;
                }
                .tiktok-header {
                    text-align: center;
                    max-width: 42rem;
                    margin: 0 auto 4rem;
                }
                .tiktok-title {
                    font-size: 2.5rem;
                    font-family: var(--font-serif);
                    color: var(--color-text-secondary);
                    margin-bottom: 1rem;
                }
                .tiktok-subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1.125rem;
                }
                .tiktok-link {
                    color: var(--color-secondary);
                    font-weight: 500;
                    margin-left: 0.5rem;
                }
                .tiktok-link:hover {
                    text-decoration: underline;
                }
                .tiktok-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    max-width: 1000px; /* Reduced max width for 2 columns */
                    margin: 0 auto;
                    padding: 0 1rem;
                    justify-items: center;
                }
                .tiktok-card {
                    width: 100%;
                    max-width: 400px; /* restrict stretching of the content */
                    height: 720px; /* Slightly taller to accommodate the wider aspect ratio of the iframe */
                    border-radius: 12px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }
                .tiktok-card:hover {
                    transform: translateY(-5px);
                }
                .tiktok-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    display: block;
                }

                /* Responsive Grid */
                @media (max-width: 1200px) {
                    .tiktok-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 640px) {
                    .tiktok-grid {
                        grid-template-columns: 1fr;
                        max-width: 400px;
                    }
                }
            `}</style>
        </section>
    );
};

export default TiktokGallery;
