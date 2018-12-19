function Logic(options) {
    options = (options instanceof Object) ? options : {};
    var struct = options.struct;

    var ROOMS_ID = struct.getRoomIds();
    var ITEMS_ID = struct.getItemIds();
    var MONSTERS_ID = struct.getMonsterIds();
    var ACTIONS  = struct.getActions();

    function passCard(item, room) {
        if (item.id === ITEMS_ID.PASS_CARD && room.id === ROOMS_ID.KPP) {
            if (!(room.exit.indexOf(ROOMS_ID.HALL) + 1)) {
                room.exit.push(ROOMS_ID.HALL);
            }
            return true;
        }
        return false;
    }

    function eat(item, room) {
        if (item.id === ITEMS_ID.FOOD && !(room.id === ROOMS_ID.CLOSET)) {
            struct.changeFuel('10');
            var i = struct.getBackpack().indexOf(item);
            struct.takeDown(i);
            return true;
        } else {
            if (item.id === ITEMS_ID.FOOD && room.id === ROOMS_ID.CLOSET) {
                struct.changeFuel('-50');
                var i = struct.getBackpack().indexOf(item);
                struct.takeDown(i);
                return true;
            }
            return false;
        }
        return false;
    }

    // срандомить и вернуть предметы в комнате
    function genItems(roomId) {
        var items = [];
        while (1) {
            if (Math.random() > 0.2) {
                var id;
                switch (Math.floor(Math.random()*4)) {
                    case 0 : id = ITEMS_ID.BEER; break;
                    case 1 : id = ITEMS_ID.PASS_CARD; break;
                    case 2 : id = ITEMS_ID.FOOD; break;
                    case 3 : id = ITEMS_ID.MONEY; break;
                    default: id = ITEMS_ID.BEER; break;
                }
                items.push(struct.createItem(id));
            } else {
                break;
            }
        }
        return items;
    }
    function genMonster(roomId) {
        if (Math.random() > 0.2) {
            switch (Math.floor(Math.random() * 4)) {
                case 0: return struct.createMonster(MONSTERS_ID.GOLOVIZIN); break;
                case 1: return struct.createMonster(MONSTERS_ID.RADIONOVA); break;
                case 2: return struct.createMonster(MONSTERS_ID.SHUDEGOV); break;
                case 3: return struct.createMonster(MONSTERS_ID.TARASOV); break;
                default: return struct.createMonster(MONSTERS_ID.GOLOVIZIN); break;
            }
        }
    }
    this.goTo = function (id) {
        if (id && struct.getRoom(id)) {
            var room = struct.setCurrentRoom(id);
            if (room) {
                room.items = genItems(id);
                room.monster = genMonster(id);
            }
            return room;
        }
        return null;
    };

    this.useItem = function (i) {
        var items = struct.getBackpack();
        var item = items[i];
        if (item && ACTIONS[item.id] instanceof Function) {
            return ACTIONS[item.id](item, struct.getCurrentRoom());
        }
        return false;
    };

    function init() {
        ACTIONS[ITEMS_ID.PASS_CARD] = passCard;
        ACTIONS[ITEMS_ID.FOOD] = eat;

        // start point
        struct.setCurrentRoom(ROOMS_ID.ROOM);
    }
    init();
}