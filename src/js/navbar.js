(function () {
    var navbar_container = document.getElementById('navbar-container');
    hideNavbarScroll();

    var navbar_nested_collapser = document.getElementsByClassName('navbar-nested-collapser');
    var navbar_ul = document.querySelector('.navbar-ul');
    var navbar_li_height = document.getElementsByClassName('navbar-li').length * 50;
    var active_collapser = null;

    var navbar_collapser = document.getElementById('navbar-collapser');
    var navbar_collapsed = false;

    var mobile_view = (document.documentElement.clientWidth <= 768);

    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // 
    // Eventlisteners
    // 1. navbar_nested_collapser eventlistener
    // 2. navbar_collapser eventlistener
    // 3. "global" eventlistener for closing navbar_collapser
    // 4. window resize eventlistener
    //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // 1
    //
    // Add click event to all nested links collapser
    //
    for (var i = 0; i < navbar_nested_collapser.length; i++) {
        navbar_nested_collapser[i].addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            var nested_ul = this.parentElement.querySelector('.navbar-nested');
            if (!hasClass(this, 'active')) {
                // Close other active_collapser.
                if (active_collapser) {
                    active_collapser.classList.toggle('active');
                    active_collapser.parentElement.querySelector('.navbar-nested').style.height = '0px';
                }
                // Calculate and sets total height of this nested_ul
                var temp_height = (50 * nested_ul.getElementsByTagName('li').length);
                nested_ul.style.height = temp_height + 'px';
                // Adds this height to navbar height if this is in mobile_view and navbar_collapsed
                if (mobile_view && navbar_collapsed) {
                    navbar_ul.style.height = (navbar_li_height + temp_height) + 'px';
                }
                active_collapser = this;
            }
            else {
                nested_ul.style.height = '0px';
                if (mobile_view && navbar_collapsed) {
                    navbar_ul.style.height = navbar_li_height + 'px';
                }
                active_collapser = null;
            }

            this.classList.toggle('active');
        }, false);
    }

    // 2
    navbar_collapser.addEventListener('click',function(event){
        event.preventDefault();
        event.stopPropagation();
        
        if(!navbar_collapsed){
            navbar_ul.style.height = navbar_li_height + 'px';
            navbar_collapsed = true;
        }
        else{
            navbar_ul.style.height = '0px';
            navbar_collapsed = false;
            closeNavbarActiveElements();
        }
        this.classList.toggle('active');

    }, false);

    // 3
    document.addEventListener('click', closeNavbarActiveElements, false);

    // 4
    window.addEventListener('resize', function () {
        // Exiting mobile view
        if (window.innerWidth >= 769 && mobile_view === true) {
            closeNavbarActiveElements();
            hideNavbarScroll();
            mobile_view = false;
        }
        // Entering mobile view
        else if (window.innerWidth <= 768 && mobile_view === false) {
            closeNavbarActiveElements();
            hideNavbarScroll();
            mobile_view = true;
        }
    });


    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // 
    // Misc functions
    // 1. fireEvent(element, eventType) - fire "eventType" on "element"
    // 2. hideNavBarScroll() - hides navbar if there's scroll.
    // 3. hasClass(element, cls) - checks if "element" have class "cls"
    // 4. closeNavbarActiveElements() - closes navbar and navbar_nested_collapser if there's any activated
    //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // 1
    // Fires parameter 2 "eventType" on parameter 1 "element"
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
    // 2
    // Easy way to hide scrollbar in navbar
    // Will be used a lot so it's easier to manage it here instead of changing every line.
    //
    // #navbar-container have top: 0; left: 0; right: 0;
    // By setting right -17px for example will shove vertical scroll out of the viewport.
    //
    function hideNavbarScroll() {
        navbar_container.style.right = (navbar_container.clientWidth - navbar_container.offsetWidth) + 'px';
    }
    // 3
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    // 4
    function closeNavbarActiveElements(){
        if(active_collapser){
            eventFire(active_collapser, 'click');
        }
        if(navbar_collapsed){
            eventFire(navbar_collapser, 'click');
        }
    }
})();