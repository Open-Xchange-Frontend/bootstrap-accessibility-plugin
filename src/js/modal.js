
  // Modal Extension
  // ===============================
  $.fn.modal.Constructor.prototype.hideOld = $.fn.modal.Constructor.prototype.hide;
  $.fn.modal.Constructor.prototype.showOld = $.fn.modal.Constructor.prototype.show;

  $.fn.modal.Constructor.prototype.hide = function () {
     var modalOpener = this.$element.parent().find('[data-target="#' + this.$element.attr('id') + '"]');
     $.fn.modal.Constructor.prototype.hideOld.apply(this, arguments);
     modalOpener.focus();
  };

  $.fn.modal.Constructor.prototype.show = function () {
    $('.modal-dialog', this).attr({ role : 'document' });
     $.fn.modal.Constructor.prototype.showOld.apply(this, arguments);
  };
