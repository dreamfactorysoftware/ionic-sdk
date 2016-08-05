"use strict";
var Group = (function () {
    function Group(id, name) {
        if (id === void 0) { id = null; }
        if (name === void 0) { name = null; }
        this.id = id;
        this.name = name;
    }
    Group.fromJson = function (json) {
        if (!json)
            return;
        return new Group(json.id, json.name);
    };
    Group.prototype.toJson = function (stringify) {
        var doc = {
            id: this.id,
            name: this.name
        };
        return stringify ? JSON.stringify({ resource: [doc] }) : doc;
    };
    return Group;
}());
exports.Group = Group;
