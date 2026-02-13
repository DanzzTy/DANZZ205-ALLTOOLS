document.addEventListener('DOMContentLoaded', () => {
    // --- Modern Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if(entry.target.classList.contains('tool-card')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-element').forEach(el => observer.observe(el));
    
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(card);
    });

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Tabs Functionality ---
    const tabs = document.querySelectorAll('.category-tab');
    const footerLinks = document.querySelectorAll('.footer-links a[href="#tools"]');
    
    function smoothFilterCards(category) {
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.category-tab[data-category=${category}]`);
        if(activeTab) activeTab.classList.add('active');

        cards.forEach(card => {
            card.classList.remove('visible'); 
            
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = (category === 'all' || cardCategory === category);

            if (shouldShow) {
                card.style.display = 'flex';
                void card.offsetWidth; 
                
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            smoothFilterCards(category);
        });
    });
    
     footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const category = e.target.closest('a').getAttribute('onclick').match(/'([^']+)'/)[1];
            smoothFilterCards(category);
            document.querySelector('#tools').scrollIntoView({behavior: 'smooth'}); 
        });
    });

    // --- Mobile Menu ---
    const mobileBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const icon = mobileBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { 
            if (navLinks.classList.contains('active')) {
                if (link.getAttribute('href').startsWith('#')) {
                    navLinks.classList.remove('active');
                    mobileBtn.querySelector('i').classList.remove('fa-times');
                    mobileBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
});
