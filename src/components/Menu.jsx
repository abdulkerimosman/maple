import React, { useState } from 'react';
import { menuData } from '../data/menuData';

const Menu = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="menu" className="menu-section">
            <div className="container">
                <div className="menu-header">
                    <h2 className="menu-title">Our Menu</h2>
                    <p className="menu-subtitle">Explore a variety of carefully crafted dishes and beverages.</p>
                </div>

                <div className="menu-tabs">
                    {menuData.map((category, index) => (
                        <button
                            key={index}
                            className={`menu-tab-btn ${activeTab === index ? 'active' : ''}`}
                            onClick={() => setActiveTab(index)}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                <div className="menu-content">
                    {menuData[activeTab].subcategories.map((sub, idx) => (
                        <div key={idx} className="menu-subcategory">
                            <h3 className="menu-subcategory-title">{sub.title}</h3>
                            <div className="menu-item-list-wrapper">
                                <ul className="menu-item-list">
                                    {sub.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="menu-item">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .menu-section {
                    padding: 6rem 0;
                    background-color: var(--color-background);
                }
                .menu-header {
                    text-align: center;
                    max-width: 48rem;
                    margin: 0 auto 3rem;
                }
                .menu-title {
                    font-size: 3rem;
                    font-family: var(--font-serif);
                    color: var(--color-text-primary);
                    margin-bottom: 1rem;
                }
                .menu-subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1.125rem;
                }
                
                .menu-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin-bottom: 4rem;
                }
                .menu-tab-btn {
                    padding: 0.75rem 2rem;
                    background: transparent;
                    border: 2px solid var(--color-primary);
                    color: var(--color-text-primary);
                    font-size: 1.1rem;
                    font-weight: 500;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .menu-tab-btn:hover {
                    background: rgba(212, 163, 115, 0.1);
                }
                .menu-tab-btn.active {
                    background: var(--color-primary);
                    color: white;
                    box-shadow: 0 4px 15px rgba(212, 163, 115, 0.4);
                }

                .menu-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 3rem 2rem;
                    padding: 0 1rem;
                    align-items: start;
                }
                
                .menu-subcategory {
                    background: transparent;
                    border-bottom: 1px solid rgba(44, 30, 22, 0.1); /* Subtle underlying line */
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    transition: border-color 0.4s ease;
                    cursor: pointer;
                    padding-bottom: 1rem;
                }
                
                .menu-subcategory:hover {
                    border-bottom-color: var(--color-primary);
                }

                .menu-subcategory-title {
                    font-family: var(--font-serif);
                    font-size: 1.6rem;
                    color: var(--color-text-primary);
                    margin: 0;
                    padding: 0.5rem 0 1rem 0;
                    text-align: left;
                    display: flex;
                    align-items: center;
                    justify-content: space-between; /* space for potential plus/minus icon */
                    transition: color 0.3s ease;
                    letter-spacing: 0.5px;
                }
                
                .menu-subcategory-title::after {
                    content: '+';
                    font-size: 1.4rem;
                    color: var(--color-primary);
                    font-weight: 300;
                    transition: transform 0.4s ease;
                }

                .menu-subcategory:hover .menu-subcategory-title::after {
                    content: '-';
                    transform: rotate(180deg);
                }
                
                .menu-subcategory:hover .menu-subcategory-title {
                    color: var(--color-primary);
                }
                
                .menu-item-list-wrapper {
                    display: grid;
                    grid-template-rows: 0fr;
                    transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .menu-subcategory:hover .menu-item-list-wrapper {
                    grid-template-rows: 1fr;
                }

                .menu-item-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    overflow: hidden;
                }
                
                .menu-subcategory:hover .menu-item-list {
                    padding: 0 0 1rem 0; 
                }
                
                .menu-item {
                    font-family: var(--font-sans);
                    font-size: 1.1rem;
                    color: var(--color-text-secondary);
                    position: relative;
                    padding-left: 0;
                    line-height: 1.6;
                    opacity: 0;
                    transform: translateX(-15px); /* Slide in from side feels more elegant than bottom */
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .menu-subcategory:hover .menu-item {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                /* Stagger the animation of the menu items sliding in */
                .menu-subcategory:hover .menu-item:nth-child(1) { transition-delay: 0.05s; }
                .menu-subcategory:hover .menu-item:nth-child(2) { transition-delay: 0.1s; }
                .menu-subcategory:hover .menu-item:nth-child(3) { transition-delay: 0.15s; }
                .menu-subcategory:hover .menu-item:nth-child(4) { transition-delay: 0.2s; }
                .menu-subcategory:hover .menu-item:nth-child(5) { transition-delay: 0.25s; }
                .menu-subcategory:hover .menu-item:nth-child(n+6) { transition-delay: 0.3s; }

                .menu-item:hover {
                    color: var(--color-text-primary);
                }

                /* Removing the leaf styling to make it cleaner */
                .menu-item::before {
                    content: none;
                }
            `}</style>
        </section>
    );
};

export default Menu;
