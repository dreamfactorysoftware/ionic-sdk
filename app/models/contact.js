"use strict";
var Contact = (function () {
    function Contact(id, firstName, lastName, image, skype, twitter, notes) {
        if (id === void 0) { id = null; }
        if (firstName === void 0) { firstName = ''; }
        if (lastName === void 0) { lastName = ''; }
        if (image === void 0) { image = ''; }
        if (skype === void 0) { skype = ''; }
        if (twitter === void 0) { twitter = ''; }
        if (notes === void 0) { notes = ''; }
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.skype = skype;
        this.twitter = twitter;
        this.notes = notes;
    }
    Contact.fromJson = function (json) {
        if (!json)
            return;
        return new Contact(json.id, json.first_name, json.last_name, json.image_url, json.skype, json.twitter, json.notes);
    };
    Contact.prototype.toJson = function (stringify) {
        var doc = {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            image_url: this.image,
            skype: this.skype,
            twitter: this.twitter,
            notes: this.notes
        };
        return stringify ? JSON.stringify({ resource: [doc] }) : doc;
    };
    return Contact;
}());
exports.Contact = Contact;
