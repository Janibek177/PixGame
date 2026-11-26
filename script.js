let audioCtx = null;
function beep(freq) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + 0.12);
    g.gain.setValueAtTime(0.14, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.12);
  } catch (e) {}
}

const splash = document.getElementById('splash');
const padStage = document.getElementById('pad-stage');
const padStatus = document.getElementById('pad-status');
document.body.style.overflow = 'hidden';

function enterSite() {
  beep(620);
  splash.classList.add('entered');
  document.body.style.overflow = 'auto';
}

padStage.addEventListener('click', e => {
  padStatus.textContent = 'GAMEPAD READY — ЗАПУСК...';
  padStatus.classList.add('text-solar');
  beep(460);

  const rect = padStage.getBoundingClientRect();
  const wave = document.createElement('div');
  wave.className = 'wave-ring';
  wave.style.left = `${e.clientX - rect.left}px`;
  wave.style.top = `${e.clientY - rect.top}px`;
  padStage.appendChild(wave);
  setTimeout(() => wave.remove(), 650);

  setTimeout(enterSite, 240);
});

document.getElementById('enter-btn').addEventListener('click', enterSite);
document.getElementById('open-pad-btn').addEventListener('click', () => {
  splash.classList.remove('entered');
  document.body.style.overflow = 'hidden';
  beep(440);
});

const topGames = [
  {
    rank: '#1',
    title: 'Standoff Strike 3D',
    cat: 'Shooter',
    rating: '4.9',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfb6PJMmUywKr3rt5palTV_59qzDRjbwo6HWFKIhtm7A&s=10',
    desc: 'Тактический 3D-шутер с огромным выбором оружия и динамичными аренами.',
    query: 'Standoff шутер 3D'
  },
  {
    rank: '#2',
    title: 'Cyber Drift Pro',
    cat: 'Racing',
    rating: '4.9',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHx96RntMarxPhCpPCALZ-FRV9qb9B_iCJRKhnY5cckQ&s',
    desc: 'Ночные уличные гонки, неоновый тюнинг спорткаров и экстремальный дрифт.',
    query: 'Дрифт гонки 3D'
  },
  {
    rank: '#3',
    title: 'Obby Parkour Mega',
    cat: 'Arcade',
    rating: '4.8',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlZn6rpHY9yuUJRbqz-Fiuu8Ub3i2Gr2GQfyK1UpMqKA&s=10',
    desc: 'Сотни уровней паркура, ловушки и прыжки на вершину мега-башни.',
    query: 'Обби паркур'
  }
];

const topGrid = document.getElementById('top-games-grid');
topGames.forEach((g, idx) => {
  const url = `https://yandex.ru/games/search?query=${encodeURIComponent(g.query)}`;
  topGrid.innerHTML += `
    <div class="reveal-up game-card rounded-3xl overflow-hidden flex flex-col justify-between ${idx === 0 ? 'lg:-translate-y-4 border-flame/70' : ''}" style="transition-delay:${idx * 120}ms">
      <div>
        <div class="relative">
          <img
            src="${g.img}"
            onerror="this.onerror=null;this.src='https://placehold.co/800x450/181820/ff5500?text=${encodeURIComponent(g.title)}';"
            alt="${g.title}"
            class="w-full h-56 object-cover"
          />
          <span class="absolute top-3 left-3 rounded-xl bg-flame px-3 py-1 font-display text-xs font-black text-black">${g.rank}</span>
          <span class="absolute top-3 right-3 rounded-xl bg-void/85 border border-flame/40 px-3 py-1 font-display text-xs font-black text-solar">${g.cat} • ★ ${g.rating}</span>
        </div>
        <div class="p-6">
          <h3 class="font-display text-2xl font-black text-white">${g.title}</h3>
          <p class="mt-3 text-sm text-gray-300 leading-relaxed">${g.desc}</p>
        </div>
      </div>
      <div class="px-6 pb-6">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="block w-full rounded-2xl bg-gradient-to-r from-flame to-solar py-3.5 text-center font-display text-sm font-black uppercase text-black transition-transform hover:scale-[1.02]">
          PLAY ON YANDEX GAMES ↗
        </a>
      </div>
    </div>
  `;
});

const games = [
  { title: 'Standoff Strike 3D', cat: 'shooter', catLabel: 'Shooter', rating: '4.9', query: 'Standoff шутер 3D', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfb6PJMmUywKr3rt5palTV_59qzDRjbwo6HWFKIhtm7A&s=10' },
  { title: 'Sniper Fury Arena', cat: 'shooter', catLabel: 'Shooter', rating: '4.8', query: 'Снайпер 3D шутер', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGIePjwGg4e72nXj1gSDabnvo1QKzIzEfZjRePf7GKVA&s=10' },
  { title: 'Zombie Bunker 3D', cat: 'shooter', catLabel: 'Shooter', rating: '4.7', query: 'Зомби шутер', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTedDfdSFQonM1C5kRL2X8wJuPiWa3QQ-1CKv_o6CeRGQ&s=10' },
  { title: 'Cyber Blaster FPS', cat: 'shooter', catLabel: 'Shooter', rating: '4.8', query: 'Киберпанк шутер', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxjqldLFsAMp8sXllrzdMBqbxXwAtJybWttONXQJHVg&s' },
  { title: 'Tank Arena Battle', cat: 'shooter', catLabel: 'Shooter', rating: '4.7', query: 'Танки онлайн', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyryh9_nSaW3lFvz4EXMpfZeuXdOMhgiy6mW9DDsDBQA&s=10' },
  { title: 'Space Marine Raid', cat: 'shooter', catLabel: 'Shooter', rating: '4.6', query: 'Космический шутер', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpznqZrDC0xzds3vLBFdeHHusWwmMotEAEjwCVQc5ig&s=10' },

  { title: 'Obby Parkour Mega', cat: 'arcade', catLabel: 'Arcade', rating: '4.9', query: 'Обби паркур', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqJnpNExDuvsq17X3Ed1jz-wIWQxKuLsofnp5bzR3uw&s=10' },
  { title: 'Geometry Neon Dash', cat: 'arcade', catLabel: 'Arcade', rating: '4.8', query: 'Геометри Даш', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqJnpNExDuvsq17X3Ed1jz-wIWQxKuLsofnp5bzR3uw&s=10' },
  { title: 'Pac-Maze Cyber', cat: 'arcade', catLabel: 'Arcade', rating: '4.6', query: 'Пакман лабиринт', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo0URm8LfSg8ZeKCTjtD8D1LeN9Pc81Z-6-xRkcOvokg&s=10' },
  { title: 'Helix Tower Jump', cat: 'arcade', catLabel: 'Arcade', rating: '4.7', query: 'Хеликс Джамп', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bXRxpjipvCViuSVs9qszRLCxdwZ9eoMckm0LCeNajA&s=10' },
  { title: 'Snake Arena IO', cat: 'arcade', catLabel: 'Arcade', rating: '4.8', query: 'Змейка ио', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72wwAWTILyKrQ-TW9N8Sy9TzVo90YHFubdhip7TDlBA&s' },
  { title: 'Fruit Slash Pro', cat: 'arcade', catLabel: 'Arcade', rating: '4.7', query: 'Фруктовый ниндзя', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYW4XdNK-Ba3w8Xzl8PdjL3RRqymJ_w8jRS29iRGiF7Q&s=10' },

  { title: 'Cyber Drift Pro', cat: 'racing', catLabel: 'Racing', rating: '4.9', query: 'Дрифт гонки 3D', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2q1vOELgnNKc2wo3fzk4OOeJVoezmv6UnKnHnfE3xA&s=10' },
  { title: 'Asphalt Turbo 3D', cat: 'racing', catLabel: 'Racing', rating: '4.8', query: 'Гонки на спорткарах', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80' },
  { title: 'Moto Xtreme Stunts', cat: 'racing', catLabel: 'Racing', rating: '4.7', query: 'Мотоциклы трюки', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80' },
  { title: 'Monster Truck Smash', cat: 'racing', catLabel: 'Racing', rating: '4.6', query: 'Монстр трак гонки', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=700&q=80' },
  { title: 'Highway Traffic Race', cat: 'racing', catLabel: 'Racing', rating: '4.8', query: 'Шашки по городу гонки', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80' },
  { title: 'Formula Speed GP', cat: 'racing', catLabel: 'Racing', rating: '4.7', query: 'Формула 1 гонки', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=700&q=80' },

  { title: 'Stickman Shadow', cat: 'action', catLabel: 'Action', rating: '4.8', query: 'Стикмен драки', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=700&q=80' },
  { title: 'Ninja Katana Fury', cat: 'action', catLabel: 'Action', rating: '4.7', query: 'Ниндзя экшен', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80' },
  { title: 'Viking Arena Brawl', cat: 'action', catLabel: 'Action', rating: '4.6', query: 'Битва на арене', img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=700&q=80' },
  { title: 'Mech Robot Wars', cat: 'action', catLabel: 'Action', rating: '4.8', query: 'Битва роботов 3D', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80' },
  { title: 'Ragdoll Playground', cat: 'action', catLabel: 'Action', rating: '4.9', query: 'Рэгдолл песочница', img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=80' },
  { title: 'Hero City Rescue', cat: 'action', catLabel: 'Action', rating: '4.7', query: 'Супергерой экшен', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=80' },

  { title: 'Block Blast Neon', cat: 'puzzle', catLabel: 'Puzzle', rating: '4.9', query: 'Блок Бласт', img: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=700&q=80' },
  { title: '2048 Cyber Merge', cat: 'puzzle', catLabel: 'Puzzle', rating: '4.8', query: '2048 числа', img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=700&q=80' },
  { title: 'Cut Laser Rope', cat: 'puzzle', catLabel: 'Puzzle', rating: '4.7', query: 'Перережь веревку', img: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=700&q=80' },
  { title: 'Chess Master Pro', cat: 'puzzle', catLabel: 'Puzzle', rating: '4.8', query: 'Шахматы онлайн', img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=700&q=80' },
  { title: 'Water Sort Color', cat: 'puzzle', catLabel: 'Puzzle', rating: '4.7', query: 'Сортировка воды', img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=700&q=80' },
  { title: 'Escape Room 3D', cat: 'puzzle', catLabel: 'Puzzle', rating: '4.8', query: 'Побег из комнаты', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_7NtPjXj_c9RKveZJVQTcK8UJNYy3TwsO09qvUnbRKA&s=10' }
];

const catalogGrid = document.getElementById('catalog-grid');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const catBtns = document.querySelectorAll('.cat-btn');
let currentCat = 'all';
let currentQuery = '';

function renderCatalog() {
  const list = games.filter(g =>
    (currentCat === 'all' || g.cat === currentCat) &&
    (g.title.toLowerCase().includes(currentQuery) || g.catLabel.toLowerCase().includes(currentQuery))
  );

  catalogGrid.innerHTML = '';
  emptyState.classList.toggle('hidden', list.length > 0);

  list.forEach(g => {
    const href = `https://yandex.ru/games/search?query=${encodeURIComponent(g.query)}`;
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'game-card group rounded-2xl p-3.5 flex flex-col justify-between';
    a.innerHTML = `
      <div>
        <div class="relative overflow-hidden rounded-xl mb-3">
          <img
            src="${g.img}"
            onerror="this.onerror=null;this.src='https://placehold.co/600x360/181820/ff5500?text=${encodeURIComponent(g.title)}';"
            alt="${g.title}"
            class="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <span class="absolute top-2 left-2 rounded-md bg-flame px-2 py-0.5 font-display text-[10px] font-black text-black uppercase">${g.catLabel}</span>
          <span class="absolute top-2 right-2 rounded-md bg-void/85 px-2 py-0.5 text-[10px] font-bold text-solar">★ ${g.rating}</span>
        </div>
        <h3 class="font-display text-sm font-black text-white group-hover:text-solar transition line-clamp-1">${g.title}</h3>
        <p class="text-[11px] text-gray-400 mt-0.5">Yandex Games • Instant</p>
      </div>
      <div class="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-display text-[11px] font-black uppercase text-flame group-hover:text-white">
        <span>PLAY NOW</span>
        <span>↗</span>
      </div>
    `;
    catalogGrid.appendChild(a);
  });
}

function selectCategory(cat) {
  catBtns.forEach(b => {
    const active = b.getAttribute('data-cat') === cat;
    b.classList.toggle('bg-gradient-to-r', active);
    b.classList.toggle('from-flame', active);
    b.classList.toggle('to-solar', active);
    b.classList.toggle('text-black', active);
    b.classList.toggle('font-black', active);
    b.classList.toggle('border', !active);
    b.classList.toggle('border-white/15', !active);
    b.classList.toggle('bg-panel', !active);
    b.classList.toggle('text-gray-200', !active);
    b.classList.toggle('font-bold', !active);
  });
  currentCat = cat;
  renderCatalog();
}

catBtns.forEach(btn => {
  btn.addEventListener('click', () => selectCategory(btn.getAttribute('data-cat')));
});

document.querySelectorAll('.footer-cat-link').forEach(link => {
  link.addEventListener('click', () => selectCategory(link.getAttribute('data-footer-cat')));
});

searchInput.addEventListener('input', e => {
  currentQuery = e.target.value.trim().toLowerCase();
  renderCatalog();
});

renderCatalog();

const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuToggle.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.add('hidden')));

const bugForm = document.getElementById('bug-form');
const bugToast = document.getElementById('bug-toast');
bugForm.addEventListener('submit', e => {
  e.preventDefault();
  beep(580);
  bugForm.reset();
  bugToast.classList.remove('hidden');
  setTimeout(() => bugToast.classList.add('hidden'), 5000);
});

const newsletterForm = document.getElementById('newsletter-form');
const newsletterMsg = document.getElementById('newsletter-msg');
newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  beep(660);
  newsletterForm.reset();
  newsletterMsg.classList.remove('hidden');
  setTimeout(() => newsletterMsg.classList.add('hidden'), 4000);
});

const heroTitle = document.getElementById('hero-3d-title');
window.addEventListener('mousemove', e => {
  const rx = ((e.clientY / window.innerHeight) - 0.5) * -12;
  const ry = ((e.clientX / window.innerWidth) - 0.5) * 14;
  heroTitle.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});

const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  scrollBar.style.width = `${pct}%`;
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => io.observe(el));