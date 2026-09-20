const menu = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');
menu?.addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => sidebar.classList.remove('open')));

const pieces = [...document.querySelectorAll('.piece')];
const count = document.getElementById('targetCount');
const toast = document.getElementById('toast');
pieces.forEach(piece => piece.addEventListener('click', () => {
  piece.classList.toggle('selected');
  count.textContent = document.querySelectorAll('.piece.selected').length;
}));
document.getElementById('checkBtn').addEventListener('click', () => {
  const freemium = window.mathsversityFreemium;
  const selected = document.querySelectorAll('.piece.selected').length;
  toast.textContent = selected === 4 ? 'Great work! You made a whole. ✦' : `You have ${selected} piece${selected === 1 ? '' : 's'} — keep going!`;
  toast.classList.add('show');
  freemium?.consumeHeart();
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});
document.getElementById('resumeBtn').addEventListener('click', () => {
  document.getElementById('practice').scrollIntoView({behavior:'smooth', block:'center'});
  window.setTimeout(() => document.getElementById('practice').animate([{transform:'scale(1)'},{transform:'scale(1.015)'},{transform:'scale(1)'}], {duration:450}), 500);
});
