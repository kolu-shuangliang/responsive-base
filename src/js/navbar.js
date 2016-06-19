var ResponsiveNavbar = function () {
    // Toggle display to none/inline when users press collapser links inside navbar
    var collapser = document.getElementsByClassName('collapser');
    var nested = document.getElementsByClassName('navbar-nested');
    var ulList = document.getElementsByClassName('nav-links');
    var navbar_container = document.getElementById('navbar-container');
    navbar_container.style.paddingLeft = (navbar_container.offsetWidth - navbar_container.clientWidth) + 'px';
    var collapsed = false;
    var mobile_view = false;
    var selected_nested = null;
    let i;
    // Check if styles are already in mobile view
    if (document.documentElement.clientWidth < 768) {
        mobile_view = true;
    }
    // Adds events listener that collapsed nested links to dropdown links in navbar.
    for (i = 0; i < collapser.length; i++) {
        collapser[i].addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var el = this.parentElement.getElementsByClassName('navbar-nested')[0];
            if (el.style.display === 'inline') {
                el.style.display = 'none';
                selected_nested = null;
            }
            else {
                // Hide all other displayed navbar elements.
                // There should be only 0 or 1 displayed navbar-nested,
                // so breaks away after hiding first one.
                for (var i = 0; i < collapser.length; i++) {
                    if (nested[i].style.display === 'inline') {
                        nested[i].style.display = 'none';
                        break;
                    }
                }
                el.style.display = 'inline';
                selected_nested = this;
            }
        }, false);
    }

    // Click event for "hamburger" that's only visible on lower widths.
    // Display navbar links depending on if it's currently collapsed or not.
    document.getElementById('navbar-collapser').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let i;
        for (i = 0; i < ulList.length; i++) {
            if (collapsed) {
                ulList[i].style.display = 'none';
            }
            else {
                ulList[i].style.display = 'inline';
            }
        }

        if (collapsed) {
            collapsed = false;
        }
        else {
            collapsed = true;
        }
        if (selected_nested != null) {
            eventFire(selected_nested, 'click');
        }
    }, false);
    // Changes display.style for navbar links on entering and existing mobile views.
    // Use eventlistener for window resize
    // Css don't seems to override JavaScript changes. So this seems to be easiest way.
    // Use mobile_view so actions are only performed once after entering/existing.
    window.addEventListener('resize', function () {
        let i;
        if (window.innerWidth >= 769 && mobile_view === true) {
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.display = 'inline';
            }
            navbar_container.style.paddingLeft = (navbar_container.offsetWidth - navbar_container.clientWidth) + 'px';
            mobile_view = false;
        }
        else if (window.innerWidth <= 768 && mobile_view === false) {
            for (i = 0; i < ulList.length; i++) {
                ulList[i].style.display = 'none';
                collapsed = false;
            }
            navbar_container.style.paddingLeft = (navbar_container.offsetWidth - navbar_container.clientWidth) + 'px';
            mobile_view = true;
        }
        if (selected_nested != null) {
            eventFire(selected_nested, 'click');
        }
    });

    // Close displayed navbar-nested if user clicks on any elements
    // other than navbar-nested collapser
    document.addEventListener('click', function () {
        let i;
        for (i = 0; i < collapser.length; i++) {
            if (nested[i].style.display === 'inline') {
                nested[i].style.display = 'none';
                break;
            }
        }
        if (collapsed) {
            eventFire(document.getElementById('navbar-collapser'), 'click');
        }
    }, false);
    // Fire eventType on element.
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