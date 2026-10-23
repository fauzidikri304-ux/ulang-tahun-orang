/* ===== SPLASH / GIFT BOX ===== */
let giftOpened = false;

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  const lid = document.getElementById('giftLid');
  const bow = document.getElementById('giftBow');
  const hint = document.getElementById('splashHint');
  const nameReveal = document.getElementById('splashNameReveal');
  const splashBtn = document.getElementById('splashBtn');
  const particles = document.getElementById('giftParticles');

  lid.classList.add('open');
  bow.classList.add('gone');

  // Buat partikel ledakan
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 100;
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = Math.random() > 0.5 ? '#E8C97A' : '#C9A84C';
    particles.appendChild(p);
  }

  // Tampilkan nama & tombol
  setTimeout(() => {
    hint.style.opacity = '0';
    nameReveal.textContent = 'Untuk Rika ✦';
    nameReveal.classList.add('show');
    splashBtn.style.display = 'inline-block';
  }, 700);
}

function enterSite() {
  const splash = document.getElementById('splash');
  splash.classList.add('exit');

  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    startConfetti();
    startCountdown();
    // Auto-play musik setelah interaksi user
    const audio = document.getElementById('bgMusic');
    if (audio) audio.play().catch(() => {});
  }, 1000);
}

/* ===== LIGHTBOX ===== */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

/* ===== MUSIC ===== */
let musicPlaying = false;
let audioEl = null;

function toggleMusic() {
  const btn = document.getElementById('musicBtn');
  if (!audioEl) {
    audioEl = new Audio('musik.mp3'); // ganti dengan nama file musikmu
    audioEl.loop = true;
  }

  if (musicPlaying) {
    audioEl.pause();
    musicPlaying = false;
    btn.classList.remove('playing');
  } else {
    audioEl.play().catch(() => {});
    musicPlaying = true;
    btn.classList.add('playing');
  }
}

/* ===== COUNTDOWN ===== */
function startCountdown() {
  // GANTI TANGGAL INI dengan tanggal ulang tahun Rika
  const targetDate = new Date('2026-10-14T00:00:00').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('countdownGrid').style.display = 'none';
      document.getElementById('bdMsg').style.display = 'block';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ===== CONFETTI ===== */
let confettiRunning = false;

function startConfetti() {
  if (confettiRunning) return;
  confettiRunning = true;

  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#C9A84C', '#E8C97A', '#F5E6C0', '#B8902A'];
  const pieces = [];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1 + Math.random() * 2,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.y += p.speed;
      p.angle += p.spin;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();

  // Konfeti cuma jalan 8 detik
  setTimeout(() => { confettiRunning = false; }, 8000);
}