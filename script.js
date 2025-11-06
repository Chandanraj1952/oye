/*
 * ----------------------------------------
 * HOW TO CUSTOMIZE YOUR CARD
 * ----------------------------------------
 * Simply change the text inside the
 * quotation marks for each variable below.
 */

const CRUSH_NAME = "Priya";
const SENDER_NAME = "Chandan";
const MAIN_MESSAGE = 
`I know you’re not feeling your best right now… and I wish I could be there in person to hold you, make you laugh, and make everything feel a little lighter. 🫶  
But even from here, I want you to know this — you don’t have to be strong every moment. It’s okay to rest, to feel low, to breathe a little slow today. ❤️‍🩹  
Your comfort matters to me… your peace matters to me… *you* matter to me.  
If there’s anything I can do, even from a distance, just tell me — I’m right here, with all the warmth, patience, and softness you need. 🤍✨`;

const SUBMESSAGE = "Always cheering for your smile 💖";
const DATE = "6 Nov 2025";

/*
 * ----------------------------------------
 * (No need to edit below this line)
 * ----------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Setup ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get all DOM elements
    const elements = {
        landingScreen: document.getElementById("landing-screen"),
        openCardBtn: document.getElementById("open-card-btn"),
        cardContainer: document.getElementById("card-container"),
        crushNameBtn: document.getElementById("crush-name-btn"),
        crushNameCard: document.getElementById("crush-name-card"),
        mainMessage: document.getElementById("main-message"),
        date: document.getElementById("date"),
        senderNameBtn: document.getElementById("sender-name-btn"),
        fromSenderBtn: document.getElementById("from-sender-btn"),
        submessageToast: document.getElementById("submessage-toast"),
        submessageText: document.getElementById("submessage-text"),
        closeToastBtn: document.getElementById("close-toast-btn"),
        particleContainer: document.getElementById("particle-container")
    };

    let toastTimeout;

    // --- Core Functions ---

    /**
     * Populates all text content from placeholders
     */
    function setupContent() {
        elements.crushNameBtn.textContent = CRUSH_NAME;
        elements.crushNameCard.textContent = CRUSH_NAME;
        elements.senderNameBtn.textContent = SENDER_NAME;
        elements.submessageText.textContent = SUBMESSAGE;
        elements.date.textContent = DATE;
    }

    /**
     * Handles the "Open Card" button click
     */
    function showCard(e) {
        // 1. Trigger heart burst animation
        if (!prefersReducedMotion) {
            createHeartBurst(e);
        }

        // 2. Fade out landing screen
        elements.landingScreen.classList.add("hidden");
        // Remove from layout after fade
        setTimeout(() => {
            elements.landingScreen.style.display = "none";
        }, 500);

        // 3. Show the card
        elements.cardContainer.classList.add("visible");

        // 4. Start typewriter
        if (!prefersReducedMotion) {
            typewriter(MAIN_MESSAGE, elements.mainMessage);
        } else {
            // For reduced motion, just show text immediately
            elements.mainMessage.innerHTML = MAIN_MESSAGE;
        }
    }

    /**
     * Creates the typewriter effect
     */
    function typewriter(text, element) {
        let i = 0;
        element.innerHTML = ""; // Clear existing text
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50); // Adjust speed here (milliseconds)
            }
        }
        type();
    }

    /**
     * Shows the submessage toast
     */
    function showSubmessage() {
        // Clear any existing timer
        if (toastTimeout) clearTimeout(toastTimeout);
        
        elements.submessageToast.classList.add("visible");
        
        // Auto-dismiss after 4 seconds
        toastTimeout = setTimeout(() => {
            hideSubmessage();
        }, 4000);
    }

    /**
     * Hides the submessage toast
     */
    function hideSubmessage() {
        elements.submessageToast.classList.remove("visible");
    }


    // --- Animation Functions ---

    /**
     * Creates floating heart particles in the background
     */
    function createParticles() {
        if (prefersReducedMotion) return; // Skip if reduced motion
        
        const particleCount = 30; // Number of particles
        const emojis = ['💖', '✨', '💕', '💫', '🌸'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.innerHTML = emojis[i % emojis.length];
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.fontSize = `${Math.random() * 10 + 10}px`;
            
            const animDuration = Math.random() * 10 + 15; // 15s to 25s
            const animDelay = Math.random() * animDuration;
            
            particle.style.animationDuration = `${animDuration}s`;
            particle.style.animationDelay = `-${animDelay}s`; // Negative delay starts part-way
            
            elements.particleContainer.appendChild(particle);
        }
    }

    /**
     * Creates a burst of hearts on click
     */
    function createHeartBurst(e) {
        const burstCount = 20;
        
        // Get click position
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < burstCount; i++) {
            const burst = document.createElement('div');
            burst.innerHTML = '💖';
            burst.classList.add('burst-particle');
            
            burst.style.top = `${y}px`;
            burst.style.left = `${x}px`;
            
            // Random travel distance
            const randX = (Math.random() - 0.5) * 300;
            const randY = (Math.random() - 0.5) * 300;
            const scale = Math.random() * 0.5 + 0.5; // Random scale
            
            burst.style.setProperty('--x', `${randX}px`);
            burst.style.setProperty('--y', `${randY}px`);
            burst.style.transform = `scale(${scale})`;
            burst.style.opacity = Math.random() * 0.5 + 0.5;

            document.body.appendChild(burst);
            
            // Remove particle after animation
            setTimeout(() => {
                burst.remove();
            }, 800);
        }
    }


    // --- Initialization ---
    
    setupContent();
    createParticles();

    // Add event listeners
    elements.openCardBtn.addEventListener('click', showCard);
    elements.fromSenderBtn.addEventListener('click', showSubmessage);
    elements.closeToastBtn.addEventListener('click', hideSubmessage);
    
});