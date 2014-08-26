
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
