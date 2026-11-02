const todayHours = document.querySelector('#today-hours');
const moscowDay = new Intl.DateTimeFormat('en-US', {timeZone:'Europe/Moscow',weekday:'short'}).format(new Date());
if(todayHours) todayHours.textContent = ['Sat','Sun'].includes(moscowDay) ? 'Сегодня с 10:00 до 20:00' : 'Сегодня с 09:00 до 20:00';

const tabs = [...document.querySelectorAll('[role="tab"]')];
function chooseTab(tab, moveFocus = false) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if(moveFocus) tab.focus({preventScroll:true});
}
if(tabs.length) {
  chooseTab(tabs[0]);
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => chooseTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if(event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if(event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if(event.key === 'Home') next = 0;
      if(event.key === 'End') next = tabs.length - 1;
      if(next !== undefined) { event.preventDefault(); chooseTab(tabs[next],true); }
    });
  });
}
const copyButton = document.querySelector('.copy-address');
copyButton?.addEventListener('click', async () => {
  const status = document.querySelector('.copy-result');
  try {
    await navigator.clipboard.writeText('Московская область, Луховицы, улица Жуковского, 27');
    status.textContent = 'Адрес скопирован';
  } catch {
    status.textContent = 'Луховицы, улица Жуковского, 27. Выделите адрес и скопируйте его.';
  }
});

// Native video with a poster fallback and explicit motion controls.
const video = document.querySelector('#coffee-film');
const videoButton = document.querySelector('.video-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let wantsPlayback = !reducedMotion.matches && !navigator.connection?.saveData;
let isHeroVisible = true;
function updateVideoLabel() {
  const paused = video.paused;
  videoButton.setAttribute('aria-pressed', String(paused));
  videoButton.setAttribute('aria-label', paused ? 'Включить видеозаставку' : 'Приостановить видеозаставку');
  videoButton.querySelector('.video-label').textContent = paused ? 'Смотреть' : 'Пауза';
  videoButton.querySelector('.video-symbol').textContent = paused ? '▷' : 'Ⅱ';
}
function syncVideo() {
  if (!wantsPlayback || !isHeroVisible || document.hidden) { video.pause(); updateVideoLabel(); return; }
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.play().catch(updateVideoLabel);
}
videoButton.hidden = false;
videoButton.addEventListener('click', () => { wantsPlayback = video.paused; syncVideo(); });
video.addEventListener('play', updateVideoLabel);
video.addEventListener('pause', updateVideoLabel);
video.addEventListener('error', () => { videoButton.hidden = true; });
document.addEventListener('visibilitychange', syncVideo);
reducedMotion.addEventListener('change', () => { wantsPlayback = !reducedMotion.matches; syncVideo(); });
new IntersectionObserver(([entry]) => { isHeroVisible = entry.isIntersecting; syncVideo(); }, {threshold:.05}).observe(video);
syncVideo();

const revealTargets = document.querySelectorAll('.ritual-layout, .menu-intro, .menu-content, .section-heading, .place-gallery figure, .rating, .guest-quote, .visit-top, .visit-layout');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
  }), {rootMargin:'0px 0px -30px 0px'});
  revealTargets.forEach(el => { if(el.getBoundingClientRect().top > innerHeight) {el.classList.add('reveal-pending'); observer.observe(el);} });
}
reducedMotion.addEventListener('change', () => revealTargets.forEach(el=>el.classList.remove('reveal-pending')));
addEventListener('keydown',event=>{if(event.key==='Tab') revealTargets.forEach(el=>el.classList.remove('reveal-pending'));});
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  document.querySelector('.site-header').classList.toggle('scrolled',scrollY>30);
  const range=document.documentElement.scrollHeight-innerHeight;
  document.querySelector('.reading-progress').style.transform=`scaleX(${range>0 ? Math.min(1,scrollY/range):0})`;
}
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});
addEventListener('resize',updateScroll);
updateScroll();
