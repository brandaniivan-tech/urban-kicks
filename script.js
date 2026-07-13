/**
 * Urban Kicks - Main JavaScript File
 * Pure Vanilla JS, responsive features, interactive catalog filtering, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if loaded
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Fixed Header on Scroll
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page loads scrolled

  // 2. Hamburger Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkElements = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on resize if screen becomes desktop sized
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // 3. Highlight Nav Links on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section, header');
  const navObserverOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '-80px 0px 0px 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;
        
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      navObserver.observe(section);
    }
  });

  // 4. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Animates only once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  console.log(faqItems);
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Open current item if it was not active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Interactive Catalog Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active state on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      catalogCards.forEach(card => {
        const cardBrand = card.getAttribute('data-brand').toLowerCase();
        
        // Hide/Show with fade animation
        if (filterValue === 'all' || cardBrand === filterValue || (filterValue === 'others' && !['nike', 'jordan', 'adidas', 'new balance'].includes(cardBrand))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Wait for transition to finish
        }
      });
    });
  });

  // 7. Dynamic WhatsApp Message Generation
  const phoneNumber = '5491136371685'; // Argentine standard format with country code

  // Handle general WhatsApp inquiries
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = "¡Hola, Urban Kicks! Me gustaría hacerles una consulta sobre el calzado.";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });

  // Handle specific product inquiries
  const productInquiryButtons = document.querySelectorAll('.product-inquiry-btn');
  productInquiryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.catalog-card');
      const modelName = card.querySelector('.catalog-card-title').textContent.trim();
      const brandName = card.querySelector('.catalog-card-brand').textContent.trim();
      
      const message = `¡Hola, Urban Kicks! Me interesa consultar por la disponibilidad del modelo "${modelName}" de la marca "${brandName}". ¿Tendrán stock disponible?`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  });

  // 8. Dynamic Scroll Indicator / Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
