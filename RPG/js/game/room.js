function Room(options) {
    options = (options instanceof Object) ? options : {};
    this.id = options.id;
    this.title = options.title || 'Комната без названия';
    this.description = options.description || 'Описания не завезли, думай сам';
    var img = new Image();
        img.src = options.img || 'img/default.png';
    this.img = img;
    this.exit   = (options.exit   instanceof Array) ? options.exit   : [];
    this.action = (options.action instanceof Array) ? options.action : [];
    this.items = [];
    this.mus = options.mus || 'music/default.mp3';
    this.monster = options.monster || null;
    function init() {
        
    }
    init();
}