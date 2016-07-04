(function(){
    var nav_containers = document.getElementsByClassName('cl-nav-tab');

    for(var i = 0; i < nav_containers.length; i++){
        var nav_tabs = nav_containers[i].getElementsByClassName('cl-nav-tab-tab');
        for(var j = 0; j < nav_tabs.length; j++){
            nav_tabs[j].addEventListener('click', function(){
                if(!hasClass(this, 'active')){
                    this.parentElement.querySelector('.active').classList.toggle('active');
                    this.classList.toggle('active');
                }
            },false);
        }
    }

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

})();