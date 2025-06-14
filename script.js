// Add animation when social links appear
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    const profileImage = document.querySelector('.profile-image img');
    const container = document.querySelector('.container');

    // Simple key sequences
    const sequences = {
        'wow': {
            message: '🌈 WOW Effect Activated! 🌈',
            effect: () => {
                socialLinks.forEach(link => {
                    link.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        link.style.transform = 'scale(1)';
                    }, 500);
                });
            }
        },
        'fun': {
            message: '🎨 Color Party! 🎨',
            effect: () => {
                document.body.style.animation = 'backgroundParty 3s';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 3000);
            }
        },
        'spin': {
            message: '🌀 Spin Time! 🌀',
            effect: () => {
                socialLinks.forEach((link, i) => {
                    setTimeout(() => {
                        link.style.transition = 'transform 1s';
                        link.style.transform = 'rotate(360deg)';
                        setTimeout(() => {
                            link.style.transform = 'none';
                        }, 1000);
                    }, i * 100);
                });
            }
        },
        'boom': {
            message: '💥 Boom Effect! 💥',
            effect: () => {
                for (let i = 0; i < 30; i++) {
                    createConfetti();
                }
            }
        }
    };

    // Track typed keys
    let typedKeys = '';
    let typingTimer;

    // Listen for key presses
    document.addEventListener('keypress', (e) => {
        typedKeys += e.key.toLowerCase();
        
        // Check each sequence
        Object.entries(sequences).forEach(([sequence, { message, effect }]) => {
            if (typedKeys.includes(sequence)) {
                // Show message
                showMessage(message);
                // Run effect
                effect();
                // Reset typed keys
                typedKeys = '';
            }
        });

        // Reset after 2 seconds of no typing
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            typedKeys = '';
        }, 2000);

        // Keep string at reasonable length
        if (typedKeys.length > 10) {
            typedKeys = typedKeys.slice(-10);
        }
    });

    function showMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 18px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        document.body.appendChild(message);
        
        // Fade in
        setTimeout(() => {
            message.style.opacity = '1';
        }, 10);

        // Remove after 2 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 2000);
    }

    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let partyMode = false;

    document.addEventListener('keydown', (e) => {
        // Check if the pressed key matches the next key in the sequence
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // If we've matched all keys, activate party mode
            if (konamiIndex === konamiCode.length) {
                activatePartyMode();
                konamiIndex = 0; // Reset the index
            }
        } else {
            konamiIndex = 0; // Reset if wrong key is pressed
            // If the wrong key is the first key of the sequence, start over
            if (e.key === konamiCode[0]) {
                konamiIndex = 1;
            }
        }
    });

    // Party Mode Easter Egg
    function activatePartyMode() {
        if (partyMode) return;
        partyMode = true;
        
        // Add party mode class to body
        document.body.classList.add('party-mode');
        
        // Create and add party mode styles
        const partyStyle = document.createElement('style');
        partyStyle.textContent = `
            .party-mode {
                animation: backgroundParty 2s infinite !important;
            }
            
            .party-mode .container {
                animation: shake 0.5s infinite !important;
            }
            
            .party-mode .social-link {
                animation: rainbow 2s infinite !important;
            }
            
            @keyframes backgroundParty {
                0% { background-color: #ff0000; }
                20% { background-color: #00ff00; }
                40% { background-color: #0000ff; }
                60% { background-color: #ff00ff; }
                80% { background-color: #ffff00; }
                100% { background-color: #ff0000; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes rainbow {
                0% { background: #ff0000; }
                20% { background: #00ff00; }
                40% { background: #0000ff; }
                60% { background: #ff00ff; }
                80% { background: #ffff00; }
                100% { background: #ff0000; }
            }
        `;
        document.head.appendChild(partyStyle);

        // Create confetti
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }

        // Show success message
        showMessage('🎉 KONAMI CODE ACTIVATED! 🎉');

        // Reset after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('party-mode');
            partyMode = false;
        }, 10000);
    }

    // Profile Image Click Easter Egg
    let clickCount = 0;
    profileImage.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            profileImage.style.transform = 'rotate(360deg) scale(1.2)';
            profileImage.style.transition = 'transform 1s ease';
            
            setTimeout(() => {
                const sunglasses = document.createElement('div');
                sunglasses.className = 'sunglasses';
                sunglasses.innerHTML = '😎';
                sunglasses.style.position = 'absolute';
                sunglasses.style.top = '50%';
                sunglasses.style.left = '50%';
                sunglasses.style.transform = 'translate(-50%, -50%)';
                sunglasses.style.fontSize = '40px';
                sunglasses.style.opacity = '0';
                sunglasses.style.transition = 'opacity 0.5s ease';
                profileImage.appendChild(sunglasses);
                
                setTimeout(() => {
                    sunglasses.style.opacity = '1';
                }, 100);
            }, 1000);
            
            clickCount = 0;
        }
    });

    // Create confetti particles
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: fall ${Math.random() * 3 + 2}s linear;
        `;
        
        document.body.appendChild(confetti);
        
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // Add confetti animation style
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(960deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Add 3D tilt effect to profile image
    profileImage.parentElement.addEventListener('mousemove', (e) => {
        const rect = profileImage.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        profileImage.parentElement.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    profileImage.parentElement.addEventListener('mouseleave', () => {
        profileImage.parentElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    // Animate social links
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 * index);

        // Add hover effect
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
            link.style.background = `${getComputedStyle(link).background}, ${shine}`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.background = '';
        });

        // Add click ripple effect
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Mobile Easter Eggs
    let lastTap = 0;

    document.querySelector('.profile-image').addEventListener('touchstart', (e) => {
        const now = new Date().getTime();
        const timeSince = now - lastTap;
        
        if (timeSince < 300 && timeSince > 0) {
            // Double tap
            e.preventDefault();
            const profileImage = e.target;
            profileImage.style.animation = 'bounce 0.5s ease';
            setTimeout(() => profileImage.style.animation = '', 500);
        }
        
        lastTap = now;
    });

    let touchStartY = 0;
    document.querySelector('.container').addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.querySelector('.container').addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const distance = touchEndY - touchStartY;
        
        if (Math.abs(distance) > 100) {
            // Long swipe
            if (distance < 0) {
                // Swipe up - spin effect
                document.querySelector('.profile-image').style.animation = 'spin 1s linear infinite';
                setTimeout(() => document.querySelector('.profile-image').style.animation = '', 2000);
            } else {
                // Swipe down - rainbow effect
                document.querySelector('.container').style.animation = 'rainbow-bg 3s linear';
                setTimeout(() => document.querySelector('.container').style.animation = '', 3000);
            }
        }
    });

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes rainbow-bg {
            0% { background: linear-gradient(45deg, #ff0000, #ff8000); }
            20% { background: linear-gradient(45deg, #ff8000, #ffff00); }
            40% { background: linear-gradient(45deg, #ffff00, #00ff00); }
            60% { background: linear-gradient(45deg, #00ff00, #0000ff); }
            80% { background: linear-gradient(45deg, #0000ff, #ff00ff); }
            100% { background: linear-gradient(45deg, #ff00ff, #ff0000); }
        }
    `;
    document.head.appendChild(style);
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 100px;
        height: 100px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 1s linear;
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle); 