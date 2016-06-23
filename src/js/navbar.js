// TODO move fire event to personal namespace for functions

var ResponsiveNavbar = function () {

    // Some popular document elements that'll be used a lot.
    // There's a lot of eventlisteners so it's easier and lighter to assign them to variables at start
    var collapser = document.getElementsByClassName('collapser');
    var ulList = document.getElementsByClassName('nav-links');
    var navbar_container = document.getElementById('navbar-container');

    // Hide navbar's scrollbar if there is any. If not padding-left will be 0px
    // Collapsed compact/mobile navbar may require scrolling because all links may not fit inside height.
    // It may show scrollbar inside navbar element.
    // This will calculate difference and use padding to hide extra (which is scrollbars width)
    navbar_container.style.paddingLeft = (navbar_container.offsetWidth - navbar_container.clientWidth) + 'px';

    // Boolean variables for checking navbar status
    var collapsed = false;
    var mobile_view = false;

    // Current open collapser.
    // Collapser are used for nested links.
    // If none is open, then this value will be null.
    // Some eventlisteners will use this variable to fire click event to close collapser
    var selected_nested = null;

    // Check if browser is already in mobile view.
    if (document.documentElement.clientWidth < 768) { mobile_view = true; }

    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // 
    // NavBar elements eventlisteners
    // 1. navbar nested collapser: show/hide nested links inside collapser
    // 2. Navbar compact view "hamburger": show/hide navbar when it is in compact/mobile view
    //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // 1
    // Loops through all collapser and adds eventlistener to them.
    // Function sets nested links status. x.style.display = 'inline' or 'none'
    //
    // Prevents elements default action and stops propagation.
    // There is eventlistener in document elements that will close navbar/collapser
    // if user clicked any DOM elements.
    //
    // Sets "selected_nested" variable.
    //
    // useCapture: false
    //
    for (var i = 0; i < collapser.length; i++) {
        collapser[i].addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Get ul elements that contains nested links.
            // Collapser and said ul are both under same parent.
            var elem = this.parentElement.querySelector('.navbar-nested');

            // Hides links if they are already displayed ( have css style "display: inline" )
            // Also resets selected_nested 
            if (elem.style.display === 'inline') {
                elem.style.display = 'none';
                selected_nested = null;
            }
            // If links are not displayed, then display them.
            else {
                // If there is another collapser links visible then hides them.
                if (selected_nested != null) {
                    var temp = selected_nested.parentElement.querySelector('.navbar-nested');
                    if (temp.style.display === 'inline') {
                        temp.style.display = 'none';
                        selected_nested = null;
                    }
                }
                // Display links.
                // Also save this as selected
                elem.style.display = 'inline';
                selected_nested = this;
            }
        }, false);
    }

    // 2
    //
    // Compact view "hamburger" click event.
    // Show and hides links inside navbar.
    //
    // Navbar links ( except brand/logo ) will be hidden in compact/mobile view.
    // This eventlistener will show/hide links inside navbar.
    //
    // Prevents default action and propagation from click.
    //
    //  Sets this object "collapsed" variable.
    //
    // useCapture: false
    //
    document.getElementById('navbar-collapser').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var i;
        // Loops through all link containers ( ul ) inside navbar
        // Change navbar links visibility depending on current status ( collapsed )
        if (collapsed) {
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.display = 'none';
            }
            collapsed = false;
        }
        else {
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.display = 'inline';
            }
            collapsed = true;
        }
        // Close collapsed nested link.
        // Easier to simulate click on them since collapsers eventlistener shows/hides itself.
        if (selected_nested != null) {
            eventFire(selected_nested, 'click');
        }
    }, false);

    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // 
    // Browser element eventlisteners.
    // 1. window resize: for navbar compact view
    // 2. click on any DOM element: for closing navbar
    //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // 1
    //
    // Changes display.style for navbar links on entering and existing mobile views.
    //
    // Use eventlistener for window resize
    //
    // Css don't seems to override JavaScript changes. So this seems to be easiest way.
    // Use mobile_view so actions are only performed once after entering/existing.
    //
    window.addEventListener('resize', function () {
        var i;
        // Checks for entering mobile or normal view.
        if (window.innerWidth >= 769 && mobile_view === true) {
            // Show all links except those nested in normal view.
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.display = 'inline';
            }
            collapsed = false;
            mobile_view = false;
            // Remove padding that hides scrollbar on navbar.
            navbar_container.style.paddingLeft = (navbar_container.offsetWidth - navbar_container.clientWidth) + 'px';
            // Close displayed nested links if there is any.
            if (selected_nested != null) { eventFire(selected_nested, 'click'); }
        }
        else if (window.innerWidth <= 768 && mobile_view === false) {
            // Hide all links in mobile view.
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.display = 'none';
            }
            collapsed = false;
            mobile_view = true;
            // Add padding that hides scrollbar on navbar
            navbar_container.style.paddingLeft = (navbar_container.offsetWidth - navbar_container.clientWidth) + 'px';
            // Close displayed nested links if there is any.
            if (selected_nested != null) { eventFire(selected_nested, 'click'); }
        }
    });

    // 2
    //
    // Closes navbar and collapsed nested links when user interact with other part of page.
    //
    document.addEventListener('click', function () {
        // Check if theres any collapsed nested links
        if (selected_nested != null) {
            // Close them if there are
            var temp = selected_nested.parentElement.querySelector('.navbar-nested');
            if (temp.style.display === 'inline') {
                temp.style.display = 'none';
                selected_nested = null;
            }
        }
        // Check if navbar is collapsed and in mobile view.
        // 1. resize eventlistener will close navbar when user enters normal view from mobile view.
        if (collapsed && mobile_view) {
            eventFire(document.getElementById('navbar-collapser'), 'click');
        }
    }, false);


    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // 
    // Misc functions
    // 1. fireEvent(element, eventType) - fire event on element
    //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // 1
    // Fires parameter 2 "eventType" on parameter 1 "element"
    //
    // IE browser uses fireEvent
    // Most other browses uses W3C dispatchEvent
    //
    // canBubbleArg: true
    // cancelableArg: false
    // TODO: write version with arguments when needed...
    //
    function eventFire(element, eventType) {
        if (element.fireEvent) {
            element.fireEvent('on' + eventType);
        }
        else {
            var eventObject = document.createEvent('Events');
            eventObject.initEvent(eventType, true, false);
            element.dispatchEvent(eventObject);
        }
    }
};
// Invoke navbar
ResponsiveNavbar();