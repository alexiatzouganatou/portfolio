"use strict";
const isGreek = document.documentElement.lang === 'el';
const words = isGreek ? {
 dark: 'Σκοτεινή εμφάνιση', light: 'Φωτεινή εμφάνιση', copied: 'Το email αντιγράφηκε!', email: 'Email: '
} : {
 dark: 'Switch to dark mode', light: 'Switch to light mode', copied: 'Email copied!', email: 'Email: '
};
const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
const savePreference = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
const languageLink = document.querySelector('.language-switch');
// Explicit language links remain usable even when storage is unavailable.
if (languageLink) {
 languageLink.href += location.hash;
 languageLink.addEventListener('click', () => savePreference('alexia-language', isGreek ? 'en' : 'el'));
}
// English is the first-visit default; remember a visitor's later choice.
const savedLanguage = readPreference('alexia-language');
if (savedLanguage === 'el' && !isGreek) location.replace('index-el.html' + location.hash);
if (savedLanguage === 'en' && isGreek) location.replace('index.html' + location.hash);
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
 const dark = theme === 'dark';
 document.documentElement.dataset.theme = dark ? 'dark' : 'light';
 if(themeButton){
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-pressed',String(dark));
  themeButton.setAttribute('aria-label',dark ? words.light : words.dark);
  themeButton.title = dark ? words.light : words.dark;
 }
}
applyTheme(readPreference('alexia-theme'));
if(themeButton) themeButton.addEventListener('click',()=>{
 const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 savePreference('alexia-theme',next);applyTheme(next);
});
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu(){ if(!menuButton || !navigation)return; navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false'); }
if(menuButton && navigation){
 menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));});
 navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
 document.addEventListener('click',event=>{if(!navigation.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
 window.matchMedia('(min-width: 601px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(other=>{const active=other===button;other.classList.toggle('selected',active);other.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('.work-card[data-kind]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.kind!==button.dataset.filter;});
}));
const printButton=document.querySelector('#print-resume');
if(printButton)printButton.addEventListener('click',()=>window.print());
const copyButton=document.querySelector('#copy-email');
const status=document.querySelector('#copy-status');
if(copyButton&&status)copyButton.addEventListener('click',async()=>{
 status.textContent='';
 try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('alexiaatzouganatouuu@gmail.com');status.textContent=words.copied;}
 catch{status.textContent=words.email+'alexiaatzouganatouuu@gmail.com';}
});
