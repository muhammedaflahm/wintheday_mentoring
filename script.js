// ==========================================================================
// WIN THE DAY MENTORING - MODERN INTERACTION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 8px 30px rgba(25, 23, 20, 0.08)';
        header.style.background = 'rgba(255, 255, 255, 0.96)';
      } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(251, 250, 247, 0.92)';
      }
    });
  }

  // 2. Mobile Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Mentors Roster Filtering
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const coachCards = document.querySelectorAll('.modern-coach-card');

  function filterMentors(sport) {
    coachCards.forEach(card => {
      const cardSport = card.getAttribute('data-sport');
      if (sport === 'all' || cardSport === sport) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  }

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sport = btn.getAttribute('data-sport');
      filterMentors(sport);
    });
  });

  // Support clicking on hero sport chips or bento tiles to filter
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const filterValue = link.getAttribute('data-filter');
      const matchingBtn = document.querySelector(`.segment-btn[data-sport="${filterValue}"]`);
      if (matchingBtn) {
        segmentBtns.forEach(b => b.classList.remove('active'));
        matchingBtn.classList.add('active');
        filterMentors(filterValue);
      }
      
      // Update active state on hero chips if clicked
      document.querySelectorAll('.sport-chip').forEach(chip => {
        if (chip.getAttribute('data-filter') === filterValue) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
    });
  });

  // 4. FAQ Modern Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');

        // Close all other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-active');
            const otherTrigger = otherItem.querySelector('.accordion-trigger');
            const otherPanel = otherItem.querySelector('.accordion-panel');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('is-active');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          item.classList.remove('is-active');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        }
      });
    }
  });

  // 5. Smooth Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.step-modern-card, .modern-coach-card, .bento-item, .flagship-pricing-card, .magazine-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // Inject revealed style helper
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
