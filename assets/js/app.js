"use strict";

function Main() {
    this.init();
};

Main.prototype.init = function(){
    var self = this;

    // $('.select').selecti();
    $('.select').selecti({
        placeholder: 'valor',
    });

    // $('.select').selecti('method1');

};

$(document).ready(function(){
    new Main();
});