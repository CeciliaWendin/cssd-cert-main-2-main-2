"use strict";

/**
 * Validate email credits to Sitevision
 * [Sitevision Github]{@link https://github.com/sitevision}
 */
(function ($) {
  // eslint-disable-next-line no-undef
  window.validate = function () {
    // eslint-disable-next-line no-undef
    var emailInput = document.querySelector('input[name=email]'),
      valid = true;
    if (!isValidEmail(emailInput.value)) {
      valid = false;
      $(emailInput).parent().addClass('has-error').append('<p class="error-message">Email is not valid</p>').closest('.panel-body').addClass('highlight-flash');
    }
    return valid;
  };
  function isValidEmail(value) {
    var reg = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9][.-]?)+[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    return reg.test(value);
  }
  // eslint-disable-next-line no-undef
})(jQuery);