var ResponsiveImg = function () {
    // Construct HTML element for images fullscreen view.
    var viewer =  document.createElement('div');
    document.body.appendChild(viewer);
    viewer.id = 'rb-image-viewer';
    viewer.style.display = 'none';
    viewer.addEventListener('click', function(){
        viewer.removeChild(viewer.querySelector('.rb-img'));
        viewer.style.display = 'none';
    }, false);


    // Add eventlistener that zooms into fullscreen to all rb-img-containers.
    var imgContainerList = document.getElementsByClassName('rb-img-container');
    for(let i = 0; i < imgContainerList.length; i++){
        imgContainerList[i].addEventListener('click', function(){
            viewer.style.display = 'block';

            var tbImage = this.querySelector('.rb-img');
            //
            var image = null;
            if(tbImage.getAttribute('rb-target')){
                image = new Image();
                image.className = 'rb-img';
                image.addEventListener('load', onLoadAppend( viewer, image ));
                image.src = tbImage.getAttribute('rb-target');
            }
            else{
                image = this.querySelector('.rb-img').cloneNode(true);
                viewer.appendChild(image);
            }
        }, false);
    }

    function onLoadAppend( target, element ){
        target.appendChild( element );
    }
};
// Invoke navbar
ResponsiveImg();