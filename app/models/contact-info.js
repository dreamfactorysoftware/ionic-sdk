"use strict";
(function (ContactInfoTypes) {
    ContactInfoTypes[ContactInfoTypes["home"] = 0] = "home";
    ContactInfoTypes[ContactInfoTypes["work"] = 1] = "work";
    ContactInfoTypes[ContactInfoTypes["mobile"] = 2] = "mobile";
})(exports.ContactInfoTypes || (exports.ContactInfoTypes = {}));
var ContactInfoTypes = exports.ContactInfoTypes;
var ContactInfo = (function () {
    function ContactInfo(id, contactId, address, city, state, zip, country, email, infoType, phone) {
        if (id === void 0) { id = null; }
        if (contactId === void 0) { contactId = null; }
        if (address === void 0) { address = null; }
        if (city === void 0) { city = null; }
        if (state === void 0) { state = null; }
        if (zip === void 0) { zip = null; }
        if (country === void 0) { country = null; }
        if (email === void 0) { email = null; }
        if (infoType === void 0) { infoType = null; }
        if (phone === void 0) { phone = null; }
        this.id = id;
        this.contactId = contactId;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.email = email;
        this.infoType = infoType;
        this.phone = phone;
    }
    ContactInfo.fromJson = function (json) {
        if (!json)
            return;
        return new ContactInfo(json.id, json.contact_id, json.address, json.city, json.state, json.zip, json.country, json.email, json.info_type, json.phone);
    };
    ContactInfo.prototype.toJson = function (stringify) {
        var doc = {
            id: this.id,
            contact_id: this.contactId,
            address: this.address,
            city: this.city,
            state: this.state,
            zip: this.zip,
            country: this.country,
            email: this.email,
            info_type: this.infoType,
            phone: this.phone
        };
        return stringify ? JSON.stringify({ resource: [doc] }) : doc;
    };
    return ContactInfo;
}());
exports.ContactInfo = ContactInfo;
