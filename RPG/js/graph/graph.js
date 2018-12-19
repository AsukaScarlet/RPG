function Graph(click, mouseOver) {
    var canvas;
    var context;

    this.clear = function () {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    this.drawImage = function (img, x, y) {
        context.drawImage(img, x, y);
    };
    this.drawImageScale = function (img, x, y, width, height) {
        context.drawImage(img, 0, 0, img.width, img.height, x, y, width, height);
    };
    function init() {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        canvas.onclick = click;
        canvas.addEventListener('mousemove', mouseOver);
    }
    init();
}