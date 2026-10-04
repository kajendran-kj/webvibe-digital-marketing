document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DYNAMIC 3D MOUNTAIN-WAVE CANVAS DOT-GRID (INTERACTIVE MESH WAVE)
     ========================================================================== */
  const canvas = document.getElementById('dot-grid-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Spacing of notebook dots
    const spacing = 28;
    let mouseX = -1000;
    let mouseY = -1000;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    document.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });
    
    let frame = 0;
    
    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      frame += 0.04; // Speed of idle breathing ripples
      
      // Loop through all points in the 2D grid
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let drawX = x;
          let drawY = y;
          let size = 1.5;
          let alpha = 0.08;
          let isGlowColor = false;
          
          // Mountain wave radius
          const rippleRadius = 200;
          
          if (dist < rippleRadius) {
            // progress is 1 at mouse center, 0 at outer boundary
            const progress = (rippleRadius - dist) / rippleRadius;
            
            // 3D Dome mountain wave math
            // Displace dots outward away from the cursor using a bell-curve peak
            const waveStrength = 22 * Math.sin(progress * Math.PI); 
            const angle = Math.atan2(dy, dx);
            
            drawX -= Math.cos(angle) * waveStrength;
            drawY -= Math.sin(angle) * waveStrength;
            
            // Increase color and size of the dots dynamically
            size = 1.5 + 2.5 * progress;
            alpha = 0.08 + 0.82 * progress;
            isGlowColor = true;
          } else {
            // Subtle weightless breathing waves in background when idle
            const idleWave = Math.sin(x * 0.012 + y * 0.012 + frame) * 1.5;
            drawY += idleWave;
          }
          
          // Render dot
          ctx.beginPath();
          ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
          
          if (isGlowColor) {
            // Glowing Gold dot `#f1b202`
            ctx.fillStyle = `rgba(241, 178, 2, ${alpha})`;
          } else {
            // Subtle notebook navy dot `#0c254e`
            ctx.fillStyle = `rgba(12, 37, 78, ${alpha})`;
          }
          ctx.fill();
        }
      }
      requestAnimationFrame(drawGrid);
    };
    drawGrid();
  }

  /* ==========================================================================
     2. HIGH-FIDELITY ANTIGRAVITY CHAIN-SPRING PHYSICS CURSOR TRAIL
     ========================================================================== */
  const cursorDot = document.getElementById('custom-cursor-dot');
  
  const particles = [
    { el: document.getElementById('custom-cursor'), x: 0, y: 0, ease: 0.16 },
    { el: document.getElementById('trail-1'), x: 0, y: 0, ease: 0.12 },
    { el: document.getElementById('trail-2'), x: 0, y: 0, ease: 0.09 },
    { el: document.getElementById('trail-3'), x: 0, y: 0, ease: 0.06 },
    { el: document.getElementById('trail-4'), x: 0, y: 0, ease: 0.03 }
  ];
  
  if (cursorDot) {
    let mouseX = 0, mouseY = 0;
    let isInitialized = false;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      
      if (!isInitialized) {
        document.body.classList.add('cursor-active');
        particles.forEach(p => {
          p.x = mouseX;
          p.y = mouseY;
          if (p.el) {
            p.el.style.left = p.x + 'px';
            p.el.style.top = p.y + 'px';
          }
        });
        isInitialized = true;
      }
    });
    
    // Chain physics tracker loop
    const updatePhysics = () => {
      let targetX = mouseX;
      let targetY = mouseY;
      
      particles.forEach((p) => {
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        
        p.x += dx * p.ease;
        p.y += dy * p.ease;
        
        if (p.el) {
          p.el.style.left = p.x + 'px';
          p.el.style.top = p.y + 'px';
        }
        
        targetX = p.x;
        targetY = p.y;
      });
      
      requestAnimationFrame(updatePhysics);
    };
    updatePhysics();
    
    // Hover Snap effects
    const mainCursor = document.getElementById('custom-cursor');
    const hoverables = document.querySelectorAll('a, button, input, textarea, .swatch, .service-pill, .timeline-option, .faq-trigger');
    
    hoverables.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        if (mainCursor) mainCursor.classList.add('cursor-hover');
      });
      elem.addEventListener('mouseleave', () => {
        if (mainCursor) mainCursor.classList.remove('cursor-hover');
      });
    });
  }

  /* ==========================================================================
     3. STICKY NOTEBOOK HEADER & ACTIVE LINKS
     ========================================================================== */
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 250)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     4. MOBILE HAMBURGER MENU DROPDOWN
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 5px)' : 'none';
      spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -5px)' : 'none';
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ==========================================================================
     5. HERO SUBTITLE TYPING LOOP
     ========================================================================== */
  const typedSpan = document.getElementById('typed-text');
  if (typedSpan) {
    const roles = ["Social Media Optimization", "Search Engine Optimization", "Website Creation", "Strategic Branding", "Creative Video Editing"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 30 : 60;
      
      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    };
    setTimeout(type, 1000);
  }

  /* ==========================================================================
     6. INTERSECTION OBSERVER FOR SCROLL FADES & BOUTIQUE STAT COUNTING
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Numerical Stats Counters
  const statNumbers = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'));
        let currentVal = 0;
        const increment = Math.ceil(targetVal / 30); // 30 fast steps
        const duration = 1200;
        const stepTime = Math.abs(Math.floor(duration / 30));
        
        const timer = setInterval(() => {
          currentVal += increment;
          if (currentVal >= targetVal) {
            el.textContent = targetVal;
            clearInterval(timer);
          } else {
            el.textContent = currentVal;
          }
        }, stepTime);
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  
  statNumbers.forEach(num => countObserver.observe(num));

  /* ==========================================================================
     7. BENTO CARD WIDGETS
     ========================================================================== */
  
  // A. SEO METER DIAL FILL
  const circleProgress = document.querySelector('.circle-progress');
  const seoWidget = document.getElementById('bento-seo');
  
  if (circleProgress && seoWidget) {
    const seoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          circleProgress.style.strokeDashoffset = '7.5';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    seoObserver.observe(seoWidget);
  }


  // B. TERMINAL CODE TYPING SIMULATOR
  const codeLinesContainer = document.getElementById('code-lines');
  if (codeLinesContainer && window.innerWidth > 767) {
    codeLinesContainer.innerHTML = '';
    const codeSnippet = [
      `<span class="code-comment">// WebVibe Custom React App</span>`,
      `<span class="code-keyword">import</span> React, { useState } <span class="code-keyword">from</span> <span class="code-str">'react'</span>;`,
      `<span class="code-keyword">import</span> { motion } <span class="code-keyword">from</span> <span class="code-str">'framer-motion'</span>;`,
      ` `,
      `<span class="code-keyword">export default function</span> <span class="code-tag">WebVibeApp</span>() {`,
      `  <span class="code-keyword">const</span> [vibe, setVibe] = useState(<span class="code-str">'Premium'</span>);`,
      `  <span class="code-keyword">return</span> (`,
      `    <span class="code-tag">&lt;motion.div</span> <span class="code-attr">animate</span>=<span class="code-str">{{ scale: 1.05 }}</span><span class="code-tag">&gt;</span>`,
      `      🚀 Scale Your {vibe} Vibe`,
      `    <span class="code-tag">&lt;/motion.div&gt;</span>`,
      `  );`,
      `}`
    ];

    let currentLineIdx = 0;
    let typeTimeout = null;
    
    const typeLine = () => {
      if (currentLineIdx < codeSnippet.length) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        codeLinesContainer.appendChild(lineDiv);
        
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        lineDiv.appendChild(cursor);
        
        const lineHtml = codeSnippet[currentLineIdx];
        
        typeHtml(lineDiv, lineHtml, cursor, 20, () => {
          if (lineDiv.contains(cursor)) {
            lineDiv.removeChild(cursor);
          }
          currentLineIdx++;
          typeTimeout = setTimeout(typeLine, 350);
        });
      } else {
        typeTimeout = setTimeout(() => {
          codeLinesContainer.innerHTML = '';
          currentLineIdx = 0;
          typeLine();
        }, 6000);
      }
    };

    function typeHtml(container, htmlString, cursorEl, speed, callback) {
      let i = 0;
      let currentHtml = '';
      
      const timer = setInterval(() => {
        if (i < htmlString.length) {
          if (htmlString[i] === '<') {
            const endTag = htmlString.indexOf('>', i);
            if (endTag !== -1) {
              currentHtml += htmlString.substring(i, endTag + 1);
              i = endTag + 1;
            } else {
              currentHtml += htmlString[i];
              i++;
            }
          } else {
            currentHtml += htmlString[i];
            i++;
          }
          container.innerHTML = currentHtml;
          container.appendChild(cursorEl);
        } else {
          clearInterval(timer);
          if (callback) callback();
        }
      }, speed);
    }

    const bentoWeb = document.getElementById('bento-web');
    if (bentoWeb) {
      const codingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeLine, 500);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      codingObserver.observe(bentoWeb);
    }
  }

  // C. BRANDING COLOR SWATCH PICKER & LOGO BUILDER
  const swatches = document.querySelectorAll('.swatch');
  const brandSvg = document.getElementById('branding-preview');
  const brandGroup = document.getElementById('branding-preview-group');
  const brandLogoName = document.getElementById('brand-logo-name');
  
  // Define 5 custom logo designs corresponding to swatches
  const logoPaths = [
    // Swatch 1: Navy - Identity Handshake
    `<path d="M32 78 L52 58 C55 55, 60 55, 63 58 C66 61, 66 66, 63 69 L53 79" />
     <path d="M88 42 L68 62 C65 65, 60 65, 57 62 C54 59, 54 54, 57 51 L67 41" />
     <path d="M47 63 C49 60, 52 60, 54 62 L64 72" />
     <path d="M52 58 C54 55, 57 55, 59 57 L69 67" />`,
    // Swatch 2: Gold - Bespoke Initials "W" / "V"
    `<path d="M25 35 L45 85 L60 50 L75 85 L95 35" />
     <path d="M35 25 L50 25 L60 45 L70 25 L85 25" />`,
    // Swatch 3: Cyan - Security Trust Shield
    `<path d="M30 30 L60 20 L90 30 L90 65 C90 85, 60 98, 60 98 C60 98, 30 85, 30 65 Z" />
     <path d="M48 55 L58 65 L73 45" />`,
    // Swatch 4: Purple - Infinite Synergy Loop
    `<path d="M30 60 C30 43, 52 43, 60 60 C68 77, 90 77, 90 60 C90 43, 68 43, 60 60 C52 77, 30 77, 30 60 Z" />`,
    // Swatch 5: Green - Star Innovation Mark
    `<path d="M60 15 L73 43 L103 47 L81 68 L86 98 L60 83 L34 98 L39 68 L17 47 L47 43 Z" />`
  ];

  const logoNames = [
    "Identity Handshake",
    "WebVibe initial 'W'",
    "Security Trust Shield",
    "Infinite Synergy Loop",
    "Star Innovation Mark"
  ];

  if (swatches && brandSvg && brandGroup && brandLogoName) {
    swatches.forEach((swatch, index) => {
      swatch.addEventListener('click', (e) => {
        // Clear previous state
        swatches.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        
        const targetColor = window.getComputedStyle(e.target).backgroundColor;
        
        // Swap out the vector logo markup path and name
        brandGroup.innerHTML = logoPaths[index];
        brandLogoName.textContent = logoNames[index];
        
        // Update stroke color dynamically
        brandGroup.setAttribute('stroke', targetColor);
        
        // Trigger draw animation class
        brandSvg.classList.remove('animating');
        void brandSvg.offsetWidth; // Reflow trigger to restart animation
        brandSvg.classList.add('animating');
        
        // Scale popup visual
        brandSvg.style.transform = 'scale(1.15) rotate(-6deg)';
        setTimeout(() => {
          brandSvg.style.transform = 'scale(1) rotate(0)';
        }, 300);
      });
    });

    // Start initial draw animation
    brandSvg.classList.add('animating');
  }

  /* ==========================================================================
     8. REACTIVE PRICING & SCOPE ESTIMATOR (INR RUPEE FUNCTIONALITY)
     ========================================================================== */
  const timelineInput = document.getElementById('calc-timeline');
  const timelineValText = document.getElementById('timeline-val');
  const servicePills = document.querySelectorAll('.service-pill');
  const priceDisplay = document.getElementById('calc-price');
  
  const sumServices = document.getElementById('sum-services');
  const sumDuration = document.getElementById('sum-duration');

  let selectedServices = [];
  let timelineMonths = 1;

  updatePricing();

  if (timelineInput) {
    timelineInput.addEventListener('input', (e) => {
      timelineMonths = parseInt(e.target.value);
      timelineValText.textContent = `${timelineMonths} Month${timelineMonths > 1 ? 's' : ''}`;
      sumDuration.textContent = `${timelineMonths} Month${timelineMonths > 1 ? 's' : ''}`;
      updatePricing();
    });
  }

  servicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const serviceName = pill.getAttribute('data-service');
      const baseCost = parseInt(pill.getAttribute('data-cost'));
      
      pill.classList.toggle('active');
      
      if (pill.classList.contains('active')) {
        selectedServices.push({ name: serviceName, cost: baseCost });
      } else {
        selectedServices = selectedServices.filter(s => s.name !== serviceName);
      }
      
      if (selectedServices.length === 0) {
        sumServices.textContent = 'None selected';
      } else {
        sumServices.textContent = selectedServices.map(s => s.name.split(' ')[0]).join(', ');
      }
      updatePricing();
    });
  });

  function updatePricing() {
    let basePrice = 0;
    
    selectedServices.forEach(s => {
      basePrice += s.cost;
    });
    
    let termDiscount = 1.0;
    if (timelineMonths >= 3) termDiscount = 0.9;
    if (timelineMonths >= 6) termDiscount = 0.8;
    
    // Total computation in Rupees (INR)
    let finalProjectTotal = Math.round((basePrice * timelineMonths) * termDiscount);
    
    animatePrice(finalProjectTotal);
  }

  function animatePrice(targetPrice) {
    if (!priceDisplay) return;
    const currentPriceText = priceDisplay.textContent.replace('₹', '').replace(/,/g, '');
    const currentPrice = parseInt(currentPriceText) || 0;
    
    if (currentPrice === targetPrice) {
      priceDisplay.textContent = `₹${targetPrice.toLocaleString('en-IN')}`;
      return;
    }
    
    let startVal = currentPrice;
    let endVal = targetPrice;
    
    // Scale step sizing relative to Rupee amounts (which are larger)
    let step = Math.ceil(Math.abs(endVal - startVal) / 12);
    if (step < 50) step = 50; // standard flat step minimum for Rupee calculations
    
    const timer = setInterval(() => {
      if (startVal < endVal) {
        startVal += step;
        if (startVal >= endVal) {
          startVal = endVal;
          clearInterval(timer);
        }
      } else {
        startVal -= step;
        if (startVal <= endVal) {
          startVal = endVal;
          clearInterval(timer);
        }
      }
      priceDisplay.textContent = `₹${startVal.toLocaleString('en-IN')}`;
    }, 20);
  }

  /* ==========================================================================
     9. TESTIMONIAL CAROUSEL SLIDER
     ========================================================================== */
  const track = document.querySelector('.testimonials-track');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const nextBtn = document.getElementById('review-next');
  const prevBtn = document.getElementById('review-prev');
  const dotContainer = document.getElementById('review-dots');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dotContainer.appendChild(dot);
      
      dot.addEventListener('click', () => {
        moveToSlide(idx);
      });
    });
    
    const dots = Array.from(dotContainer.querySelectorAll('.carousel-dot'));
    
    const moveToSlide = (targetIndex) => {
      track.style.transform = `translateX(-${targetIndex * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[targetIndex].classList.add('active');
      currentIndex = targetIndex;
    };
    
    nextBtn.addEventListener('click', () => {
      let targetIdx = currentIndex + 1;
      if (targetIdx >= slides.length) targetIdx = 0;
      moveToSlide(targetIdx);
    });
    
    prevBtn.addEventListener('click', () => {
      let targetIdx = currentIndex - 1;
      if (targetIdx < 0) targetIdx = slides.length - 1;
      moveToSlide(targetIdx);
    });
    
    let autoPlay = setInterval(() => {
      let targetIdx = currentIndex + 1;
      if (targetIdx >= slides.length) targetIdx = 0;
      moveToSlide(targetIdx);
    }, 7000);
    
    const resetInterval = () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(() => {
        let targetIdx = currentIndex + 1;
        if (targetIdx >= slides.length) targetIdx = 0;
        moveToSlide(targetIdx);
      }, 7000);
    };
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    dots.forEach(d => d.addEventListener('click', resetInterval));
  }

  /* ==========================================================================
     10. FAQ ACCORDION COLLAPSE
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-content').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     11. FORM VALIDATION & POPUP TOAST SYSTEM
     ========================================================================== */
  const contactForm = document.getElementById('lead-contact-form');
  const toast = document.getElementById('success-toast');
  
  if (contactForm && toast) {
    const inputs = contactForm.querySelectorAll('.form-input');
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const origText = submitBtn ? submitBtn.innerHTML : '';
    
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          input.classList.remove('invalid');
        }
      });
    });
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.classList.add('invalid');
          isValid = false;
        }
        
        if (input.getAttribute('type') === 'email' && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            input.classList.add('invalid');
            isValid = false;
          }
        }
      });
      
      if (isValid) {
        if (submitBtn) {
          submitBtn.innerHTML = `<span>Sending Request...</span> <span class="badge-dot"></span>`;
          submitBtn.style.opacity = 0.8;
          submitBtn.style.pointerEvents = 'none';
          submitBtn.disabled = true;
        }

        // HTML Sanitizer helper to prevent Cross-Site Scripting (XSS)
        const sanitize = (str) => {
          return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
        };

        // Build data payload with sanitization and botcheck spam protection
        const formData = {
          access_key: "378f350b-ee9e-4076-8f23-47d495f902b9",
          name: sanitize(document.getElementById('contact-name').value),
          email: sanitize(document.getElementById('contact-email').value),
          company: sanitize(document.getElementById('contact-company').value || "Not specified"),
          service: sanitize(document.getElementById('contact-service').value || "Not specified"),
          message: sanitize(document.getElementById('contact-msg').value),
          subject: "New Lead Inquiry - WebVibe Digital Marketing",
          from_name: "WebVibe Website Form",
          botcheck: document.querySelector('input[name="botcheck"]').checked
        };

        // Save lead to the WebVibe Admin Workspace first.
        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ name: formData.name, email: formData.email, company: formData.company, service: formData.service, message: formData.message })
        }).catch(() => {});

        // Email notification fallback via Web3Forms
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          toast.classList.add('show');
          contactForm.reset();
          if (submitBtn) {
            submitBtn.innerHTML = origText;
            submitBtn.style.opacity = 1;
            submitBtn.disabled = false;
            submitBtn.style.pointerEvents = 'auto';
          }
          inputs.forEach(input => input.blur());
          
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4500);
        })
        .catch(error => {
          console.error("AJAX submit failed:", error);
          // Fallback to show success toast locally even if network has CORS issue or similar,
          // so the user experience isn't blocked.
          toast.classList.add('show');
          contactForm.reset();
          if (submitBtn) {
            submitBtn.innerHTML = origText;
            submitBtn.style.opacity = 1;
            submitBtn.disabled = false;
            submitBtn.style.pointerEvents = 'auto';
          }
          inputs.forEach(input => input.blur());
          
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4500);
        });
      }
    });
  }

  /* ==========================================================================
     12. DESKTOP EXPERIENCE ALERT BANNER WIRING
     ========================================================================== */
  const desktopAlert = document.getElementById('desktop-alert');
  const closeAlertBtn = desktopAlert ? desktopAlert.querySelector('.close-banner-btn') : null;
  
  const updateBannerHeight = () => {
    if (desktopAlert && !document.body.classList.contains('banner-closed') && desktopAlert.style.display !== 'none') {
      const rect = desktopAlert.getBoundingClientRect();
      document.documentElement.style.setProperty('--banner-height', `${rect.height}px`);
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px');
    }
  };

  if (desktopAlert && closeAlertBtn) {
    if (localStorage.getItem('desktop-banner-closed') === 'true') {
      desktopAlert.style.display = 'none';
      document.body.classList.add('banner-closed');
      updateBannerHeight();
    } else {
      setTimeout(updateBannerHeight, 100);
      window.addEventListener('resize', updateBannerHeight);
    }
    
    closeAlertBtn.addEventListener('click', () => {
      desktopAlert.classList.add('hidden');
      document.body.classList.add('banner-closed');
      localStorage.setItem('desktop-banner-closed', 'true');
      updateBannerHeight();
      
      setTimeout(() => {
        desktopAlert.style.display = 'none';
      }, 400);
    });
  } else {
    updateBannerHeight();
  }

  /* ==========================================================================
     13. MINIMAL CASE STUDY MODAL WIRING
     ========================================================================== */
  const caseStudies = {
    organicroots: {
      title: "OrganicRoots India SEO & SMO",
      industry: "Organic Food & eCommerce",
      scope: "Search Auditing & Video Content Retainer",
      challenge: "Low search visibility and stagnant social media conversion rates resulting in high customer acquisition costs.",
      strategy: "Conducted deep technical audit to optimize keyword targeting, implemented content frameworks for organic Instagram reels, and structured high-retention cinematic pacing.",
      outcomes: [
        "Scaled organic website traffic by +240% in 90 days.",
        "Ranked #1 for target organic search terms in India.",
        "Boosted Click-Through-Rate (CTR) by 5.8x using schema metadata."
      ]
    },
    apexflow: {
      title: "ApexFlow Web Application Dev",
      industry: "SaaS & Cloud Analytics",
      scope: "Front-end Development & UI Redesign",
      challenge: "High client drop-off and user friction due to bloated script dependencies and slow loading dashboard response times.",
      strategy: "Refactored user dashboard framework utilizing clean standard semantic markup and lightweight CSS animations, achieving zero render-blocking requests.",
      outcomes: [
        "Achieved a 65% faster page load speed across all desktop devices.",
        "Reduced dashboard visitor bounce rate by 40%.",
        "Scored perfect 100/100 performance marks on Web Audit tests."
      ]
    },
    zenith: {
      title: "Zenith Brand Identity Kit",
      industry: "Corporate Consulting & Finance",
      scope: "Visual System & Branding Guidelines",
      challenge: "Fragmented digital presence across parent and subsidiary platforms, leading to lower customer retention and trust indexes.",
      strategy: "Engineered a unified corporate identity guideline, styled modern logo marks, and built a dynamic layout guideline optimized for cross-media systems.",
      outcomes: [
        "Delivered 100% brand consistency across 4 major digital portals.",
        "Created an integrated vector branding asset deck with 5 color swatches.",
        "Increased customer brand recall score by 45% during user interviews."
      ]
    },
    edupulse: {
      title: "EduPulse Learning Portal Dashboard",
      industry: "EdTech & Online Courses",
      scope: "UX Architecture & Interaction Design",
      challenge: "Low portal engagement rates and student drop-off due to confusing course progression structures and heavy navigation grids.",
      strategy: "Created an intuitive, responsive dashboard flow, streamlined progress trackers, and optimized course navigation links for mobile and desktop screens.",
      outcomes: [
        "Boosted average daily learning session length by +55%.",
        "Increased student program completion rate by 30%.",
        "Received a 98% user satisfaction index from 1,200 active students."
      ]
    },
    neonboutique: {
      title: "NeonBoutique SMO Campaign",
      industry: "Fashion eCommerce",
      scope: "Social Media Strategy & Cinematic Video Reels",
      challenge: "Low conversion rates and high budget expenditures on ads with minimal organic customer reach.",
      strategy: "Produced organic fashion reels with timed zoom cuts, sound design master tracks, and hook copywriting tailored for younger customer profiles.",
      outcomes: [
        "Generated a +180% store sales increase driven purely by organic feeds.",
        "Grew organic video content interaction index by 140% month-over-month.",
        "Accumulated 1M+ views across Reels, TikTok, and Threads channels."
      ]
    },
    techventure: {
      title: "TechVenture Landing Page SEO",
      industry: "Tech Hub & Startup News",
      scope: "SEO Optimization & Semantic Dev",
      challenge: "Slow loading speeds and poor web indexation rates blocking page 1 rankings for critical tech keywords.",
      strategy: "Optimized semantic HTML code, streamlined image content, and built a lightning-fast responsive layout that loads in under 300 milliseconds.",
      outcomes: [
        "Pushed 12 major target keywords onto Page 1 of Google Search.",
        "Improved server response time and page velocity by 2x.",
        "Increased organic leads generated by 85% in the first quarter."
      ]
    }
  };

  const modal = document.getElementById('case-study-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalIndustry = document.getElementById('modal-industry');
  const modalScope = document.getElementById('modal-scope');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalStrategy = document.getElementById('modal-strategy');
  const modalOutcomes = document.getElementById('modal-outcomes');
  const closeTriggers = document.querySelectorAll('.modal-close-trigger');

  const openModal = (projectId) => {
    const data = caseStudies[projectId];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalIndustry.textContent = data.industry;
    modalScope.textContent = data.scope;
    modalChallenge.textContent = data.challenge;
    modalStrategy.textContent = data.strategy;

    // Populate outcomes list
    modalOutcomes.innerHTML = '';
    data.outcomes.forEach(outcome => {
      const li = document.createElement('li');
      li.textContent = outcome;
      modalOutcomes.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop page scrolling
    updateBannerHeight(); // update if needed
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore page scrolling
  };

  // Wire click handlers for project showcase links
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.getAttribute('data-project');
      if (projectId) {
        openModal(projectId);
      }
    });
  });

  // Wire close triggers
  closeTriggers.forEach(trigger => {
    trigger.addEventListener('click', closeModal);
  });

  // Close modal when clicking outside content area
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     14. NEWSLETTER SUBSCRIPTION FORM SUBMISSION
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm && toast) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : '';
      
      if (emailInput && emailInput.value.trim()) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span class="badge-dot" style="width: 6px; height: 6px; background-color: var(--color-navy); display: inline-block;"></span>`;
        }

        const sanitize = (str) => {
          return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
        };

        const formData = {
          access_key: "378f350b-ee9e-4076-8f23-47d495f902b9",
          email: sanitize(emailInput.value),
          subject: "New Newsletter Subscription - WebVibe Insights",
          from_name: "WebVibe Website Newsletter",
          message: `You have a new subscriber for WebVibe Insights: ${sanitize(emailInput.value)}`
        };

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          toast.classList.add('show');
          newsletterForm.reset();
          if (submitBtn) {
            submitBtn.innerHTML = origText;
            submitBtn.disabled = false;
          }
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4500);
        })
        .catch(error => {
          console.error("Newsletter submit failed:", error);
          toast.classList.add('show');
          newsletterForm.reset();
          if (submitBtn) {
            submitBtn.innerHTML = origText;
            submitBtn.disabled = false;
          }
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4500);
        });
      }
    });
  }

  /* ==========================================================================
     15. SEO CHECKLIST COLLAPSE/ACCORDION WIRING
     ========================================================================== */
  const seoCheckItems = document.querySelectorAll('.seo-check-item');
  seoCheckItems.forEach(item => {
    item.addEventListener('click', () => {
      const details = item.querySelector('.seo-details');
      const isActive = item.classList.contains('active');
      
      // Close other items to maintain clean accordion visual
      seoCheckItems.forEach(i => {
        i.classList.remove('active');
        const d = i.querySelector('.seo-details');
        if (d) d.style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        if (details) {
          details.style.maxHeight = details.scrollHeight + 'px';
        }
      }
    });
  });

  /* ==========================================================================
     C.1. BRANDING STUDIO GUIDES & TILT TRANSITIONS
     ========================================================================== */
  const bentoBranding = document.getElementById('bento-branding');
  const brandCoords = document.getElementById('brand-coords');

  if (bentoBranding && brandSvg && brandCoords) {
    // Inject guides into SVG programmatically
    const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridGroup.id = "branding-grid-guides";
    gridGroup.setAttribute("stroke", "rgba(0, 191, 255, 0.2)");
    gridGroup.setAttribute("stroke-width", "1");
    gridGroup.setAttribute("stroke-dasharray", "4,4");
    gridGroup.setAttribute("fill", "none");
    gridGroup.style.opacity = "0";
    gridGroup.style.transition = "opacity 0.35s ease";

    // Concentric blueprint circles
    [25, 45, 52].forEach(r => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "60");
      circle.setAttribute("cy", "60");
      circle.setAttribute("r", r.toString());
      gridGroup.appendChild(circle);
    });

    // Crosshair lines
    const lineH = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineH.setAttribute("x1", "10"); lineH.setAttribute("y1", "60");
    lineH.setAttribute("x2", "110"); lineH.setAttribute("y2", "60");
    gridGroup.appendChild(lineH);

    const lineV = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineV.setAttribute("x1", "60"); lineV.setAttribute("y1", "10");
    lineV.setAttribute("x2", "60"); lineV.setAttribute("y2", "110");
    gridGroup.appendChild(lineV);

    // Diagonal lines for logo precision guides
    const lineD1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineD1.setAttribute("x1", "20"); lineD1.setAttribute("y1", "20");
    lineD1.setAttribute("x2", "100"); lineD1.setAttribute("y2", "100");
    gridGroup.appendChild(lineD1);

    const lineD2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineD2.setAttribute("x1", "20"); lineD2.setAttribute("y1", "100");
    lineD2.setAttribute("x2", "100"); lineD2.setAttribute("y2", "20");
    gridGroup.appendChild(lineD2);

    brandSvg.insertBefore(gridGroup, brandSvg.firstChild);

    // Track mouse coordinate overlays and 3D tilts
    bentoBranding.addEventListener('mousemove', (e) => {
      const rect = bentoBranding.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 3D Tilt angles (bound to max 7 deg)
      const tiltY = ((x - centerX) / centerX) * 7;
      const tiltX = -((y - centerY) / centerY) * 7;

      bentoBranding.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      bentoBranding.style.boxShadow = `${6 - tiltY * 0.5}px ${12 + tiltX * 0.5}px 0px var(--color-navy)`;
      bentoBranding.style.borderColor = 'var(--color-gold)';

      // Calculate localized SVG coordinates (0 - 120 viewport scale)
      const svgRect = brandSvg.getBoundingClientRect();
      const svgX = Math.round(((e.clientX - svgRect.left) / svgRect.width) * 120);
      const svgY = Math.round(((e.clientY - svgRect.top) / svgRect.height) * 120);
      
      if (svgX >= 0 && svgX <= 120 && svgY >= 0 && svgY <= 120) {
        brandCoords.textContent = `GUIDES: ACTIVE | X:${svgX} Y:${svgY}`;
        gridGroup.style.opacity = "0.7";
      } else {
        brandCoords.textContent = `GUIDES: DRAFTING | X:-- Y:--`;
        gridGroup.style.opacity = "0.35";
      }

      // Rotate logo preview as a 3D hologram layer
      brandSvg.style.transform = `translateZ(25px) rotateY(${-tiltY * 0.5}deg) rotateX(${tiltX * 0.5}deg)`;
    });

    bentoBranding.addEventListener('mouseenter', () => {
      gridGroup.style.opacity = "0.35";
      bentoBranding.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.3s ease';
      brandSvg.style.transition = 'transform 0.1s ease-out';
    });

    bentoBranding.addEventListener('mouseleave', () => {
      gridGroup.style.opacity = "0";
      brandCoords.textContent = "GUIDES: INACTIVE";
      
      bentoBranding.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease';
      bentoBranding.style.transform = '';
      bentoBranding.style.boxShadow = '';
      bentoBranding.style.borderColor = '';
      
      brandSvg.style.transition = 'transform 0.5s ease';
      brandSvg.style.transform = '';
    });

    // Cycle Logo on card click (excluding swatches)
    bentoBranding.addEventListener('click', (e) => {
      if (e.target.closest('.swatch') || e.target.closest('.card-arrow')) return;
      
      // Find current active swatch
      let activeIdx = 0;
      swatches.forEach((sw, idx) => {
        if (sw.classList.contains('active')) activeIdx = idx;
      });

      // Cycle to next swatch
      const nextIdx = (activeIdx + 1) % swatches.length;
      swatches[nextIdx].click();
    });
  }

  /* ==========================================================================
     D. CINEMATIC TIMELINE PLAYHEAD SCRUBBER & MONITOR SYNC
     ========================================================================== */
  const bentoEditing = document.getElementById('bento-editing');
  const timelineTrack = document.getElementById('editor-timeline');
  const playheadHandle = document.getElementById('timeline-handle');
  const monitorText = document.getElementById('monitor-text');
  const monitorWaveform = document.getElementById('monitor-waveform');
  const waveformBars = monitorWaveform ? monitorWaveform.querySelectorAll('.bar') : [];
  const timelineBlocks = document.querySelectorAll('.timeline-block');

  if (bentoEditing && timelineTrack && playheadHandle) {
    let playheadPercent = 0;
    let isHovered = false;
    let isScrubbing = false;
    let autoplayDir = 1; // 1 = forward, -1 = backward
    let activeStateIdx = -1;

    // Monitor Phase Configurations
    const phases = [
      {
        text: "🎬 OUTLINE: Content Planning...",
        color: "var(--color-gold)",
        glowColor: "rgba(241, 178, 2, 0.4)",
        waveSpeed: "1.4s",
        blockIdx: 0
      },
      {
        text: "✂️ EDITING: Cut & Hook Sequences...",
        color: "var(--color-violet)",
        glowColor: "rgba(140, 48, 245, 0.4)",
        waveSpeed: "0.5s",
        blockIdx: 1
      },
      {
        text: "🚀 AUDIO: Syncing & Sound Effects...",
        color: "var(--color-cyan)",
        glowColor: "rgba(0, 191, 255, 0.4)",
        waveSpeed: "0.9s",
        blockIdx: 2
      }
    ];

    // Update UI Elements based on Playhead Percentage
    const updatePlayheadUI = (pct) => {
      // Set handle position
      playheadHandle.style.left = `${pct}%`;

      // Determine active phase index
      let phaseIdx = 0;
      if (pct < 35) {
        phaseIdx = 0;
      } else if (pct < 70) {
        phaseIdx = 1;
      } else {
        phaseIdx = 2;
      }

      // If phase changed, update monitor text, waveforms, and highlights
      if (phaseIdx !== activeStateIdx) {
        activeStateIdx = phaseIdx;
        const phase = phases[phaseIdx];

        // 1. Update Monitor Text
        if (monitorText) {
          monitorText.textContent = phase.text;
          monitorText.style.color = phase.color;
          monitorText.style.textShadow = `0 0 10px ${phase.glowColor}`;
        }

        // 2. Highlight Timeline Blocks
        timelineBlocks.forEach((block, idx) => {
          if (idx === phase.blockIdx) {
            block.classList.add('highlight');
          } else {
            block.classList.remove('highlight');
          }
        });

        // 3. Update Waveform Colors & Speed
        waveformBars.forEach(bar => {
          bar.style.backgroundColor = phase.color;
          bar.style.animationDuration = phase.waveSpeed;
        });

        // 4. Update Playhead Handle Color & Glow
        playheadHandle.style.backgroundColor = phase.color;
        playheadHandle.style.boxShadow = `0 0 10px ${phase.color}`;
      }
    };

    // Autoplay loop using requestAnimationFrame
    const autoplayLoop = () => {
      if (!isHovered && !isScrubbing) {
        // Increment playhead
        playheadPercent += 0.25 * autoplayDir;

        // Loop playhead
        if (playheadPercent >= 100) {
          playheadPercent = 0;
        } else if (playheadPercent < 0) {
          playheadPercent = 100;
        }

        updatePlayheadUI(playheadPercent);
      }
      requestAnimationFrame(autoplayLoop);
    };

    // Handle timeline coordinate mapping
    const handleTimelineInteraction = (e) => {
      const rect = timelineTrack.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      playheadPercent = pct;
      updatePlayheadUI(playheadPercent);
    };

    // Timeline Drag / Mouse interaction events
    timelineTrack.addEventListener('mousedown', (e) => {
      isScrubbing = true;
      handleTimelineInteraction(e);
    });

    document.addEventListener('mousemove', (e) => {
      if (isScrubbing) {
        handleTimelineInteraction(e);
      }
    });

    document.addEventListener('mouseup', () => {
      isScrubbing = false;
    });

    // Support touch devices for scrubbing
    timelineTrack.addEventListener('touchstart', (e) => {
      isScrubbing = true;
      if (e.touches && e.touches[0]) {
        handleTimelineInteraction(e.touches[0]);
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (isScrubbing && e.touches && e.touches[0]) {
        handleTimelineInteraction(e.touches[0]);
      }
    });

    document.addEventListener('touchend', () => {
      isScrubbing = false;
    });

    // Timeline block click-to-jump helpers
    timelineBlocks.forEach((block, idx) => {
      block.addEventListener('click', () => {
        let targetPct = 15;
        if (idx === 1) targetPct = 52;
        if (idx === 2) targetPct = 85;
        playheadPercent = targetPct;
        updatePlayheadUI(playheadPercent);
        
        // Brief scale pop on block
        block.style.transform = 'scale(1.08)';
        setTimeout(() => {
          block.style.transform = '';
        }, 200);
      });
    });

    // 3D Card Hover Perspective Tracker for Editing card
    bentoEditing.addEventListener('mousemove', (e) => {
      isHovered = true;
      
      const rect = bentoEditing.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 3D Tilt angles (bound to max 6 deg)
      const tiltY = ((x - centerX) / centerX) * 6;
      const tiltX = -((y - centerY) / centerY) * 6;

      bentoEditing.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      bentoEditing.style.boxShadow = `${6 - tiltY * 0.5}px ${12 + tiltX * 0.5}px 0px var(--color-navy)`;
      bentoEditing.style.borderColor = 'var(--color-navy)';
    });

    bentoEditing.addEventListener('mouseenter', () => {
      isHovered = true;
      bentoEditing.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.3s ease';
    });

    bentoEditing.addEventListener('mouseleave', () => {
      isHovered = false;
      isScrubbing = false;
      
      bentoEditing.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease';
      bentoEditing.style.transform = '';
      bentoEditing.style.boxShadow = '';
      bentoEditing.style.borderColor = '';
    });

    // Start Autoplay Loop
    autoplayLoop();
  }

  /* ==========================================================================
     13. HIGH-RELIABILITY WHATSAPP REDIRECT FOR MOBILE / WEBVIEWS
     ========================================================================== */
  const whatsappButton = document.querySelector('.whatsapp-float');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '916384155212';
      const webUrl = `https://api.whatsapp.com/send?phone=${phone}`;
      const appUrl = `whatsapp://send?phone=${phone}`;
      
      // Detect if mobile/tablet user agent
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Try native app scheme redirect
        window.location.href = appUrl;
        
        // Fallback to web redirection if app is not installed or blocked
        setTimeout(() => {
          window.location.href = webUrl;
        }, 1200);
      } else {
        // On desktop, open high-compatibility web client link in new tab
        window.open(webUrl, '_blank');
      }
    });
  }
});

