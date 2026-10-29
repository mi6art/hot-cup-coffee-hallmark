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

// One scheduled frame per native scroll event; no animation loop while idle.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const tallViewport = matchMedia('(min-height: 620px)');
const root = document.documentElement;
const story = document.querySelector('.coffee-story');
const scenes = [...document.querySelectorAll('.story-scene')];
const tracks = [...document.querySelectorAll('.story-track i')];
const progressBar = document.querySelector('.reading-progress');
const heroImage = document.querySelector('.hero-fallback');
const pauseBand = document.querySelector('.pause-band');
const pauseTrack = document.querySelector('.pause-band-track');
const galleryImages = [...document.querySelectorAll('.place-gallery img')];
const revealTargets = [...document.querySelectorAll('.menu-intro, .menu-content, .section-heading, .place-gallery figure, .rating, .guest-quote, .visit-top, .visit-layout')];
const clamp = (value, low = 0, high = 1) => Math.min(high, Math.max(low, value));
let frame = 0;
let revealObserver;
let activeScene = -1;

function renderScroll() {
  frame = 0;
  const reduced = motionPreference.matches;
  const viewport = window.innerHeight;
  const scrollRange = root.scrollHeight - viewport;
  progressBar.style.transform = `scaleX(${scrollRange > 0 ? clamp(scrollY / scrollRange) : 0})`;
  if (reduced) return;
  const bandBounds = pauseBand.getBoundingClientRect();
  if (bandBounds.bottom > 0 && bandBounds.top < viewport) {
    const travel = Math.max(0, pauseTrack.scrollWidth - innerWidth + 24);
    pauseTrack.style.transform = `translateX(${-travel * clamp((viewport - bandBounds.top) / (viewport + bandBounds.height))}px)`;
  }

  const heroBounds = heroImage.parentElement.getBoundingClientRect();
  if (heroBounds.bottom > 0 && heroBounds.top < viewport) {
    const offset = clamp((viewport / 2 - heroBounds.top - heroBounds.height / 2) / viewport, -.5, .5);
    heroImage.style.transform = `translateY(${offset * 30}px) scale(1.08)`;
  }
  galleryImages.forEach(image => {
    const bounds = image.parentElement.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > viewport) return;
    const offset = clamp((viewport / 2 - bounds.top - bounds.height / 2) / viewport, -.5, .5);
    image.style.transform = `translateY(${offset * 18}px) scale(1.04)`;
  });

  if (!root.classList.contains('story-pinned')) return;
  const rect = story.getBoundingClientRect();
  const headerHeight = document.querySelector('.site-header').offsetHeight;
  const stageHeight = story.querySelector('.story-stage').offsetHeight;
  const progress = clamp((headerHeight - rect.top) / (rect.height - stageHeight));
  // Hold each composition, then crossfade in a short part of the scroll range.
  const position = progress * 2.5;
  const nextActive = Math.min(2, Math.floor(position + .15));
  scenes.forEach((scene, index) => {
    const enter = index === 0 ? 1 : clamp((position - index + .3) / .3);
    const leave = index === 2 ? 1 : 1 - clamp((position - index - .7) / .3);
    const opacity = Math.min(enter, leave);
    scene.style.opacity = opacity;
    scene.querySelector('.story-copy').style.opacity = clamp((enter - .5) * 2) * clamp((leave - .5) * 2);
    scene.querySelector('.story-copy').style.transform = `translateY(${(1 - enter) * 28 - (1 - leave) * 28}px)`;
    scene.querySelector('img').style.transform = `scale(${1.15 - clamp(position - index + .3) * .15}) rotate(${(1 - enter) * 4}deg)`;
    scene.querySelector('.story-image').style.clipPath = `inset(${(1 - enter) * 100}% 0 0 0)`;
    scene.querySelector('.story-copy h2 span').style.transform = `translateX(${(1 - enter) * -40}px)`;
    tracks[index].style.transform = `scaleX(${.12 + clamp(position - index + .3) * .88})`;
    if (nextActive !== activeScene) scene.setAttribute('aria-hidden', String(index !== nextActive));
  });
  activeScene = nextActive;
}

function scheduleScroll() {
  if (!frame) frame = requestAnimationFrame(renderScroll);
}

function configureMotion() {
  revealObserver?.disconnect();
  const reduced = motionPreference.matches;
  root.classList.toggle('story-pinned', !reduced && tallViewport.matches);
  activeScene = -1;
  scenes.forEach(scene => {
    scene.style.removeProperty('opacity');
    scene.removeAttribute('aria-hidden');
    scene.querySelector('.story-copy').style.removeProperty('transform');
    scene.querySelector('.story-copy').style.removeProperty('opacity');
    scene.querySelector('img').style.removeProperty('transform');
    scene.querySelector('.story-image').style.removeProperty('clip-path');
    scene.querySelector('.story-copy h2 span').style.removeProperty('transform');
  });
  [heroImage, ...galleryImages].forEach(image => image.style.removeProperty('transform'));
  revealTargets.forEach(target => target.classList.remove('reveal-pending', 'reveal-ready'));
  if (!reduced && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        target.classList.replace('reveal-pending', 'reveal-ready');
        revealObserver.unobserve(target);
      });
    }, {threshold:0, rootMargin:'0px 0px -32px 0px'});
    revealTargets.forEach(target => {
      // Keep content already in view visible, including restored scroll positions.
      if (target.getBoundingClientRect().top >= innerHeight) {
        target.classList.add('reveal-pending');
        revealObserver.observe(target);
      }
    });
  }
  scheduleScroll();
}

addEventListener('scroll', scheduleScroll, {passive:true});
addEventListener('resize', scheduleScroll);
addEventListener('pageshow', scheduleScroll);
motionPreference.addEventListener('change', configureMotion);
tallViewport.addEventListener('change', configureMotion);
// Keyboard navigation must expose focused controls immediately.
addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  revealTargets.forEach(target => target.classList.remove('reveal-pending', 'reveal-ready'));
});
configureMotion();
