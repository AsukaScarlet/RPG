function Struct() {

    var currentRoom = null; // текущая комната
    var fuel = 100;
    var backpack = []; // карманы
    var valueMoney = 0;
    /******************/
    /* ИДЕНТИФИКАТОРЫ */
    /******************/
    var ROOMS_ID = {
        ROOM: 'ROOM', 
        HALL: 'HALL',
        CLOSET: 'CLOSET',
        KITCHEN: 'KITCHEN',
        LIFT: 'LIFT',
        KPP: 'KPP',
        STREET: 'STREET', 
        DEATH: 'DEATH',
        BUSH: 'BUSH',
        STATION: 'STATION',
        KURILKA: 'KURILKA',
        BEER: 'BEER',
        ZAKUTOK: 'ZAKUTOK',
        MENTOVKA: 'MENTOVKA',
    };
    var ITEMS_ID = {
        BEER: 'BEER',
        PASS_CARD: 'PASS_CARD',
        MONEY: 'MONEY',
        FOOD: 'FOOD'
    };
    var MONSTERS_ID = {
        GOLOVIZIN: 'GOLOVIZIN',
        RADIONOVA: 'RADIONOVA',
        SHUDEGOV: 'SHUDEGOV',
        TARASOV: 'TARASOV'
    };
    var ACTIONS = {};
    
    /*******************/
    /* ОПИСАНИЕ КОМНАТ */
    /*******************/
    // список игровых комнат
    var ROOM = {};
    ROOM[ROOMS_ID.ROOM] = new Room({
        id: ROOMS_ID.ROOM,
        title: 'Комната Васи',
        description: 'Просто комната с тараканами, но без Васи.',
        exit: [ROOMS_ID.HALL],
        img: 'img/rooms/room.PNG',
        mus: 'music/room.mp3'
    });

    ROOM[ROOMS_ID.HALL] = new Room({
        id: ROOMS_ID.HALL,
        title:'Коридор',
        description:'Будь осторожен, никто не знает, что за углом.',
        exit: [ROOMS_ID.ROOM, ROOMS_ID.KITCHEN, ROOMS_ID.CLOSET, ROOMS_ID.LIFT, ROOMS_ID.KPP],
        img: 'img/rooms/hall.PNG',
        mus: 'music/hall.mp3'
    });

    ROOM[ROOMS_ID.KITCHEN] = new Room({
        id: ROOMS_ID.KITCHEN,
        title:'Кухня',
        description:'Не советую оставлять свою еду без присмотра. Не кормить тараканов и бедных студентов!',
        exit: [ROOMS_ID.HALL],
        img: 'img/rooms/kitchen.PNG',
        mus: 'music/kitchen.mp3'
    });

    ROOM[ROOMS_ID.KPP] = new Room({
        id: ROOMS_ID.KPP,
        title:'Вахта',
        description:'Не зли охранника, но можно попытаться с ним сдружиться.',
        exit: [ROOMS_ID.STREET],
        action: [ITEMS_ID.PASS_CARD],
        img: 'img/rooms/kpp.PNG'
    });

    ROOM[ROOMS_ID.STREET] = new Room({
        id: ROOMS_ID.STREET,
        title:'Улица',
        description:'Слишком холодно, чтобы пойти в Универ, но самое то, чтобы пойти в Пивнушку',
        exit: [ROOMS_ID.KPP, ROOMS_ID.BUSH, ROOMS_ID.KURILKA, ROOMS_ID.BEER],
        img: 'img/rooms/street.PNG',
        mus: 'music/street.mp3'
    });

    ROOM[ROOMS_ID.CLOSET] = new Room({
        id: ROOMS_ID.CLOSET,
        title:'Туалет',
        description:'Лучше просто уйти отсюда.',
        exit: [ROOMS_ID.HALL],
        img: 'img/rooms/toilet.PNG'
    });

    ROOM[ROOMS_ID.LIFT] = new Room({
        id: ROOMS_ID.LIFT,
        title: 'Лифт',
        description: 'И на что ты надеешься? Лифт не работает с самого открытия общаги.',
        exit: [ROOMS_ID.HALL],
        img: 'img/rooms/lift.PNG',
        mus: 'music/lift.mp3'
    });

    ROOM[ROOMS_ID.BUSH] = new Room({
        id: ROOMS_ID.BUSH,
        title: 'Кусты',
        description: 'В кустах что то шевелится, не думаю, что тебе нужно знать что там происходит.',
        exit: [ROOMS_ID.STREET],
        img: 'img/rooms/bush.PNG',
        mus: 'music/street.mp3'
    });

    ROOM[ROOMS_ID.KURILKA] = new Room({
        id: ROOMS_ID.KURILKA,
        title: 'Курилка',
        description: 'Особое место встречи.',
        exit: [ROOMS_ID.STREET],
        img: 'img/rooms/kurilka.PNG',
        mus: 'music/kurilka.mp3'
    });

    ROOM[ROOMS_ID.BEER] = new Room({
        id: ROOMS_ID.BEER,
        title: 'Пивнушка',
        description: 'Здесь можно встретить много знакомых лиц. 95% - твои одногруппники.',
        exit: [ROOMS_ID.STREET],
        img: 'img/rooms/beer.PNG',
        mus: 'music/shop.mp3'
    });

    /**********************/
    /* ОПИСАНИЕ ПРЕДМЕТОВ */
    /**********************/

    this.getRoomIds = function () { return ROOMS_ID; };
    this.getItemIds = function () { return ITEMS_ID; };
    this.getActions = function () { return ACTIONS; };
    this.getFuel = function () { return fuel; };
    this.getValueMoney = function () { return valueMoney; };
    this.getMonsterIds = function () { return MONSTERS_ID; };
    this.setValueMoney = function (value){
        valueMoney = value;
    };
    this.changeFuel = function (value) {
        value = value - 0;
        if ((fuel => 0) && (fuel <= 100)) {
            fuel += value;
            fuel = (fuel > 100) ? 100 : fuel;
            fuel = (fuel < 0) ? 0 : fuel;
        }
    };
    this.getRoom = function (id) {
        return (id && ROOM[id]) ? ROOM[id] : null;
    };

    this.getCurrentRoom = function () {
        if (currentRoom && ROOM[currentRoom]) {
            return ROOM[currentRoom];
        }
        return null;
    };

    this.setCurrentRoom = function (roomId) {
        if (roomId && ROOM[roomId]) {
            currentRoom = roomId;
            return ROOM[currentRoom];
        }
        return null;
    };

    this.getExits = function () {
        var room = ROOM[currentRoom];
        var exits = [];
        for (var i = 0; i < room.exit.length; i++) {
            if (ROOM[room.exit[i]]) {
                exits.push(ROOM[room.exit[i]]);
            }
        }
        return exits;
    };

    this.takeDown = function (i) {
        if (backpack[i].id === ITEMS_ID.PASS_CARD) {
            var index = ROOM[ROOMS_ID.KPP].exit.indexOf(ROOMS_ID.HALL);
            if (index > -1) {
                ROOM[ROOMS_ID.KPP].exit.splice(index, 1);
            }
        }
        backpack.splice(i, 1);
        //game.takeDown(game.getBackpack(), i);
        //fillRoom(struct.getCurrentRoom(), struct.getExits());
        //addBackpack();
    }

    this.getBackpack = function () {
        return backpack;
    };

    this.putInBackpack = function (item) {
        if (item) {
            backpack.push(item);
        }
    };
    this.createMonster = function (id) {
        switch (id) {
            case MONSTERS_ID.GOLOVIZIN: return new Monster({ id: MONSTERS_ID.GOLOVIZIN, title: 'Головизин', img: 'img/monsters/monster.png' });
            case MONSTERS_ID.RADIONOVA: return new Monster({ id: MONSTERS_ID.RADIONOVA, title: 'Радионова', img: 'img/monsters/monster.png' });
            case MONSTERS_ID.SHUDEGOV: return new Monster({ id: MONSTERS_ID.SHUDEGOV, title: 'Шудегов', img: 'img/monsters/monster.png' });
            case MONSTERS_ID.TARASOV: return new Monster({ id: MONSTERS_ID.TARASOV, title: 'Тарасов', img: 'img/monsters/monster.png' });
        }
        return null;
    };
    this.createItem = function(id, value) {
        switch (id) {
            case ITEMS_ID.BEER: return new Item({ id: ITEMS_ID.BEER, title: 'Пиво', img: 'img/items/Beer.png' });
            case ITEMS_ID.FOOD: return new Item({ id: ITEMS_ID.FOOD, title: 'Какая-то еда', img: 'img/items/Food.png' });
            case ITEMS_ID.PASS_CARD: return new Item({ id: ITEMS_ID.PASS_CARD, title: 'Пропуск', img: 'img/items/PassCard.png' });
            case ITEMS_ID.MONEY: 
                var money = new Item({ id: ITEMS_ID.MONEY, title: 'Баблишко', img: 'img/items/Money.png' });
                money.value = (value) ? value : Math.round(Math.random()*100);
                return money;
        }
        return null;
    };

    function init() {
        for(var key in ROOM){
            
        }

        for (var key in ITEMS_ID) {
            ACTIONS[ITEMS_ID[key]] = function (item, room) {};
        }
    }
    init();
}