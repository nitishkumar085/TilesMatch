// 1. Capture and defer the browser prompt
let installPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();            // stop auto-prompt
  installPrompt = e;             // save it for later

  // 2. Reveal your custom install button
  document.getElementById('install-btn')
    .classList.add('visible');
});

// 3. Show the prompt when user clicks
document.getElementById('install-btn')
  .addEventListener('click', async () => {
    if (!installPrompt) return;

    const { outcome } = await installPrompt.prompt();
    console.log('User choice:', outcome);
    // outcome → 'accepted' | 'dismissed'

    installPrompt = null;
  });

// 4. Detect successful install
window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully 🎉');
});