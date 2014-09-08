
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
      .not('[role]')
      .attr({ role: 'menu' });
    items
      .attr({ role: 'presentation' })
      .find('a')
      .not('[role]')
      .attr({ role: 'menuitem', tabIndex: '-1' });

    root.on({
      'shown.bs.dropdown': function(e, args) {
        toggle.attr({ 'aria-expanded': true });
        var el = args.relatedTarget
        if (!$(el).data('preventFocus')) {
          setTimeout(function() {
            $('a[role^="menuitem"]',items).first(':visible').focus();
          }, 200);
        }
        $(el).removeData('preventFocus')
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
    })
    .on('mousedown.bs.dropdown.data-api', '[data-toggle=dropdown]', function (e) {
      $(this).data('preventFocus', true);
    });

  var dropdownConstructor = $.fn.dropdown.Constructor,
      dropdownFn = $.fn.dropdown;

  $.fn.dropdown = function (option) {
    if (!$(this).data('bs.dropdown')) a11yDropdown.apply(this);
    if (typeof option === 'string' && option === 'toggle') {
      $(this).data('preventFocus', true);
    }
    return dropdownFn.apply(this, arguments);
  };
  $.fn.dropdown.Constructor = dropdownConstructor;
