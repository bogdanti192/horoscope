/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #8B5CF6;
    --primary-dark: #7C3AED;
    --secondary: #06B6D4;
    --accent: #10B981;
    --text: #1F2937;
    --text-light: #6B7280;
    --background: #F9FAFB;
    --white: #FFFFFF;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --radius: 12px;
}

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: var(--text);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

/* Header styles */
.header {
    text-align: center;
    margin-bottom: 3rem;
    color: var(--white);
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.logo-icon {
    font-size: 3rem;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.logo h1 {
    font-size: 2.5rem;
    font-weight: 700;
}

.tagline {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
}

/* Main content layout */
.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;
}

@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}

/* Zodiac section */
.zodiac-section h2,
.humor-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--white);
    text-align: center;
}

.zodiac-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (max-width: 480px) {
    .zodiac-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.zodiac-item {
    background: var(--white);
    padding: 1.5rem 1rem;
    border-radius: var(--radius);
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: var(--shadow);
}

.zodiac-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.zodiac-item.selected {
    background: var(--primary);
    color: var(--white);
    border-color: var(--primary-dark);
    transform: scale(1.05);
}

.zodiac-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
}

.zodiac-name {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.zodiac-dates {
    font-size: 0.8rem;
    opacity: 0.7;
}

/* Humor section */
.humor-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.humor-option {
    background: var(--white);
    padding: 1.5rem;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.humor-option:hover {
    transform: translateX(5px);
    box-shadow: var(--shadow-lg);
}

.humor-option.selected {
    border-color: var(--primary);
    background: linear-gradient(135deg, var(--white) 0%, #f0f9ff 100%);
    transform: translateX(10px);
}

.humor-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.humor-content h3 {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
    color: var(--text);
}

.humor-content p {
    color: var(--text-light);
    font-size: 0.9rem;
}

/* CTA Button */
.cta-button {
    width: 100%;
    padding: 1.25rem 2rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    border: none;
    border-radius: var(--radius);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: var(--shadow-lg);
}

.cta-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.cta-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.cta-button .arrow {
    transition: transform 0.3s ease;
}

.cta-button:hover:not(:disabled) .arrow {
    transform: translateX(5px);
}

/* Footer */
.footer {
    text-align: center;
    padding: 2rem 0 0;
    color: var(--white);
    opacity: 0.8;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.zodiac-item,
.humor-option {
    animation: fadeIn 0.6s ease-out forwards;
}

/* Success state */
.success-message {
    background: var(--accent);
    color: var(--white);
    padding: 1rem;
    border-radius: var(--radius);
    text-align: center;
    margin-top: 1rem;
    animation: fadeIn 0.5s ease-out;
}