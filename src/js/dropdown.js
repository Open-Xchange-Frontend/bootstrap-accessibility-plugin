
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
