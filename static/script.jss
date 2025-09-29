// scripts/scripts.js - Utility scripts for Horoscope website

/**
 * Utility functions for the Horoscope website
 */

class HoroscopeUtils {
    constructor() {
        this.apiBaseUrl = window.location.origin;
    }

    // Initialize all utility functions
    init() {
        this.setupServiceWorker();
        this.setupAnalytics();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
        console.log('🔮 Horoscope utilities initialized');
    }

    // Service Worker for offline functionality
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✓ Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('✗ Service Worker registration failed:', error);
                });
        }
    }

    // Basic analytics
    setupAnalytics() {
        // Track page views
        this.trackEvent('page_view', {
            page: window.location.pathname,
            referrer: document.referrer
        });

        // Track user interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.zodiac-item, .humor-option, .cta-button')) {
                this.trackEvent('user_interaction', {
                    element: e.target.className,
                    action: 'click'
                });
            }
        });
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            this.trackEvent('error', {
                message: e.message,
                file: e.filename,
                line: e.lineno,
                column: e.colno
            });
        });

        // Promise rejection tracking
        window.addEventListener('unhandledrejection', (e) => {
            this.trackEvent('promise_rejection', {
                reason: e.reason?.message || e.reason
            });
        });
    }

    // Performance monitoring
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                this.trackEvent('performance', {
                    load_time: loadTime,
                    dom_ready: perfData.domContentLoadedEventEnd - perfData.navigationStart
                });
            });
        }
    }

    // Track events
    trackEvent(eventName, data = {}) {
        // In production, send to analytics service
        console.log(`📊 Event: ${eventName}`, data);
        
        // Simulate sending to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }

    // Local storage utilities
    storage = {
        set: (key, value) => {
            try {
                localStorage.setItem(`horoscope_${key}`, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },

        get: (key) => {
            try {
                const item = localStorage.getItem(`horoscope_${key}`);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Storage error:', e);
                return null;
            }
        },

        remove: (key) => {
            try {
                localStorage.removeItem(`horoscope_${key}`);
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        }
    };

    // Date utilities
    dateUtils = {
        getToday: () => new Date().toLocaleDateString('lv-LV'),
        
        getZodiacSign: (birthDate) => {
            const date = new Date(birthDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            
            if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Auns';
            if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Vērsis';
            if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Dvīņi';
            if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Vēzis';
            if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Lauva';
            if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Jaunava';
            if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Svari';
            if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Skorpions';
            if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Strēlnieks';
            if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Mežāzis';
            if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Ūdensvīrs';
            if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Zivis';
            
            return null;
        },

        formatDate: (date) => {
            return new Date(date).toLocaleDateString('lv-LV', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    // API utilities
    api = {
        getHoroscope: async (sign, humorLevel = 'normal') => {
            try {
                const response = await fetch(`/api/horoscope?sign=${sign}&humor_level=${humorLevel}`);
                if (!response.ok) throw new Error('API request failed');
                return await response.json();
            } catch (error) {
                console.error('API Error:', error);
                return this.generateFallbackHoroscope(sign, humorLevel);
            }
        },

        getZodiacSigns: async () => {
            try {
                const response = await fetch('/api/zodiac-signs');
                if (!response.ok) throw new Error('API request failed');
                return await response.json();
            } catch (error) {
                console.error('API Error:', error);
                return this.getDefaultZodiacSigns();
            }
        }
    };

    // Fallback horoscope generator
    generateFallbackHoroscope(sign, humorLevel) {
        const templates = {
            light: [
                `Laba diena ${sign}! Šodien sagaidiet mazus, bet jautrus pārsteigumus.`,
                `Esi pozitīvi noskaņots, ${sign}! Vislabākais vēl priekšā.`,
                `Šodien ir lieliska diena saules enerģijas uzņemšanai, ${sign}!`
            ],
            normal: [
                `Planētu izlīdzinājums rāda, ka ${sign} šodien būs veiksmīgs komunikācijā.`,
                `${sign}, šodien ir piemērots laiks izlēmumu pieņemšanai.`,
                `Mēness fāze ietekmē ${sign} emocionālo stabilitāti šodien.`
            ],
            strict: [
                `URĀ! ${sign}, šodien mainīsies VISS! Esat gatavs lieliem pārmaiņām?`,
                `SATRIECOŠI: ${sign}, šī diena būs pagrieziena punkts jūsu dzīvē!`,
                `BRĪDINĀJUMS: ${sign}, šodien jūs satiksiet likteni - nepalieciet mājās!`
            ]
        };

        const randomIndex = Math.floor(Math.random() * templates[humorLevel].length);
        
        return {
            sign: sign,
            humor_level: humorLevel,
            horoscope: templates[humorLevel][randomIndex],
            date: this.dateUtils.getToday(),
            is_fallback: true
        };
    }

    // Default zodiac signs data
    getDefaultZodiacSigns() {
        return [
            { name: "Auns", icon: "♈", dates: "21.03 - 19.04" },
            { name: "Vērsis", icon: "♉", dates: "20.04 - 20.05" },
            { name: "Dvīņi", icon: "♊", dates: "21.05 - 20.06" },
            { name: "Vēzis", icon: "♋", dates: "21.06 - 22.07" },
            { name: "Lauva", icon: "♌", dates: "23.07 - 22.08" },
            { name: "Jaunava", icon: "♍", dates: "23.08 - 22.09" },
            { name: "Svari", icon: "♎", dates: "23.09 - 22.10" },
            { name: "Skorpions", icon: "♏", dates: "23.10 - 21.11" },
            { name: "Strēlnieks", icon: "♐", dates: "22.11 - 21.12" },
            { name: "Mežāzis", icon: "♑", dates: "22.12 - 19.01" },
            { name: "Ūdensvīrs", icon: "♒", dates: "20.01 - 18.02" },
            { name: "Zivis", icon: "♓", dates: "19.02 - 20.03" }
        ];
    }

    // Animation utilities
    animations = {
        fadeIn: (element, duration = 500) => {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            const start = performance.now();
            
            function animate(time) {
                const elapsed = time - start;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = progress.toString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        },

        slideIn: (element, from = 'left', duration = 500) => {
            const transformMap = {
                left: 'translateX(-100px)',
                right: 'translateX(100px)',
                top: 'translateY(-100px)',
                bottom: 'translateY(100px)'
            };
            
            element.style.transform = transformMap[from];
            element.style.opacity = '0';
            element.style.display = 'block';
            
            const start = performance.now();
            
            function animate(time) {
                const elapsed = time - start;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.transform = `translate${from === 'left' || from === 'right' ? 'X' : 'Y'}(${(1 - progress) * 100 * (from === 'left' || from === 'top' ? -1 : 1)}px)`;
                element.style.opacity = progress.toString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        },

        pulse: (element, count = 3) => {
            let iterations = 0;
            
            function animate() {
                element.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                    iterations++;
                    
                    if (iterations < count) {
                        setTimeout(animate, 200);
                    }
                }, 200);
            }
            
            animate();
        }
    };

    // Validation utilities
    validation = {
        isEmail: (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        isDate: (dateString) => {
            const date = new Date(dateString);
            return date instanceof Date && !isNaN(date);
        },

        isZodiacSign: (sign) => {
            const validSigns = ['Auns', 'Vērsis', 'Dvīņi', 'Vēzis', 'Lauva', 'Jaunava', 
                              'Svari', 'Skorpions', 'Strēlnieks', 'Mežāzis', 'Ūdensvīrs', 'Zivis'];
            return validSigns.includes(sign);
        }
    };

    // Export data utilities
    exportUtils = {
        toJSON: (data, filename = 'horoscope_data.json') => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            this.downloadBlob(blob, filename);
        },

        toCSV: (data, filename = 'horoscope_data.csv') => {
            const headers = ['Sign', 'Humor Level', 'Horoscope', 'Date'];
            const csv = [
                headers.join(','),
                ...data.map(item => [
                    item.sign,
                    item.humor_level,
                    `"${item.horoscope.replace(/"/g, '""')}"`,
                    item.date
                ].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            this.downloadBlob(blob, filename);
        },

        downloadBlob: (blob, filename) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
}

// Initialize utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.horoscopeUtils = new HoroscopeUtils();
    window.horoscopeUtils.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HoroscopeUtils;
}