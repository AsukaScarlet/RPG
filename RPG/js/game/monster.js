function Monster(options) {
    options = (options instanceof Object) ? options : {};
    this.id = options.id;
    this.title = options.title || 'Monster';
    this.description = options.description || 'Описания нету совсем';
    this.action = (options.action instanceof Array) ? options.action : [];
    var img = new Image();
        img.src = options.img;
    this.img = img;
};