/* =================================================
   Luxury Estates - script.js (pure JS, no libs)
   Handles:
   - hero slideshow + parallax
   - populate featured & listings & details
   - search + sort
   - reveal on scroll (IntersectionObserver)
   - animated counters
   - floating feedback widget + contact form sim
   - simple theme toggle stored in localStorage
   ================================================= */

/* ---------------------------
   DATA: properties
   --------------------------- */
const properties = [
  {
    id: 1,
    title: "Riverside Manor",
    price: "₹3,20,00,000",
    priceVal: 32000000,
    location: "Mumbai",
    type: "Penthouse",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    desc: "A top-floor penthouse with panoramic sea views, lavish interiors and private rooftop garden."
  },
  {
    id: 2,
    title: "Golden Bay Villa",
    price: "₹5,40,00,000",
    priceVal: 54000000,
    location: "Goa",
    type: "Villa",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    desc: "Luxury villa with infinity pool, modern sustainable features and direct beach access."
  },
  {
    id: 3,
    title: "Skyline Residence",
    price: "₹2,10,00,000",
    priceVal: 21000000,
    location: "Bangalore",
    type: "Apartment",
    img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80",
    desc: "Contemporary apartment in a smart building with concierge, gym and green terraces."
  },
  {
    id: 4,
    title: "Cedar Hill Cottage",
    price: "₹95,00,000",
    priceVal: 9500000,
    location: "Manali",
    type: "Cottage",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    desc: "Charming cottage perched near forests, built with natural materials and passive heating."
  },
  {
    id: 5,
    title: "Aurora Loft",
    price: "₹1,80,00,000",
    priceVal: 18000000,
    location: "Delhi",
    type: "Loft",
    img: "https://images.unsplash.com/photo-1572120360610-d971b9b0b3a2?auto=format&fit=crop&w=1600&q=80",
    desc: "Industrial-chic loft in the heart of the city with soaring ceilings and bespoke finishes."
  },
  {
    id: 1,
    title: "Riverside Manor",
    price: "₹3,20,00,000",
    priceVal: 32000000,
    location: "Mumbai",
    type: "Penthouse",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    desc: "A top-floor penthouse with panoramic sea views, lavish interiors and private rooftop garden."
  },
  {
    id: 2,
    title: "Golden Bay Villa",
    price: "₹5,40,00,000",
    priceVal: 54000000,
    location: "Goa",
    type: "Villa",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    desc: "Luxury villa with infinity pool, modern sustainable features and direct beach access."
  },
  {
    id: 3,
    title: "Skyline Residence",
    price: "₹2,10,00,000",
    priceVal: 21000000,
    location: "Bangalore",
    type: "Apartment",
    img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80",
    desc: "Contemporary apartment in a smart building with concierge, gym and green terraces."
  },
  {
    id: 4,
    title: "Cedar Hill Cottage",
    price: "₹95,00,000",
    priceVal: 9500000,
    location: "Manali",
    type: "Cottage",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    desc: "Charming cottage perched near forests, built with natural materials and passive heating."
  }
];

/* =================================================
   THEME (simple toggle stored in localStorage)
   ================================================= */
const themeToggleButtons = document.querySelectorAll("#themeToggle, #themeToggle2, #themeToggle3, #themeToggle4, #themeToggle5");
function applyTheme(theme){
  if(theme === "light"){
    document.documentElement.style.setProperty('--bg','linear-gradient(180deg,#f5f5f5 0%, #efefef 100%)');
    document.documentElement.style.setProperty('--gold','#b5882d');
    document.body.classList.remove('luxury');
  } else {
    // reset to luxury dark (default)
    document.documentElement.style.setProperty('--bg','linear-gradient(180deg,#050506 0%, #0b0b0d 100%)');
    document.documentElement.style.setProperty('--gold','#d4af37');
    document.body.classList.add('luxury');
  }
}
const savedTheme = localStorage.getItem('luxury-theme') || 'dark';
applyTheme(savedTheme);
themeToggleButtons.forEach(btn=>{
  btn && btn.addEventListener && btn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('luxury') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('luxury-theme', newTheme);
  });
});

/* =================================================
   HERO: slideshow + parallax
   ================================================= */
(function heroModule(){
  const hero = document.getElementById('hero');
  if(!hero) return;

  const slides = [
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1572120360610-d971b9b0b3a2?auto=format&fit=crop&w=2000&q=80"
  ];
  let i=0;
  function setSlide(){
    hero.style.backgroundImage = `url('${slides[i]}')`;
    i = (i+1) % slides.length;
  }
  setSlide();
  setInterval(setSlide, 6000);

  // subtle parallax on mousemove
  hero.addEventListener('mousemove', (ev)=>{
    const rect = hero.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width;
    const y = (ev.clientY - rect.top) / rect.height;
    const tx = (x - 0.5) * 8; // range -4..4
    const ty = (y - 0.5) * 8;
    hero.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
    setTimeout(()=>hero.style.transform = 'translate3d(0,0,0) scale(1)', 120);
  });
})();

/* =================================================
   Populate featured (index) and listings (listings)
   ================================================= */
(function populateListings(){
  // Featured on index
  const featuredGrid = document.getElementById('featuredGrid');
  if(featuredGrid){
    const featured = properties.slice(0,4);
    featured.forEach(p=>{
      const el = document.createElement('article');
      el.className = 'card reveal';
      el.innerHTML = `
        <img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy">
        <div class="card-body">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.location)} · ${escapeHtml(p.type)}</p>
        </div>
        <div class="card-footer">
          <div class="price">${escapeHtml(p.price)}</div>
          <a class="btn btn-outline" href="details.html?id=${p.id}">View</a>
        </div>
      `;
      featuredGrid.appendChild(el);
    });
  }

  // Listings page
  const listingsGrid = document.getElementById('listingsGrid');
  if(listingsGrid){
    function render(list){
      listingsGrid.innerHTML = '';
      list.forEach(p=>{
        const el = document.createElement('article');
        el.className = 'card reveal';
        el.innerHTML = `
          <img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy">
          <div class="card-body">
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.location)} · ${escapeHtml(p.type)}</p>
          </div>
          <div class="card-footer">
            <div class="price">${escapeHtml(p.price)}</div>
            <a class="btn btn-gold" href="details.html?id=${p.id}">Details</a>
          </div>
        `;
        listingsGrid.appendChild(el);
      });
    }
    // initial
    render(properties);

    // search
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    if(searchInput){
      searchInput.addEventListener('input', (e)=>{
        const term = e.target.value.trim().toLowerCase();
        const filtered = properties.filter(p => {
          return p.title.toLowerCase().includes(term) ||
                 p.location.toLowerCase().includes(term) ||
                 p.type.toLowerCase().includes(term);
        });
        render(filtered);
      });
    }
    if(sortSelect){
      sortSelect.addEventListener('change', (e)=>{
        const val = e.target.value;
        let list = [...properties];
        if(val === 'price-asc') list.sort((a,b)=>a.priceVal - b.priceVal);
        else if(val === 'price-desc') list.sort((a,b)=>b.priceVal - a.priceVal);
        render(list);
      });
    }
  }
})();

/* =================================================
   Details page rendering (reads ?id)
   ================================================= */
(function detailsModule(){
  const container = document.getElementById('detailsContainer');
  if(!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'),10) || properties[0].id;
  const prop = properties.find(p => p.id === id) || properties[0];

  container.innerHTML = `
    <img src="${prop.img}" alt="${escapeHtml(prop.title)}" loading="lazy">
    <div class="info">
      <h2>${escapeHtml(prop.title)}</h2>
      <p class="lead">${escapeHtml(prop.location)} · ${escapeHtml(prop.type)}</p>
      <p style="margin-top:12px;">${escapeHtml(prop.desc)}</p>
      <p style="font-weight:800;margin-top:12px;color:var(--gold)">${escapeHtml(prop.price)}</p>
      <a href="contact.html" class="btn btn-gold" style="margin-top:14px;display:inline-block;">Enquire Now</a>
    </div>
  `;
})();

/* =================================================
   IntersectionObserver reveal on scroll
   ================================================= */
(function revealOnScroll(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // optional: unobserve so it doesn't fire again
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* =================================================
   Animated counters for stats
   ================================================= */
(function counters(){
  const counters = document.querySelectorAll('.stat-num');
  if(!counters.length) return;
  counters.forEach(c=>{
    const target = +c.getAttribute('data-target') || 0;
    let start = 0;
    const dur = 1400;
    const step = Math.ceil(target / (dur / 40));
    function tick(){
      start += step;
      if(start >= target) c.textContent = target;
      else { c.textContent = start; setTimeout(tick, 40);}
    }
    // start when visible
    const io = new IntersectionObserver(entries=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){ tick(); io.unobserve(ent.target); }
      });
    }, {threshold:0.4});
    io.observe(c);
  });
})();

/* =================================================
   Feedback widget + contact form simulation
   ================================================= */
(function feedback(){
  const btn = document.getElementById('feedbackBtn');
  const modal = document.getElementById('feedbackModal');
  const closeBtn = document.getElementById('feedbackClose');
  const form = document.getElementById('feedbackForm');
  const status = document.getElementById('feedbackStatus');

  if(btn && modal){
    btn.addEventListener('click', ()=> {
      modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
      modal.setAttribute('aria-hidden', modal.style.display === 'none' ? 'true' : 'false');
    });
  }
  if(closeBtn) closeBtn.addEventListener('click', ()=> { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); });
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      status.textContent = 'Sending…';
      setTimeout(()=>{ status.textContent = 'Thanks! We will respond shortly.'; form.reset(); }, 900);
    });
  }

  // contact page form (separate)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      contactStatus.textContent = 'Sending…';
      setTimeout(()=>{ contactStatus.textContent = '✅ Message sent. Thank you!'; contactForm.reset(); }, 900);
    });
  }
})();

/* =================================================
   small helper: escape HTML
   ================================================= */
function escapeHtml(str){
  if(!str) return '';
  return String(str).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}
