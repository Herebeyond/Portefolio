import './styles/app.css';

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Navigation mobile : toggle + a11y (aria-expanded)
    if (navToggle && navLinks) {
        const setOpen = (open) => {
            navLinks.classList.toggle('nav-open', open);
            navToggle.classList.toggle('active', open);
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        };

        navToggle.addEventListener('click', () => {
            setOpen(!navLinks.classList.contains('nav-open'));
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setOpen(false));
        });

        // Fermer le menu avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
                setOpen(false);
                navToggle.focus();
            }
        });
    }

    // Animation au scroll — désactivée si l'utilisateur préfère moins d'animations
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.skill-card, .project-card, .timeline-item, .highlight-card, .interest-card, .certification-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    } else {
        // Sinon, tout est immédiatement visible
        document.querySelectorAll('.skill-card, .project-card, .timeline-item, .highlight-card, .interest-card, .certification-card').forEach(el => {
            el.classList.add('visible');
        });
    }

    // Navbar fixe avec effet au scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Project details modal
    const projectCards = document.querySelectorAll('[data-project-modal]');
    let lastFocusedCard = null;

    const openModal = (modal, trigger) => {
        if (!modal) return;
        lastFocusedCard = trigger || document.activeElement;
        modal.hidden = false;
        document.body.classList.add('modal-open');
        const closeBtn = modal.querySelector('.project-modal__close');
        if (closeBtn) closeBtn.focus();
    };

    const closeModal = (modal) => {
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
            lastFocusedCard.focus();
        }
    };

    projectCards.forEach(card => {
        const targetId = card.getAttribute('data-project-modal');
        const modal = document.getElementById(targetId);
        if (!modal) return;

        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button')) return;
            openModal(modal, card);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(modal, card);
            }
        });
    });

    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.querySelectorAll('[data-modal-close]').forEach(el => {
            el.addEventListener('click', () => closeModal(modal));
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openOne = document.querySelector('.project-modal:not([hidden])');
            if (openOne) closeModal(openOne);
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
        });
    }
});
