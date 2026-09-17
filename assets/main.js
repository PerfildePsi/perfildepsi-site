(() => {
  'use strict';
  const profiles = [...document.querySelectorAll('.profile')];
  profiles.forEach(profile => profile.addEventListener('toggle', () => {
    if (!profile.open) return;
    profiles.forEach(other => { if (other !== profile) other.open = false; });
  }));
  const openProfileFromHash = () => {
    const profile = profiles.find(item => '#' + item.id === location.hash);
    if (profile) profile.open = true;
  };
  openProfileFromHash();
  window.addEventListener('hashchange', openProfileFromHash);
  const profileField = document.getElementById('consultation-profile');
  document.querySelectorAll('[data-dialog]').forEach(button => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (!dialog) return;
    button.addEventListener('click', () => {
      if (button.dataset.profile && profileField) profileField.value = button.dataset.profile;
      dialog.showModal();
    });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  });
  const form = document.getElementById('consultation-form');
  if (!form) return;
  const name = document.getElementById('consultation-name');
  const phone = document.getElementById('consultation-phone');
  const graduation = document.getElementById('consultation-graduation');
  const goal = document.getElementById('consultation-goal');
  const presence = document.getElementById('consultation-presence');
  const message = document.getElementById('consultation-message');
  const feedback = document.getElementById('consultation-feedback');
  const validateName = () => name.setCustomValidity(name.value.trim() ? '' : 'Conte como podemos te chamar.');
  const validatePhone = () => {
    const digits = phone.value.replace(/\D/g, '');
    const validCharacters = /^[+\d\s().-]+$/.test(phone.value);
    phone.setCustomValidity(validCharacters && digits.length >= 10 && digits.length <= 15 ? '' : 'Confira seu WhatsApp com DDD.');
  };
  name.addEventListener('input', validateName);
  phone.addEventListener('input', validatePhone);
  graduation.addEventListener('change', () => {
    document.getElementById('seed-form-note').hidden = graduation.value !== 'Menos de 2 anos';
  });
  form.addEventListener('input', () => {
    feedback.textContent = '';
    message.value = '';
  });
  form.addEventListener('submit', event => {
    validateName();
    validatePhone();
    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }
    const lines = [
      'Olá, Perfil de Psi! Gostaria de solicitar uma consultoria gratuita.',
      '',
      'Nome: ' + name.value.trim(),
      'WhatsApp: ' + phone.value.trim(),
      'Formação: ' + graduation.value,
      'Meu foco: ' + goal.value,
      'Perfil: ' + (profileField.value || 'Ainda estou descobrindo')
    ];
    if (presence.value.trim()) lines.push('Instagram ou site: ' + presence.value.trim());
    message.value = lines.join('\n');
    feedback.textContent = 'Confira a mensagem na aba do WhatsApp e toque em enviar para concluir sua solicitação. Se ela não abrir, use o botão novamente.';
  });
})();
