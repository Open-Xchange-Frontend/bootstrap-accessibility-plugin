/* ========================================================================
* Extends Bootstrap v3.1.1

* Copyright (c) <2014> eBay Software Foundation

* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* Neither the name of eBay or any of its subsidiaries or affiliates nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

* ======================================================================== */
 

(function($) {
  "use strict";

  // GENERAL UTILITY FUNCTIONS
  // ===============================
  var uniqueId = function (prefix) {
    return (prefix || 'ui-id') + '-' + Math.floor((Math.random()*1000)+1);
  };

  var removeMultiValAttributes = function (el, attr, val) {
    var describedby = (el.attr( attr ) || "").split( /\s+/ ),
        index = $.inArray(val, describedby);
    if (index !== -1) {
      describedby.splice(index, 1);
    }
    describedby = $.trim(describedby.join( " " ));
    if (describedby) {
      el.attr(attr, describedby);
    } else {
      el.removeAttr(attr);
    }
  };


  // Alert Extension
  // ===============================
  var alertConstructor = $.fn.dropdown.Constructor,
      alertFn = $.fn.dropdown;

  $.fn.alert = function () {
    $(this).attr({ role: 'alert' });
    return alertFn.apply(this, arguments);
  };
  $.fn.alert.Constructor = alertConstructor;


  // TOOLTIP Extension
  // ===============================
  var showTooltip = $.fn.tooltip.Constructor.prototype.show,
      hideTooltip = $.fn.tooltip.Constructor.prototype.hide;

  $.fn.tooltip.Constructor.prototype.show = function () {
      showTooltip.apply(this, arguments);
      var $tip = this.tip(),
          tooltipID = $tip.attr('id') || uniqueId('ui-tooltip');
      $tip.attr({ role: 'tooltip',id : tooltipID });
      this.$element.attr({ 'aria-describedby': tooltipID });
  };

  $.fn.tooltip.Constructor.prototype.hide = function () {
      hideTooltip.apply(this, arguments);
      removeMultiValAttributes(this.$element, 'aria-describedby', this.tip().attr('id'));
      return this;
  };


  // Popover Extension
  // ===============================
  var showPopover =   $.fn.popover.Constructor.prototype.setContent,
      hidePopover =   $.fn.popover.Constructor.prototype.hide;

  $.fn.popover.Constructor.prototype.setContent = function () {
    showPopover.apply(this, arguments);
    var $tip = this.tip(),
        tooltipID = $tip.attr('id') || uniqueId('ui-tooltip');
    $tip.attr({ role: 'alert', id: tooltipID });
    this.$element.attr('aria-describedby', tooltipID).focus();
  };

  $.fn.popover.Constructor.prototype.hide =  function () {
      hidePopover.apply(this, arguments);
      removeMultiValAttributes(this.$element, 'aria-describedby', this.tip().attr('id'));
      return this;
  };


  // DROPDOWN Extension
  // ===============================
  function a11yDropdown() {
    var toggle = this,
        root = toggle.parent(),
        menu = root.find('ul'),
        items = menu.find('li');

    toggle
      .attr({ 'aria-haspopup': true, 'aria-expanded': false });
    menu
      .attr({ role: 'menu' });
    items
      .attr({ role: 'presentation' })
      .find('a')
      .attr({ role: 'menuitem', tabIndex: '-1' });

    root.on({
      'shown.bs.dropdown': function(e) {
        toggle.attr({ 'aria-expanded': 'true' });
        setTimeout(function() {
          $('[role=menuitem]:visible:first', menu).focus();
        }, 200);
      },
      'hidden.bs.dropdown': function(e) {
        toggle.attr('aria-expanded','false');
      }
    });

    return this;
  }

  $(document)
    .on('focusout.dropdown.data-api', '.dropdown-menu', function(e) {
      var that = this;
      setTimeout(function() {
        if(!$.contains(that, document.activeElement)) {
          $(that)
            .parent()
            .removeClass('open')
            .find('[data-toggle=dropdown]')
            .attr({ 'aria-expanded': false });
        }
      }, 150);
    })
    .on('keydown.bs.dropdown.data-api', '[data-toggle=dropdown], [role=menu], [role=listbox]' , function (e) {
      //Adding Space Key Behaviour, opens on spacebar
      if (e.which == 32) {
        $(this).click();
      }
    });

  var dropdownConstructor = $.fn.dropdown.Constructor,
      dropdownFn = $.fn.dropdown;

  $.fn.dropdown = function () {
    dropdownFn.apply(this, arguments);
    return a11yDropdown.apply(this);
  };
  $.fn.dropdown.Constructor = dropdownConstructor;


  // Modal Extension
  // ===============================
  var modalHide =   $.fn.modal.Constructor.prototype.hide;
  var modalShow =   $.fn.modal.Constructor.prototype.show;

  $.fn.modal.Constructor.prototype.hide = function () {
     var modalOpener = this.$element.parent().find('[data-target="#' + this.$element.attr('id') + '"]');
     modalhide.apply(this, arguments);
     modalOpener.focus();
  };

  $.fn.modal.Constructor.prototype.show = function () {
    $('.modal-dialog', this).attr({ role : 'document' });
     modalShow.apply(this, arguments);
  };


})(jQuery);