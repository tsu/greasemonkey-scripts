// ==UserScript==
// @name        Trello colored cards
// @include     https://trello.com/board/*
// @version     1
// ==/UserScript==
(function () {
  "use strict";
  function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
    script.addEventListener('load', function() {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  }

  function main() {
    var colors = {
      red: '#CB4D4D',
      green: '#34B27D',
      yellow: '#DBDB57',
      orange: '#E09952'
    };
	  jQuery.noConflict(true);
    checkForNewCards();
    function checkForNewCards() {
      $('div.list-card').each(function(index, card) {
        var $card = jQuery(card);
        $card.attr('class')
             .split(/\s+/)
             .filter(matches(/[^-]*-label/))
             .map(toColor)
             .forEach(addTo($card));
      });
      function matches(regex) {
        return function(s) {
          return regex.test(s);
        };
      }
      function toColor(className) {
        return className.replace(/-label/, '');
      }
      function addTo($card) {
        return function(color) {
          $card.css('background-color', colors[color] || '#fff');
        };
      }
      setTimeout(checkForNewCards, 100);
    }
  }

  addJQuery(main);
}());