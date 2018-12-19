function Game() {

    var struct = null;
    var logic = null;

    this.getCurrentRoom = function () {
        return struct.getCurrentRoom();
    };
    this.getValueMoney = function () {
        return struct.getValueMoney();
    };
    this.setValueMoney = function (value) {
        struct.setValueMoney(value);
    };
    this.goTo = function (id) {
        return logic.goTo(id);
    };
    this.getItemIds = function () {
        return struct.getItemIds();
    };
    this.getRoomIds = function () {
        return struct.getRoomIds();
    };
    this.getRoom = function (id) {
        return struct.getRoom(id);
    };
    this.getFuel = function () {
        return struct.getFuel();
    };
    this.changeFuel = function (value) {
        struct.changeFuel(value);
    };
    this.getExits = function () {
        return struct.getExits();
    };
    this.putInBackpack = function (item) {
        struct.putInBackpack(item);
    }
    this.getBackpack = function () {
        return struct.getBackpack();
    }
    this.deleteFromRoom = function(item){
        struct.deleteFromRoom(item);
    }
    this.takeDown = function (i) {
        struct.takeDown(i);//items.splice(i, 1);
    }
    this.useItem = function (i) {
        return logic.useItem(i);
    };
    function init() {
        struct = new Struct();
        logic = new Logic({ struct: struct });
    }
    init();
}

/*
var ACTION_ID = {
    PASS_CARD: 'PASS_CARD'
};

var ACTION = {};
ACTION[ACTION_ID.PASS_CARD] = function () { addExit(ROOMS_ID.LIFT); };


//backpack[ACTION_ID.PASS_CARD] = ACTION_ID.PASS_CARD
*/