document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Calculadora de planos ---------------- */
  var checks = Array.prototype.slice.call(document.querySelectorAll('.plan-check'));
  var packRadios = Array.prototype.slice.call(document.querySelectorAll('input[name="fotos-pack"]'));
  var calcBody = document.getElementById('calc-body');
  var emptyMsg = document.getElementById('calc-empty-msg');
  var listEl = document.getElementById('calc-selected-list');
  var setupValueEl = document.getElementById('calc-setup-value');
  var setupNoteEl = document.getElementById('calc-setup-note');
  var monthlyValueEl = document.getElementById('calc-monthly-value');
  var ctaEl = document.getElementById('calc-cta');
  var toggleBtns = Array.prototype.slice.call(document.querySelectorAll('.calc-toggle-btn'));
  var payMode = 'vista';

  if (!checks.length || !calcBody) return;

  function fmt(n) {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateFotosCheckboxData() {
    var checkedRadio = packRadios.filter(function (r) { return r.checked; })[0];
    var fotosCheck = document.getElementById('plan-check-fotos');
    if (checkedRadio && fotosCheck) {
      fotosCheck.dataset.setup = checkedRadio.value;
      fotosCheck.dataset.name = 'Retratos Autênticos — ' + checkedRadio.dataset.label;
    }
  }

  function recalc() {
    updateFotosCheckboxData();
    var selected = checks.filter(function (c) { return c.checked; });

    if (!selected.length) {
      calcBody.hidden = true;
      emptyMsg.hidden = false;
      return;
    }
    emptyMsg.hidden = true;
    calcBody.hidden = false;

    var setupTotal = 0;
    var monthlyTotal = 0;
    var names = [];

    selected.forEach(function (c) {
      setupTotal += parseFloat(c.dataset.setup || '0');
      monthlyTotal += parseFloat(c.dataset.monthly || '0');
      names.push(c.dataset.name);
    });

    listEl.innerHTML = names.map(function (n) { return '<li>' + n + '</li>'; }).join('');

    if (payMode === 'vista') {
      var vista = setupTotal * 0.95;
      setupValueEl.innerHTML = setupTotal > 0 ? 'R$ ' + fmt(vista) : 'R$ 0,00';
      setupNoteEl.textContent = setupTotal > 0 ? 'com 5% de desconto (de R$ ' + fmt(setupTotal) + ')' : 'Nenhum valor único nos serviços selecionados';
    } else {
      var parcela = setupTotal / 10;
      setupValueEl.innerHTML = setupTotal > 0 ? '10x de R$ ' + fmt(parcela) : 'R$ 0,00';
      setupNoteEl.textContent = setupTotal > 0 ? 'sem juros — total R$ ' + fmt(setupTotal) : 'Nenhum valor único nos serviços selecionados';
    }

    monthlyValueEl.innerHTML = 'R$ ' + fmt(monthlyTotal) + (monthlyTotal > 0 ? '<small>/mês</small>' : '');

    var totalPagoAgora = payMode === 'vista' ? setupTotal * 0.95 : setupTotal;
    var msg = 'Olá! Simulei minha estrutura no site e quero fechar com: ' + names.join(', ') + '.';
    if (setupTotal > 0) {
      msg += ' Valor único: R$ ' + fmt(totalPagoAgora) + (payMode === 'vista' ? ' à vista.' : ' em 10x sem juros.');
    }
    if (monthlyTotal > 0) {
      msg += ' Assinatura mensal: R$ ' + fmt(monthlyTotal) + '/mês.';
    }
    ctaEl.href = 'https://wa.me/5517991930115?text=' + encodeURIComponent(msg);
  }

  checks.forEach(function (c) { c.addEventListener('change', recalc); });
  packRadios.forEach(function (r) { r.addEventListener('change', recalc); });
  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      payMode = btn.dataset.mode;
      toggleBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      recalc();
    });
  });

  updateFotosCheckboxData();
  recalc();
});
