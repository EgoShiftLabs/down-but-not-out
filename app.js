'use strict';
const $ = (id) => document.getElementById(id);
let lastFocus;
function openDialog(dialog) { lastFocus = document.activeElement; dialog.showModal(); document.body.classList.add('modal-open'); }
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastFocus?.focus(); });
  dialog.addEventListener('click', (event) => { if (event.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });
}
document.querySelectorAll('[data-open-profile]').forEach((button) => button.addEventListener('click', () => openDialog($('profile-dialog'))));
$('campaign-open').addEventListener('click', () => openDialog($('image-dialog')));
// Only display preferences are saved locally. Profile contents remain ephemeral.
const preferenceKey = 'dbno-display-v1';
function persistDisplayChoices() {
  try { localStorage.setItem(preferenceKey, JSON.stringify({ large: document.body.classList.contains('large-text'), contrast: document.body.classList.contains('high-contrast') })); } catch (_) {}
}
try {
  const pref = JSON.parse(localStorage.getItem(preferenceKey) || '{}');
  if (pref.large === true) { document.body.classList.add('large-text'); $('reading-toggle').setAttribute('aria-pressed', 'true'); }
  if (pref.contrast === true) { document.body.classList.add('high-contrast'); $('contrast-toggle').setAttribute('aria-pressed', 'true'); }
} catch (_) {}
$('reading-toggle').addEventListener('click', (event) => { const enabled = document.body.classList.toggle('large-text'); event.currentTarget.setAttribute('aria-pressed', String(enabled)); persistDisplayChoices(); });
$('contrast-toggle').addEventListener('click', (event) => { const enabled = document.body.classList.toggle('high-contrast'); event.currentTarget.setAttribute('aria-pressed', String(enabled)); persistDisplayChoices(); });
const openers = [
'Be honest: are we sharing fries, or should I order my own?',
'You get the aux cord on our first drive. What song are you playing?',
'Coffee and a walk, or dinner and a little dressing up?',
'What is one thing you could happily talk about for hours?',
'What’s your signature move: a good joke, a great playlist, or a really good meal?',
'We have a free Saturday. What are we doing?',
'What always makes you laugh, even when you try to stay serious?'
];
let openerIndex = 0;
$('next-opener').addEventListener('click', () => { openerIndex = (openerIndex + 1) % openers.length; $('opener').textContent = openers[openerIndex]; $('opener-count').textContent = `${String(openerIndex + 1).padStart(2, '0')} / 07`; });
const dates = {
 easy: ['☕', 'Coffee. A little conversation.', 'Pick a café with comfortable seating and a quieter corner. Keep the first plan simple, with room to stay a little longer.'],
 creative: ['✧', 'Art, opinions, and a little flirting.', 'Explore a gallery together. Pick your favorite piece, compare notes, then find somewhere nearby to sit and talk. Check seating and access ahead of time.'],
 dressy: ['♡', 'Dress up. Split dessert.', 'Choose a restaurant with a comfortable atmosphere and a menu you both enjoy. Agree on the plan and budget first. Leave room for something sweet.']
};
document.querySelectorAll('[data-vibe]').forEach((button) => button.addEventListener('click', () => {
 document.querySelectorAll('[data-vibe]').forEach((b) => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
 const [icon, title, description] = dates[button.dataset.vibe]; $('date-icon').textContent = icon; $('date-title').textContent = title; $('date-copy').textContent = description;
}));
const interestButtons = [...$('interest-options').querySelectorAll('button')];
interestButtons.forEach((button) => button.addEventListener('click', () => {
 const selected = button.getAttribute('aria-pressed') === 'true';
 if (!selected && interestButtons.filter((b) => b.getAttribute('aria-pressed') === 'true').length >= 3) { $('interest-status').textContent = 'Choose up to 3. Deselect one to try another.'; return; }
 button.setAttribute('aria-pressed', String(!selected)); $('interest-status').textContent = '';
}));
function updatePreview() {
 const nickname = $('nickname').value.trim(); $('preview-name').textContent = nickname || 'Hello, you.'; $('preview-avatar').textContent = nickname ? [...nickname][0].toUpperCase() : '♡';
 $('preview-bio').textContent = $('bio').value.trim() || 'Your personality belongs here.';
 $('preview-connection').textContent = $('connection').value;
 const interests = interestButtons.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.textContent);
 $('preview-interests').replaceChildren(...(interests.length ? interests : ['Your interests']).map((text) => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
}
$('profile-form').addEventListener('submit', (event) => { event.preventDefault(); updatePreview(); $('preview-status').textContent = 'Preview updated. Nothing has been posted or saved.'; document.querySelector('.studio-preview').scrollIntoView({ behavior: 'instant', block: 'nearest' }); });
$('profile-form').addEventListener('reset', (event) => { event.preventDefault(); $('nickname').value = ''; $('bio').value = ''; $('connection').selectedIndex = 0; interestButtons.forEach((b) => b.setAttribute('aria-pressed', 'false')); $('interest-status').textContent = ''; updatePreview(); $('preview-status').textContent = 'Preview reset. Nothing has been posted or saved.'; });

function chooseInterest(name) {
  const b = interestButtons.find((button) => button.textContent === name);
  if (b) b.setAttribute('aria-pressed', 'true');
}
$('example-profile').addEventListener('click', () => {
  $('nickname').value = 'Riley';
  $('bio').value = 'I love a great playlist, exploring new places, and terrible jokes.';
  $('connection').value = 'I like time to reply.';
  interestButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
  ['Music', 'Travel', 'Good food'].forEach(chooseInterest);
  updatePreview();
  $('preview-status').textContent = 'Fictional example loaded. Not a real member or public profile.';
});
$('copy-profile').addEventListener('click', async () => {
  updatePreview();
  const name = $('nickname').value.trim() || 'Hello, you';
  const interests = interestButtons.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.textContent).join(', ') || 'Not selected';
  const summary = ['Down But Not Out — fictional profile concept', 'Nickname: ' + name, 'About: ' + ($('bio').value.trim() || 'Not provided'), 'Interests: ' + interests, 'Communication: ' + $('connection').value, 'Preview only — no real member account'].join('\n');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(summary);
    $('preview-status').textContent = 'Preview copied to your clipboard. Only share it if you choose to.';
  } catch (_) {
    $('preview-status').textContent = 'Copy unavailable in this browser. You can still read the preview here.';
  }
});
$('copy-site-link').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('https://egoshiftlabs.github.io/down-but-not-out/');
    $('share-feedback').textContent = 'Website link copied.';
  } catch (_) {
    $('share-feedback').textContent = 'Copy unavailable. Website: egoshiftlabs.github.io/down-but-not-out/';
  }
});
