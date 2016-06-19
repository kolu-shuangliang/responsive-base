var ResponsiveImg = function () {
    // Construct HTML element for images fullscreen view.
    var viewer =  document.createElement('div');
    document.body.appendChild(viewer);
    viewer.id = 'responsive-image-viewer';
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
            var image = this.querySelector('.rb-img').cloneNode(true);
            viewer.appendChild(image);
        }, false);
    }
};
// Invoke navbar
ResponsiveImg();