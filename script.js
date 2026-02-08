// ─── Cursor Spotlight ─────────────────────────────
const spotlight = document.getElementById('spotlight');
let mouseInWindow = false;

document.addEventListener('mousemove', (e) => {
  if (!mouseInWindow) {
    spotlight.style.opacity = '1';
    mouseInWindow = true;
  }
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  spotlight.style.opacity = '0';
  mouseInWindow = false;
});

// ─── Email Signup (Google Forms) ──────────────────
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const signupBtn = document.getElementById('signupBtn');
const signupWrapper = document.getElementById('signupWrapper');
const signupSuccess = document.getElementById('signupSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  if (!email) return;

  signupBtn.disabled = true;
  signupBtn.textContent = 'Joining...';

  try {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdk2U4pausOApGy_wkL8xfYLQjHWv579g-6gnTJ1ogRspThxQ/formResponse';
    const body = new URLSearchParams({ 'entry.1104621866': email });
    await fetch(formUrl, { method: 'POST', body, mode: 'no-cors' });

    // Success — no-cors always returns opaque response, so we assume success
    signupWrapper.style.display = 'none';
    signupSuccess.style.display = 'block';
  } catch (err) {
    // Error fallback
    signupBtn.disabled = false;
    signupBtn.textContent = 'Join Waitlist';

    const hint = document.querySelector('.signup-hint');
    hint.textContent = 'Something went wrong. Try again or DM @OrangeGunBTC.';
    hint.style.color = '#ef4444';
  }
});
