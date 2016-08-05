"use strict";
var contact_1 = require('./contact');
var group_1 = require('./group');
var ContactGroup = (function () {
    function ContactGroup(id, contact, group) {
        if (contact === void 0) { contact = null; }
        if (group === void 0) { group = null; }
        this.id = id;
        this.contact = contact;
        this.group = group;
    }
    ContactGroup.fromJson = function (json) {
        if (!json)
            return;
        return new ContactGroup(json.id, new contact_1.Contact(json.contact_id), new group_1.Group(json.contact_group_id));
    };
    ContactGroup.prototype.toJson = function (stringify) {
        var doc = {
            id: this.id,
            contact_id: this.contact && this.contact.id,
            contact_group_id: this.group && this.group.id
        };
        return stringify ? JSON.stringify({ resource: [doc] }) : doc;
    };
    return ContactGroup;
}());
exports.ContactGroup = ContactGroup;
