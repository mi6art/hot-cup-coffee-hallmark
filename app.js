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
