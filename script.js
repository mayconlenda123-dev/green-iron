// ============= Green Iron - Vanilla JS =============
(function () {
  'use strict';

  // ---- Data ----
  const benefits = [
    { icon: 'fa-solid fa-dumbbell', title: 'Equipamentos Premium', text: 'Máquinas de última geração das melhores marcas do mundo.' },
    { icon: 'fa-solid fa-user-tie', title: 'Personal Trainers', text: 'Profissionais certificados para acelerar sua evolução.' },
    { icon: 'fa-regular fa-clock', title: 'Aberta Todos os Dias', text: 'Estrutura completa disponível 24 horas, 7 dias por semana.' },
    { icon: 'fa-solid fa-apple-whole', title: 'Acompanhamento Nutricional', text: 'Nutricionistas montam o plano ideal para seus objetivos.' },
    { icon: 'fa-solid fa-chart-line', title: 'Evolução Monitorada', text: 'Métricas, avaliações e ajustes de plano contínuos.' },
    { icon: 'fa-solid fa-fire-flame-curved', title: 'Ambiente Motivador', text: 'Comunidade forte, disciplinada e focada em resultado.' },
  ];

  const plans = [
    { name: 'Starter', price: '129', tag: 'Para começar',
      features: ['Acesso musculação e cardio', 'Avaliação física inicial', 'Horário comercial', 'App de treino'],
      highlight: false },
    { name: 'Pro', price: '199', tag: 'Mais popular',
      features: ['Acesso completo 24/7', 'Aulas coletivas ilimitadas', 'Plano nutricional básico', '1 sessão com personal / mês', 'App de treino premium'],
      highlight: true },
    { name: 'Elite', price: '349', tag: 'Experiência completa',
      features: ['Tudo do Pro', 'Personal trainer 2x / semana', 'Nutricionista dedicado', 'Sala VIP e recovery zone', 'Acesso a todas as unidades'],
      highlight: false },
  ];

  const stats = [
    { to: 2500, suffix: '+', label: 'Alunos ativos' },
    { to: 15, suffix: ' anos', label: 'De experiência' },
    { to: 120, suffix: '+', label: 'Equipamentos' },
    { to: 98, suffix: '%', label: 'Satisfação' },
  ];

  const testimonials = [
    { name: 'Rafael Mendes', role: 'Aluno há 2 anos', img: 'assets/testimonial-1.jpg', text: 'A estrutura é insana. Os personal trainers realmente entendem do assunto e a evolução aparece em semanas.' },
    { name: 'Camila Duarte', role: 'Aluna há 1 ano', img: 'assets/testimonial-2.jpg', text: 'Nunca frequentei uma academia tão bem cuidada. A Green Iron mudou minha rotina e minha autoestima.' },
    { name: 'Bruno Souza', role: 'Aluno há 3 anos', img: 'assets/testimonial-3.jpg', text: 'Ambiente motivador, equipamentos novos e atendimento impecável. Vale cada centavo.' },
    { name: 'Ana Beatriz', role: 'Aluna há 6 meses', img: 'assets/testimonial-2.jpg', text: 'O acompanhamento nutricional fez toda a diferença. Nunca me senti tão bem.' },
    { name: 'Diego Ramos', role: 'Aluno há 4 anos', img: 'assets/testimonial-3.jpg', text: 'Já treinei em várias academias. A Green Iron está em outro nível.' },
  ];

  // ---- Render benefits ----
  const bg = document.getElementById('benefitsGrid');
  benefits.forEach((it, i) => {
    const el = document.createElement('div');
    el.className = 'glass-card reveal';
    el.style.transitionDelay = (i * 60) + 'ms';
    el.innerHTML = `
      <div class="card-icon"><i class="${it.icon}"></i></div>
      <h3 class="card-title">${it.title}</h3>
      <p class="card-text">${it.text}</p>
      <div class="card-divider"></div>
      <div class="card-foot"><span>0${i + 1}</span><i class="fa-solid fa-arrow-right"></i></div>
    `;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    bg.appendChild(el);
  });

  // ---- Render plans ----
  const pg = document.getElementById('plansGrid');
  plans.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'plan reveal' + (p.highlight ? ' highlight' : '');
    const feats = p.features.map((f) => `<li><span class="check"><i class="fa-solid fa-check"></i></span>${f}</li>`).join('');
    el.innerHTML = `
      ${p.highlight ? '<div class="plan-badge">Recomendado</div>' : ''}
      <div class="plan-tag">${p.tag}</div>
      <h3 class="plan-name">${p.name}</h3>
      <div class="plan-price"><span class="cur">R$</span><span class="val">${p.price}</span><span class="per">/mês</span></div>
      <ul class="plan-features">${feats}</ul>
      <a href="#contato" class="btn ${p.highlight ? 'btn-neon' : 'btn-ghost'}"><span>Assinar ${p.name}</span><i class="fa-solid fa-arrow-right"></i></a>
    `;
    pg.appendChild(el);
  });

  // ---- Render stats ----
  const sg = document.getElementById('statsGrid');
  stats.forEach((s) => {
    const el = document.createElement('div');
    el.className = 'stat reveal-scale';
    el.innerHTML = `<div class="stat-value" data-to="${s.to}" data-suffix="${s.suffix}">0${s.suffix}</div><div class="stat-label">${s.label}</div>`;
    sg.appendChild(el);
  });

  // ---- Render testimonials (doubled for infinite marquee) ----
  const tt = document.getElementById('testiTrack');
  const cards = [...testimonials, ...testimonials];
  cards.forEach((t) => {
    const el = document.createElement('article');
    el.className = 'testi-card';
    el.innerHTML = `
      <div class="testi-stars">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <img src="${t.img}" alt="${t.name}" loading="lazy" />
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    `;
    tt.appendChild(el);
  });

  // ---- Particles ----
  function fillParticles(id, n) {
    const c = document.getElementById(id);
    if (!c) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.style.left = ((i * 53) % 100) + '%';
      s.style.animation = `particle ${8 + (i % 5) * 2}s linear ${i * 0.4}s infinite`;
      c.appendChild(s);
    }
  }
  fillParticles('particlesHero', 18);
  fillParticles('particlesCta', 14);

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal, .reveal-right, .reveal-scale').forEach((el) => io.observe(el));

  // ---- Counters ----
  const counters = document.querySelectorAll('.stat-value');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        cio.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => cio.observe(c));

  function animateCounter(el) {
    const to = parseInt(el.dataset.to, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.floor(eased * to);
      el.textContent = v.toLocaleString('pt-BR') + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = to.toLocaleString('pt-BR') + suffix;
    }
    requestAnimationFrame(step);
  }

  // ---- Navbar scroll state ----
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backToTop');
  const progress = document.getElementById('progressFill');
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('show', y > 600);
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Back to top ----
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- Mobile menu ----
  const mt = document.getElementById('menuToggle');
  const mm = document.getElementById('mobileMenu');
  mt.addEventListener('click', () => {
    const open = mt.classList.toggle('open');
    if (open) { mm.hidden = false; } else { mm.hidden = true; }
  });
  mm.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    mt.classList.remove('open'); mm.hidden = true;
  }));

  // ---- Year ----
  document.getElementById('year').textContent = new Date().getFullYear();
})();
