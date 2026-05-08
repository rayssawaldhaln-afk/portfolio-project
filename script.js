// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Reveal on scroll
const els = document.querySelectorAll('.section, .hero-text, .hero-img, .card, .testimonial, .tl-item, .mini-card');
els.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
els.forEach(el => io.observe(el));

// Form submit (Web3Forms)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Enviando...';
  status.className = 'form-status';
  try {
    const data = new FormData(form);
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
    const json = await res.json();
    if (json.success) {
      status.textContent = 'Mensagem enviada com sucesso! Retornarei em breve.';
      status.className = 'form-status ok';
      form.reset();
    } else {
      status.textContent = json.message || 'Erro ao enviar. Tente novamente.';
      status.className = 'form-status err';
    }
  } catch (err) {
    status.textContent = 'Erro de conexão. Tente novamente.';
    status.className = 'form-status err';
  }
});
