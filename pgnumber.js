/**
 * @file pgnumber.js
 * @summary Librería en JavaScript puro (Vanilla ES6+) para restricción, validación y formateo numérico en tiempo real.
 * @version 1.0.0
 * @author Wilfredo Nina Choquetarqui
 * @license MIT
 * @see {@link https://github.com/wilnicho/pgnumber} Repositorio oficial
 *
 * @description
 * Permite enmascarar entradas en elementos <input> restringiendo caracteres no permitidos,
 * administrando posiciones decimales, signos negativos y formateo al perder el foco (blur).
 * Compatible con entornos UMD (ES Modules, CommonJS y script tradicional).
 *
 * @example
 * // Inicialización básica:
 * const num = new PgNumber('.input', { decimals: 2, separator: ',' });
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PgNumber = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DEFAULT_OPTIONS = Object.freeze({
    selector: '',
    negative: false,
    decimals: 2,
    separator: '.',
    parse: true,
    selectize: true
  });

  class PgNumber {
    /**
     * @param {string|HTMLElement|NodeList} target - Elemento o selector contenedor.
     * @param {Object} options - Configuración global de la instancia.
     */
    constructor(target, options = {}) {
      this.options = this._sanitizeOptions(options);
      this.elements = this._resolveElements(target);
      this._boundInput = this._handleInput.bind(this);
      this._boundFocus = this._handleFocus.bind(this);
      this._boundBlur = this._handleBlur.bind(this);

      this.init();
    }

    init() {
      this.elements.forEach(container => {
        container.addEventListener('input', this._boundInput);
        container.addEventListener('focusin', this._boundFocus);
        container.addEventListener('focusout', this._boundBlur);
      });
    }

    /**
     * Remueve los event listeners para liberar memoria.
     */
    destroy() {
      this.elements.forEach(container => {
        container.removeEventListener('input', this._boundInput);
        container.removeEventListener('focusin', this._boundFocus);
        container.removeEventListener('focusout', this._boundBlur);
      });
      this.elements = [];
    }

    _resolveElements(target) {
      if (typeof target === 'string') {
        return Array.from(document.querySelectorAll(target));
      }
      if (target instanceof HTMLElement) {
        return [target];
      }
      if (target instanceof NodeList || Array.isArray(target)) {
        return Array.from(target);
      }
      return [];
    }

    _parseBoolean(value, fallback) {
      if (typeof value === 'boolean') return value;
      if (value === 'true') return true;
      if (value === 'false') return false;
      return fallback;
    }

    _sanitizeOptions(options) {
      return {
        selector: typeof options.selector === 'string' ? options.selector : DEFAULT_OPTIONS.selector,
        negative: this._parseBoolean(options.negative, DEFAULT_OPTIONS.negative),
        decimals: !isNaN(options.decimals) && options.decimals !== '' ? parseInt(options.decimals, 10) : DEFAULT_OPTIONS.decimals,
        separator: [',', '.'].includes(options.separator) ? options.separator : DEFAULT_OPTIONS.separator,
        parse: this._parseBoolean(options.parse, DEFAULT_OPTIONS.parse),
        selectize: this._parseBoolean(options.selectize, DEFAULT_OPTIONS.selectize)
      };
    }

    _getElementOptions(element) {
      const dataset = element.dataset;
      return this._sanitizeOptions({
        negative: dataset.pgnumberNegative ?? this.options.negative,
        decimals: dataset.pgnumberDecimals ?? this.options.decimals,
        separator: dataset.pgnumberSeparator ?? this.options.separator,
        parse: dataset.pgnumberParse ?? this.options.parse,
        selectize: dataset.pgnumberSelectize ?? this.options.selectize
      });
    }

    _isTargetValid(event) {
      if (!this.options.selector) return true;
      return event.target.matches(this.options.selector);
    }

    _handleInput(event) {
      if (!this._isTargetValid(event)) return;

      const input = event.target;
      const config = this._getElementOptions(input);
      const value = input.value;

      const isNegativeAllowed = config.negative ? '-?' : '';
      const escapedSeparator = config.separator === '.' ? '\\.' : config.separator;
      const separatorRegex = config.decimals > 0 ? `[${escapedSeparator}]?` : '';
      const decimalsRegex = config.decimals > 0 ? `\\d{0,${config.decimals}}` : '';

      const pattern = new RegExp(`^${isNegativeAllowed}\\d*${separatorRegex}${decimalsRegex}$`);

      if (pattern.test(value)) {
        input.dataset.oldValue = value;
        input.dataset.oldSelectionStart = input.selectionStart;
        input.dataset.oldSelectionEnd = input.selectionEnd;
      } else if (input.dataset.oldValue !== undefined) {
        input.value = input.dataset.oldValue;
        input.setSelectionRange(
          parseInt(input.dataset.oldSelectionStart, 10) || 0,
          parseInt(input.dataset.oldSelectionEnd, 10) || 0
        );
      } else {
        input.value = '';
      }
    }

    _handleFocus(event) {
      if (!this._isTargetValid(event)) return;

      const input = event.target;
      const config = this._getElementOptions(input);

      if (config.selectize) {
        requestAnimationFrame(() => input.select());
      }
    }

    _handleBlur(event) {
      if (!this._isTargetValid(event)) return;

      const input = event.target;
      const config = this._getElementOptions(input);
      const rawValue = input.value.trim();

      if (!config.parse || rawValue === '') return;

      const normalizedValue = rawValue.replaceAll(config.separator, '.');
      const numericValue = parseFloat(normalizedValue);

      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toFixed(config.decimals);
        input.value = formattedValue.replace('.', config.separator);
      }
    }
  }

  return PgNumber;
}));