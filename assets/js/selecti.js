(function($) {
    "use strict";

   // Set private defaults.
    var settings = {
        placeholder: '',
        param: 'oi',
        onComplete: function(el) {}
    };

    // Define the public api and its public methods.
    var Selecti = {
        extend: function(name, method) {
            Selecti[name] = method;
            return this;
        },

        init: function(PublicOptions) {
            var self = Selecti,
                $el = this;

            // Do a deep copy of the options.
            var Options = $.extend(true, {}, settings, PublicOptions);


            this.each(function() {
                var select = $(this);

                var newSelect = $('<div class="selecti"></div>'),
                    placeholder = $('<div class="placeholder">'+(($(select).attr('placeholder')) ? $(select).attr('placeholder') : (Options.placeholder.length > 0) ? Options.placeholder : '')+'</div>'),
                    optionsContainer = $('<ul class="options"></ul>'),
                    options;

                //create options
                $.each(select.children(), function(index, val) {
                    self.createOptions(val).appendTo(optionsContainer);
                });

                placeholder.appendTo(newSelect);
                optionsContainer.appendTo(newSelect);


                // add selecti DOM
                select.after(newSelect);
            });

            return 0;

        },

        //create options
        createOptions: function(elm, group) {
            var self = Selecti,
                $elm = $(elm);
            // single select
            if ($elm.is('option')) {
                var value = $elm.val(),
                    label = $elm.text(),
                    selected = $elm.attr('selected') ? true : false,
                    $el;

                $el = $('<li class="option" data-value="'+value+'">'+label+'</li>');
            }

            if ($elm.is('optgroup')) {
                var label = $elm.attr('label'),
                    $group = $('<ul></ul>'),
                    $optgroup = $('<li><div class="optgroup-label">'+label+'</div></li>');

                $.each($elm.children(), function (i, elm) {
                    $group.append(self.createOptions(elm, $group));
// $group.append(that.optionToHtml(elm, group));
                });
                    console.log($group);

                $group.appendTo($optgroup);
                $el = $group.html();
                // return $group.html();
            }
            return $el;
        },

        method1: function() {
            console.log('called: method1');
            return this;
        },
    };

    // Create the plugin name and defaults once
    var pluginName = 'selecti';

    // Attach the plugin to jQuery namespace.
    $.fn[pluginName] = function(method) {
        //call method
        if (Selecti[method]) {
            return Selecti[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        //init plugin
        else if (typeof method === 'object' || !method) {
            return Selecti.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + 'does not exist');
        }
    };

})(jQuery);