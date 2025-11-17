
// script.js - handles particles, GSAP animations, typed, modals, lightbox, resume download, magnetic buttons

// tsParticles load (reads particles.json)
(async ()=>{
  try{
    await tsParticles.loadJSON("tsparticles", "particles.json");
  }catch(e){
    console.warn("tsParticles load failed",e);
  }
})();

// Typed.js
if(window.Typed) new Typed('#typedName',{strings:["Peerzada Ikhlas","Frontend Developer","UI/UX Enthusiast"],typeSpeed:80,backSpeed:40,loop:true});

// Theme toggle (persist)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') document.body.classList.add('light-mode');
themeToggle && themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Mobile menu
const mobileOpen = document.getElementById('mobileOpen');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
mobileOpen && mobileOpen.addEventListener('click', ()=> mobileMenu.classList.remove('hidden'));
mobileClose && mobileClose.addEventListener('click', ()=> mobileMenu.classList.add('hidden'));

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate(${x*0.12}px, ${y*0.12}px)`;
  });
  btn.addEventListener('mouseleave', ()=> btn.style.transform = 'translate(0,0)');
});

// GSAP animations & ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.to('#float1',{y:60,x:30,rotation:10,scrollTrigger:{scrub:1,start:'top top',end:'bottom top'}});
gsap.to('#float2',{y:-40,x:-20,rotation:-6,scrollTrigger:{scrub:1,start:'top top',end:'bottom top'}});

// Counters
function animateCounter(el){
  const target = +el.dataset.target;
  gsap.fromTo(el,{innerText:0},{innerText:target,duration:1.6,ease:'power1.in',snap:{innerText:1},onUpdate:()=>el.innerText=Math.floor(el.innerText)});
}
const projectsCount = document.getElementById('projectsCount');
const clientsCount = document.getElementById('clientsCount');
const yearsCount = document.getElementById('yearsCount');
ScrollTrigger.create({trigger:'#home',start:'top top+=80',onEnter:()=>{ projectsCount && animateCounter(projectsCount); clientsCount && animateCounter(clientsCount); yearsCount && animateCounter(yearsCount); }});

// Modal previews
const modalContainer = document.getElementById('modalsContainer');
const modalTemplates = {
  proj1: `<div class="fixed inset-0 z-60 flex items-center justify-center modal-backdrop"><div class="bg-slate-900 max-w-4xl w-[95%] rounded-xl p-6 relative"><button class="absolute top-4 right-4 text-2xl closeModal">✕</button><h3 class="text-2xl font-bold mb-4">Chat App — Preview</h3><p class="text-slate-400 mb-4">Realtime chat app showcase.</p><img src="assets/profile.jpg" class="w-full rounded-md mb-4"/><a class="inline-block px-4 py-2 rounded bg-[var(--accent-1)] text-black" href="#">Open Repo</a></div></div>`,
  proj2: `<div class="fixed inset-0 z-60 flex items-center justify-center modal-backdrop"><div class="bg-slate-900 max-w-4xl w-[95%] rounded-xl p-6 relative"><button class="absolute top-4 right-4 text-2xl closeModal">✕</button><h3 class="text-2xl font-bold mb-4">E-commerce UI — Preview</h3><p class="text-slate-400 mb-4">Shop UI showcase.</p><img src="assets/profile.jpg" class="w-full rounded-md mb-4"/><a class="inline-block px-4 py-2 rounded bg-[var(--accent-1)] text-black" href="#">Open Repo</a></div></div>`,
  proj3: `<div class="fixed inset-0 z-60 flex items-center justify-center modal-backdrop"><div class="bg-slate-900 max-w-4xl w-[95%] rounded-xl p-6 relative"><button class="absolute top-4 right-4 text-2xl closeModal">✕</button><h3 class="text-2xl font-bold mb-4">Design System — Preview</h3><p class="text-slate-400 mb-4">Design tokens & components.</p><img src="assets/profile.jpg" class="w-full rounded-md mb-4"/><a class="inline-block px-4 py-2 rounded bg-[var(--accent-1)] text-black" href="#">Open Repo</a></div></div>`
};
document.addEventListener('click', (e)=>{
  const op = e.target.closest('.openModal');
  if(op){ const id = op.dataset.target; modalContainer.innerHTML = modalTemplates[id]; }
  if(e.target.classList.contains('closeModal')) modalContainer.innerHTML = '';
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.openLightbox').forEach(img=>{
  img.addEventListener('click', ()=>{ lightboxImg.src = img.dataset.full || img.src; lightbox.classList.remove('hidden'); lightbox.classList.add('flex'); });
});
document.getElementById('closeLightbox').addEventListener('click', ()=>{ lightbox.classList.add('hidden'); lightbox.classList.remove('flex'); });

// Profile flip via GSAP
const flipInner = document.getElementById('flipInner');
flipInner && flipInner.addEventListener('mouseenter', ()=> gsap.to(flipInner,{rotationY:180,duration:0.6,transformPerspective:800}));
flipInner && flipInner.addEventListener('mouseleave', ()=> gsap.to(flipInner,{rotationY:0,duration:0.6}));

// Resume download (placeholder)
document.getElementById('resumeBtn').addEventListener('click', ()=>{
  const url = 'resume.pdf';
  const a = document.createElement('a'); a.href=url; a.download='Peerzada-Ikhlas-Resume.pdf'; document.body.appendChild(a); a.click(); a.remove();
});

// Lazy image observer (simple)
const lazyImgs = document.querySelectorAll('img');
const io = new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ const img = entry.target; const src = img.getAttribute('data-src'); if(src) img.src = src; io.unobserve(img); } }); },{rootMargin:'200px'});
lazyImgs.forEach(i=> io.observe(i));
