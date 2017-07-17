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

                //cria os options
                $.each(select.find('option'), function(index, val) {
                    self.createOptions(val).appendTo(optionsContainer);
                });

                placeholder.appendTo(newSelect);
                optionsContainer.appendTo(newSelect);


                // Adiciona selecti no DOM
                select.after(newSelect);
            });

            return 0;

        },

        //cria corpo do select
        createSelect: function(select, Options) {
            var self = Selecti,
                $el = $(select),
                placeholder = '',
                $placeholder,
                // $container = '',//div pai
                // $ul = '';//lista com os options
                $container = $('<div class="selecti"></div>'),
                $ul = $('<ul></ul>');


            $.each($el, function (i, sel) {
                //verifica se tem placeholder em data ou setado js e adiciona
                $placeholder = $(
                    '<div class="placeholder">'+
                        (($(sel).attr('placeholder')) ? $(sel).attr('placeholder') : (Options.placeholder.length > 0) ? Options.placeholder : '')+
                    '</div>');

                $.each($(sel).find('option'), function (j, options) {
                    $ul.append(self.createOptions(j, options));
                });

                //cria div com a listagem de options
                // $placeholder.append(placeholder);
                $container.append($placeholder);
                $container.append($ul);

                console.log($container);

                $(sel).after($container);
            });


            return 0;
        },

        //Cria os options e retorna li com o option
        createOptions: function(elm) {
            var self = this,
                $elm = $(elm);
            // caso seja single select
            if ($elm.is('option')) {
                var value = $elm.val(),
                    label = $elm.text(),
                    selected = $elm.attr('selected') ? true : false,
                    $el;

                $el = $('<li class="option" data-value="'+value+'">'+label+'</li>');
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
        //chama método
        if (Selecti[method]) {
            return Selecti[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        //inicia plugin
        else if (typeof method === 'object' || !method) {
            return Selecti.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + 'does not exist');
        }
    };

})(jQuery);