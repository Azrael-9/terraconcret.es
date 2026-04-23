(function() {
  'use strict';

  const form = document.querySelector('#contactForm');
  if (!form) return;

  const success = form.querySelector('.form-success');
  const honeypot = form.querySelector('input[name="website"]');
  const RATE_LIMIT_MS = 30000;
  const RATE_KEY = 'contactLastSubmit';

  function sanitize(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  function showError(field, message) {
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
    field.style.borderColor = '#e57373';
  }

  function clearError(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.classList.remove('show');
    field.style.borderColor = '';
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 9;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (honeypot && honeypot.value) return;

    const last = parseInt(sessionStorage.getItem(RATE_KEY) || '0', 10);
    if (Date.now() - last < RATE_LIMIT_MS) {
      const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - last)) / 1000);
      alert((form.dataset.errRateLimit || 'Por favor espera {s} segundos antes de reenviar.').replace('{s}', remaining));
      return;
    }

    let valid = true;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const service = form.querySelector('[name="service"]');
    const message = form.querySelector('[name="message"]');
    const privacy = form.querySelector('[name="privacy"]');

    [name, email, phone, service, message].forEach(clearError);

    if (!sanitize(name.value).trim()) {
      showError(name, form.dataset.errRequired || 'Este campo es obligatorio');
      valid = false;
    }
    if (!validateEmail(sanitize(email.value).trim())) {
      showError(email, form.dataset.errEmail || 'Email no válido');
      valid = false;
    }
    if (!validatePhone(phone.value.trim())) {
      showError(phone, form.dataset.errPhone || 'Teléfono no válido (mín. 9 dígitos)');
      valid = false;
    }
    if (!service.value) {
      showError(service, form.dataset.errService || 'Selecciona un servicio');
      valid = false;
    }
    if (!sanitize(message.value).trim() || message.value.trim().length < 10) {
      showError(message, form.dataset.errMessage || 'Describe tu proyecto (mín. 10 caracteres)');
      valid = false;
    }
    if (!privacy.checked) {
      alert(form.dataset.errPrivacy || 'Debes aceptar la política de privacidad');
      valid = false;
    }

    if (!valid) return;

    sessionStorage.setItem(RATE_KEY, Date.now().toString());

    if (success) {
      success.classList.add('show');
    }
    form.reset();
    setTimeout(() => {
      if (success) success.classList.remove('show');
    }, 6000);
  });

  form.querySelectorAll('input, textarea, select').forEach((field) => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });
})();
