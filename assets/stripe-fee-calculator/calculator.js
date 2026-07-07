(function () {
  'use strict';

  var root = document.getElementById('stripe-fee-calculator');
  if (!root || !window.StripeFeePresets) return;

  var presets = window.StripeFeePresets;
  var state = {
    presetId: 'card-domestic',
    custom: false,
    customRate: 2.9,
    customFixed: 0.30,
    customCap: null,
    addons: {},
    amount: ''
  };

  function resolveAddon(addonRef) {
    if (typeof addonRef === 'string') {
      return presets.commonAddons[addonRef] || null;
    }
    return addonRef;
  }

  function getPreset(id) {
    return presets.presets.find(function (p) { return p.id === id; });
  }

  function getActiveFees() {
    if (state.custom) {
      return {
        name: 'Custom fees',
        rate: state.customRate,
        fixed: state.customFixed,
        cap: state.customCap,
        addons: []
      };
    }

    var preset = getPreset(state.presetId);
    if (!preset) return { name: 'Custom fees', rate: 2.9, fixed: 0.30, cap: null, addons: [] };

    var addonList = (preset.addons || []).map(resolveAddon).filter(Boolean);
    var activeAddons = addonList.filter(function (a) { return state.addons[a.id]; });

    return {
      name: preset.name,
      rate: preset.rate,
      fixed: preset.fixed,
      cap: preset.cap || null,
      addons: activeAddons
    };
  }

  function totalRate(fees) {
    var addonRate = fees.addons.reduce(function (sum, a) { return sum + a.rate; }, 0);
    return fees.rate + addonRate;
  }

  function formatMoney(value) {
    if (value === null || value === undefined || isNaN(value)) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function parseAmount(value) {
    var cleaned = String(value).replace(/[^0-9.]/g, '');
    var parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }

  function calcFee(amount, fees) {
    var rate = totalRate(fees) / 100;
    var fee = amount * rate + fees.fixed;
    if (fees.cap != null) fee = Math.min(fee, fees.cap);
    return Math.max(0, fee);
  }

  function calcChargeForNet(targetNet, fees) {
    var rate = totalRate(fees) / 100;
    if (rate >= 1) return null;

    var uncappedCharge = (targetNet + fees.fixed) / (1 - rate);
    var uncappedFee = uncappedCharge * rate + fees.fixed;

    if (fees.cap != null && uncappedFee > fees.cap) {
      return targetNet + fees.cap;
    }

    return uncappedCharge;
  }

  function formatRate(rate) {
    return Number.isInteger(rate) ? String(rate) : rate.toFixed(2).replace(/\.?0+$/, '');
  }

  function formatFeeSummary(fees) {
    var rate = totalRate(fees);
    var summary;

    if (rate > 0 && fees.fixed > 0) {
      summary = formatRate(rate) + '% + ' + formatMoney(fees.fixed);
    } else if (rate > 0) {
      summary = formatRate(rate) + '%';
    } else if (fees.fixed > 0) {
      summary = formatMoney(fees.fixed) + ' flat';
    } else {
      summary = 'No fees';
    }

    if (fees.cap != null) summary += ' (cap ' + formatMoney(fees.cap) + ')';
    return summary;
  }

  function buildPresetOptions() {
    var html = '<option value="custom">Custom fees</option>';
    presets.categories.forEach(function (category) {
      var items = presets.presets.filter(function (p) { return p.category === category; });
      if (!items.length) return;
      html += '<optgroup label="' + category + '">';
      items.forEach(function (p) {
        html += '<option value="' + p.id + '">' + p.name + '</option>';
      });
      html += '</optgroup>';
    });
    return html;
  }

  function render() {
    var fees = getActiveFees();
    var preset = state.custom ? null : getPreset(state.presetId);
    var addonList = preset ? (preset.addons || []).map(resolveAddon).filter(Boolean) : [];
    var amount = parseAmount(state.amount);
    var hasAmount = amount !== null && amount > 0;

    var fee = hasAmount ? calcFee(amount, fees) : null;
    var net = hasAmount ? amount - fee : null;
    var askFor = hasAmount ? calcChargeForNet(amount, fees) : null;

    root.innerHTML =
      '<div class="sfc-card">' +
        '<div class="sfc-body">' +
          '<div class="sfc-field">' +
            '<label class="sfc-label" for="sfc-preset">Payment method</label>' +
            '<div class="sfc-select-wrap">' +
              '<select id="sfc-preset" class="sfc-select">' + buildPresetOptions() + '</select>' +
            '</div>' +
          '</div>' +
          '<div id="sfc-addons" class="sfc-addons' + (addonList.length ? '' : ' sfc-hidden') + '">' +
            addonList.map(function (addon) {
              return '<label class="sfc-chip">' +
                '<input type="checkbox" data-addon="' + addon.id + '"' + (state.addons[addon.id] ? ' checked' : '') + '>' +
                '<span class="sfc-chip-label">' + addon.label + '</span>' +
              '</label>';
            }).join('') +
          '</div>' +
          '<div id="sfc-custom" class="sfc-custom' + (state.custom ? '' : ' sfc-hidden') + '">' +
            '<div class="sfc-custom-grid">' +
              '<div class="sfc-field">' +
                '<label class="sfc-label" for="sfc-custom-rate">Percentage (%)</label>' +
                '<input id="sfc-custom-rate" type="number" class="sfc-input" min="0" step="0.01" value="' + state.customRate + '">' +
              '</div>' +
              '<div class="sfc-field">' +
                '<label class="sfc-label" for="sfc-custom-fixed">Fixed fee ($)</label>' +
                '<input id="sfc-custom-fixed" type="number" class="sfc-input" min="0" step="0.01" value="' + state.customFixed + '">' +
              '</div>' +
              '<div class="sfc-field">' +
                '<label class="sfc-label" for="sfc-custom-cap">Fee cap ($)</label>' +
                '<input id="sfc-custom-cap" type="number" class="sfc-input" min="0" step="0.01" placeholder="None" value="' + (state.customCap != null ? state.customCap : '') + '">' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="sfc-amount-section">' +
            '<label class="sfc-label" for="sfc-amount">Invoice amount</label>' +
            '<div class="sfc-amount-wrap">' +
              '<span class="sfc-currency">$</span>' +
              '<input id="sfc-amount" type="text" inputmode="decimal" class="sfc-input sfc-amount-input" placeholder="0.00" value="' + state.amount + '">' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="sfc-results">' +
          '<div class="sfc-result">' +
            '<span class="sfc-result-label">Total fees</span>' +
            '<span class="sfc-result-value" id="sfc-fees">' + (hasAmount ? formatMoney(fee) : '—') + '</span>' +
          '</div>' +
          '<div class="sfc-result">' +
            '<span class="sfc-result-label">You receive</span>' +
            '<span class="sfc-result-value" id="sfc-net">' + (hasAmount ? formatMoney(net) : '—') + '</span>' +
          '</div>' +
          '<div class="sfc-result sfc-result--primary">' +
            '<span class="sfc-result-label">Ask for</span>' +
            '<span class="sfc-result-value" id="sfc-ask">' + (hasAmount && askFor != null ? formatMoney(askFor) : '—') + '</span>' +
            '<span class="sfc-result-hint">to net ' + (hasAmount ? formatMoney(amount) : 'your target') + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<p class="sfc-formula-note">' +
        '<span class="sfc-formula-badge">' + fees.name + '</span>' +
        '<span>' + formatFeeSummary(fees) + ' · <a href="https://stripe.com/pricing/local-payment-methods" target="_blank" rel="noopener noreferrer">Stripe pricing</a></span>' +
      '</p>';

    bindEvents();
  }

  function bindEvents() {
    var presetSelect = document.getElementById('sfc-preset');
    var amountInput = document.getElementById('sfc-amount');

    if (presetSelect) {
      presetSelect.value = state.custom ? 'custom' : state.presetId;
      presetSelect.addEventListener('change', function (e) {
        if (e.target.value === 'custom') {
          state.custom = true;
        } else {
          state.custom = false;
          state.presetId = e.target.value;
          state.addons = {};
        }
        render();
      });
    }

    root.querySelectorAll('[data-addon]').forEach(function (checkbox) {
      checkbox.addEventListener('change', function (e) {
        state.addons[e.target.dataset.addon] = e.target.checked;
        render();
      });
    });

    var customRate = document.getElementById('sfc-custom-rate');
    var customFixed = document.getElementById('sfc-custom-fixed');
    var customCap = document.getElementById('sfc-custom-cap');

    if (customRate) {
      customRate.addEventListener('input', function (e) {
        state.customRate = parseFloat(e.target.value) || 0;
        updateResultsOnly();
      });
    }
    if (customFixed) {
      customFixed.addEventListener('input', function (e) {
        state.customFixed = parseFloat(e.target.value) || 0;
        updateResultsOnly();
      });
    }
    if (customCap) {
      customCap.addEventListener('input', function (e) {
        var val = e.target.value.trim();
        state.customCap = val === '' ? null : (parseFloat(val) || 0);
        updateResultsOnly();
      });
    }

    if (amountInput) {
      amountInput.addEventListener('input', function (e) {
        state.amount = e.target.value;
        updateResultsOnly();
      });
      amountInput.focus();
    }
  }

  function flashResults() {
    root.querySelectorAll('.sfc-result-value').forEach(function (el) {
      el.classList.add('is-updating');
      window.setTimeout(function () {
        el.classList.remove('is-updating');
      }, 140);
    });
  }

  function updateResultsOnly() {
    var fees = getActiveFees();
    var amount = parseAmount(state.amount);
    var hasAmount = amount !== null && amount > 0;

    var fee = hasAmount ? calcFee(amount, fees) : null;
    var net = hasAmount ? amount - fee : null;
    var askFor = hasAmount ? calcChargeForNet(amount, fees) : null;

    var feesEl = document.getElementById('sfc-fees');
    var netEl = document.getElementById('sfc-net');
    var askEl = document.getElementById('sfc-ask');
    var noteEl = root.querySelector('.sfc-formula-note');
    var hintEl = root.querySelector('.sfc-result-hint');

    if (feesEl) feesEl.textContent = hasAmount ? formatMoney(fee) : '—';
    if (netEl) netEl.textContent = hasAmount ? formatMoney(net) : '—';
    if (askEl) askEl.textContent = hasAmount && askFor != null ? formatMoney(askFor) : '—';
    if (hintEl) hintEl.textContent = 'to net ' + (hasAmount ? formatMoney(amount) : 'your target');
    if (noteEl) {
      noteEl.innerHTML =
        '<span class="sfc-formula-badge">' + fees.name + '</span>' +
        '<span>' + formatFeeSummary(fees) + ' · <a href="https://stripe.com/pricing/local-payment-methods" target="_blank" rel="noopener noreferrer">Stripe pricing</a></span>';
    }

    flashResults();
  }

  render();
})();
