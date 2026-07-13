
const button=document.querySelector('.menu');
const nav=document.querySelector('.nav-links');
if(button&&nav){
 button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');}));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
