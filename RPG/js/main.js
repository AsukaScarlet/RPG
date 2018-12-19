window.onload = function () {
    var ways = document.getElementById('ways');
    var game = new Game();
    var graph = new Graph(canvasClick, canvasMouseOver);
    var img = new Image();
    img.src = 'img/rooms/default.png';

    //var onloadedImages = 0;
   // var totalImages = 0;

    fillRoom(game.getCurrentRoom(), game.getExits());
    setTimeout(render, 1000);

    function render() {
        var room = game.getCurrentRoom();
        if (room) {
            graph.clear();
            graph.drawImage(room.img, 0, 0);
            if (room.monster) {
                console.log(room.monster);
                if (room.monster.img.complete) {
                    graph.drawImageScale(room.monster.img, 100, 100, 220, 220);
                } else {
                    room.monster.img.onload = function () { graph.drawImageScale(this, 100, 100, 220, 220); }
                }
                //graph.drawImageScale(room.monster.img, 100, 100, 220, 220);
            }
            for (var i = 0; i < room.items.length; i++) {
                (function (i) {
                    if (room.items[i].img.complete) {
                        graph.drawImageScale(room.items[i].img, 100 * i, 350, 90, 90);
                    } else {
                        room.items[i].img.onload = function () { graph.drawImageScale(this, 100 * i, 350, 90, 90); }
                    }
                })(i);
            }
        }
    }

    function canvasClick(event) {
        var room = game.getCurrentRoom();
        var x = Math.floor(event.offsetX);
        var y = Math.floor(event.offsetY);
        if (y >= 350 && y <= 440) {
            for (var i = 0; i < room.items.length; i++) {
                if (x >= (100 * i) && x <= (100 * i + 90)) {
                    var itemNum = Math.floor(event.offsetX / 100);
                    game.putInBackpack(room.items[i]);
                    room.items.splice(i, 1);
                    render();
                    addBackpack();
                }
            }
        }
    }
    
    function canvasMouseOver(event) {
        var room = game.getCurrentRoom();
        var x = Math.floor(event.offsetX);
        var y = Math.floor(event.offsetY);
        var itemInfo = document.getElementById('itemInfo');
        if (y >= 350 && y <= 440) {
            for (var i = 0; i < room.items.length; i++) {
                if (x >= (100 * i) && x <= (100 * i + 90)) {
                    var itemNum = Math.floor(event.offsetX / 100);
                    itemInfo.style.display = 'block';
                    itemInfo.style.left = x + window.innerWidth/4;
                    itemInfo.style.top = y;
                    itemInfo.innerHTML = room.items[itemNum].title + '<br/>' + room.items[itemNum].description;
                    break;
                } else {
                    itemInfo.style.display = 'none';
                }
            }
        } else {
            itemInfo.style.display = 'none';
        }
    }

    function addExit(room) {
        if (room) {
            var button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('value', room.title);
            button.setAttribute('data-room-id', room.id);
            button.onclick = function () {
                game.goTo(this.getAttribute('data-room-id'));
                game.changeFuel('-5');
                changeFuel();
                fillRoom(game.getCurrentRoom(), game.getExits());
            };
            ways.appendChild(button);
        }
    }
    function fillRoom(room, exits) {
        if (room) {
            render();
            document.getElementById('room-title').innerHTML = room.title;
            document.getElementById('room-description').innerHTML = room.description;
            //document.getElementById('img').setAttribute('src', room.img);
            //document.getElementById('mus').setAttribute('src', room.mus);
            ways.innerHTML = '';
            for (var i = 0; i < exits.length; i++) {
                addExit(exits[i]);
            }
            if (room.items) {
                //addItems(room.items);
            }
        }
    }
    function addItems(items) {
        var itemsField = document.getElementById('items-field');
        var itemIds = game.getItemIds();
        itemsField.innerHTML = '';
        for (var i = 0; i < items.length; i++) {
            (function (i) {
                var div = createDiv('item');
                div.appendChild(createSpan(items[i].title));
                if (items[i].id === itemIds.MONEY) {
                    div.innerHTML += ' : ' + items[i].value;
                }
                div.innerHTML += '<br/>';
                //div.appendChild(createImg(items[i].img, 70, 70));
                div.innerHTML += '<br/>';
                div.appendChild(createSpan(items[i].description));
                div.innerHTML += '<br/>';
                div.appendChild(createButton(null, 'TAKE', function () { putInBackpack(items, i); }));
                //div += items[i].title;
                //div += '<br/>';
                itemsField.appendChild(div);
            })(i);
        }
    }

    function changeFuel() {
        document.getElementById('fuel-progress').style.width = game.getFuel() + '%';
    }

    function addBackpack() {
        var items = game.getBackpack();
        var itemsField = document.getElementById('backpack-field');
        var itemIds = game.getItemIds();
        var valueMoney = game.getValueMoney();
        itemsField.innerHTML = '';
        for (var i = 0; i < items.length; i++) {
            (function (i) {
                if (items[i].id === itemIds.MONEY) {
                    valueMoney += items[i].value;
                    game.setValueMoney(valueMoney);
                    items.splice(i, 1);
                } else {
                    var div = createDiv('backpack-item');
                    div.appendChild(createSpan(items[i].title));
                    div.innerHTML += '<br/>';
                    div.appendChild(createImg(items[i].img.src, 35, 35));
                    div.innerHTML += '<br/>';
                    //div.appendChild(createSpan(items[i].description));
                    // div.innerHTML += '<br/>';
                    div.appendChild(createButton(null, 'USE', function () { useItem(i); changeFuel(); }));
                    div.appendChild(createButton(null, 'TAKE DOWN', function () { game.takeDown(i); addBackpack(); }));
                    itemsField.appendChild(div);
                }
            })(i);
            document.getElementById('money-volue').innerHTML = valueMoney;
        }
    }

    function useItem(i) {
        if (game.useItem(i)) {
            addBackpack();
            fillRoom(game.getCurrentRoom(), game.getExits());
        }
    }

    function putInBackpack(items, i) {
        if (items[i]) {
            var item = items[i];
            items.splice(i, 1)
            game.putInBackpack(item);
            addItems(items);
            addBackpack();
        }
    }

    function init() {
        document.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                case 81:
                    showBackpack(true);
                    break;
                case 27:
                    ///esc
                    break;
            }
        });
        document.addEventListener('keyup', function (event) {
            switch (event.keyCode) {
                case 81:
                    showBackpack(false);
                    break;
            }
        });
    }
    init();

    function showBackpack(bool) {
        var backpack = document.getElementById('backpack');
        if (bool && (backpack.style.display == 'none' || backpack.style.display == '')) {
            backpack.style.display = 'block';
            document.getElementById('personInfo').style.display = 'none';
            document.getElementById('rooms').style.display = 'none';
            document.getElementById('exits').style.display = 'none';
            //document.getElementById('mus').style.display = 'none';
            document.getElementById('body').style.backgroundColor = '#DCDCDC';
        }else if (!bool && backpack.style.display == 'block') {
            backpack.style.display = 'none';
            document.getElementById('personInfo').style.display = 'block';
            document.getElementById('rooms').style.display = 'block';
            document.getElementById('exits').style.display = 'block';
            //document.getElementById('mus').style.display = 'block';
            document.getElementById('body').style.backgroundColor = 'white';

        }
    }

    function createDiv(cls) {
        var div = document.createElement('div');
        div.setAttribute('class', cls || '');
        return div;
    }
    function createSpan(text) {
        var span = document.createElement('span');
        span.innerHTML = text || '';
        return span;
    }
    function createInput(cls) {
        var input = document.createElement('input');
        input.setAttribute('type', 'text')
        input.setAttribute('class', cls || '');
        return input;
    }
    function createButton(id, value, callback) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('id', id || '');
        button.setAttribute('value', value || '');
        button.onclick = callback || function () { };
        return button;
    }
    function createImg(src, width, height) {
        var img = document.createElement('img');
        img.setAttribute('width', width);
        img.setAttribute('height', height);
        img.setAttribute('src', src);
        return img;
    }
};