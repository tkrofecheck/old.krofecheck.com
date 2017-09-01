var myApp = { // Namespace
        dataFile: 'data.min.json',
        updated: 1450474084634
    };

// Is browser capable of touch events, add class to html tag (simpler than using modernizr)
// This should work on all desktop and mobile devices including iOS, Android, Opera, Chrome, IE, Safari and Windows Phone.
(function() {
    var htmlTag = document.getElementsByTagName('html')[0];

    if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
        htmlTag.classList.add('touch');
    } else {
        htmlTag.classList.add('no-touch');
    }
})();

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
requirejs.config({
    baseUrl: 'js/lib',
    findNestedDependencies: true,
    paths: {
      app: '../app',
      tools: '../app/tools',
      jquery: ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min', 'jquery.min'],
      underscore: ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min', 'underscore-min'],
      handlebars: ['//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min', 'handlebars.min'],
      masonry: ['//cdnjs.cloudflare.com/ajax/libs/masonry/3.3.2/masonry.pkgd.min', 'masonry.pkgd.min']
    }
});

// Load the main app module to start the app
requirejs(['app/main']);
