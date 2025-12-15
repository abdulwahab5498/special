document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const heartTrigger = document.querySelector('.heart-click-trigger');
    const heartBurstContainer = document.getElementById('heart-burst-container');
    const totalSlides = slides.length;
    let currentSlide = 0;

    // --- 1. CORE NAVIGATION FUNCTION ---
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active-slide');
            slide.style.opacity = '0';
        });

        slides[index].classList.add('active-slide');
        setTimeout(() => {
             slides[index].style.opacity = '1'; 
        }, 10);

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSlides - 1;
    }

    // --- 2. DIL BEHLA DENE WALA SCENE (Heart Burst on Click) ---
    if (heartTrigger) {
        heartTrigger.addEventListener('click', () => {
            const triggerRect = heartTrigger.getBoundingClientRect();
            const containerRect = heartBurstContainer.parentElement.getBoundingClientRect();
            
            const centerX = triggerRect.left - containerRect.left + triggerRect.width / 2;
            const centerY = triggerRect.top - containerRect.top + triggerRect.height / 2;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('span');
                particle.classList.add('heart-particle');
                particle.innerHTML = '❤️'; 
                
                particle.style.left = `${centerX}px`;
                particle.style.top = `${centerY}px`;

                const angle = Math.random() * 2 * Math.PI; 
                const distance = Math.random() * 100 + 50; 
                const finalX = centerX + Math.cos(angle) * distance;
                const finalY = centerY + Math.sin(angle) * distance;

                heartBurstContainer.appendChild(particle);

                setTimeout(() => {
                    particle.style.opacity = '1';
                    particle.style.transform = `translate(${finalX - centerX}px, ${finalY - centerY}px)`;
                }, 50);

                setTimeout(() => {
                    particle.remove();
                }, 1000); 
            }
        });
    }

    // --- 3. COUNTDOWN TIMER (Slide 4) ---
    function updateCountdown() {
        // *** CUSTOMIZED DATE: 18 December 2026 ***
        const anniversaryDate = new Date("December 18, 2026 00:00:00").getTime(); 
        const now = new Date().getTime();
        const distance = anniversaryDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = distance > 0 
                ? `${days} Din ${hours} Ghante ${minutes} Minute ${seconds} Seconds`
                : "Happy Anniversary, Kaname! Mubarak ho!";
        }
    }

    // --- 4. INITIALIZATION ---
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    showSlide(currentSlide);
    setInterval(updateCountdown, 1000);
    updateCountdown(); 
});
