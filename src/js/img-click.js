(function () {
    // Create viewer element here at initialization.
    // Maybe? easier for future. No need to manually insert HTML element manually.
    var viewer = document.createElement('div');
    document.body.appendChild(viewer);
    viewer.id = 'rb-image-viewer';
    viewer.style.display = 'none';
    // Viewer is only clickable when visible. So clicking it should hide it.
    viewer.addEventListener('click', function () {
        viewer.removeChild(viewer.querySelector('.rb-img'));
        viewer.style.display = 'none';
    }, false);

    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // 
    // Image elements eventlistener
    // 1. Click listener for .rb-img-container
    //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // 1
    //
    // Adds click event to all .rb-img-container.
    // Those are library classes that contains images.
    //
    // Functions action depends on images rb-target attribute.
    // rb-target tells that current image is thumbnail and this attributes value is original.
    //
    var imgContainerList = document.getElementsByClassName('rb-img-container');
    for (var i = 0; i < imgContainerList.length; i++) {
        imgContainerList[i].addEventListener('click', function () {
            viewer.style.display = 'block';

            var tbImage = this.querySelector('.rb-img');
            
            var image = null;
            if (tbImage.getAttribute('rb-target')) {
                image = new Image();
                image.className = 'rb-img';
                image.addEventListener('load', onLoadAppend(viewer, image));
                image.src = tbImage.getAttribute('rb-target');
            }
            else {
                image = this.querySelector('.rb-img').cloneNode(true);
                viewer.appendChild(image);
            }
        }, false);
    }
    
    function onLoadAppend(target, element) {
        target.appendChild(element);
    }
})();