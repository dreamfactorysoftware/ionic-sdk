"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var contact_1 = require('../../services/contact');
var base_http_1 = require('../../services/base-http');
var ionic_angular_1 = require('ionic-angular');
var contact_info_1 = require('../contact-info/contact-info');
var contact_new_1 = require('../contact/contact-new');
var ContactListCmp = (function () {
    function ContactListCmp(contactService, nav, navParams) {
        this.contactService = contactService;
        this.nav = nav;
        this.contacts = [];
        this.shadowImage = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.png';
        this.getList();
    }
    ContactListCmp.prototype.getList = function () {
        var self = this;
        var params = new http_1.URLSearchParams();
        params.set('order', 'last_name+ASC');
        self.contactService.query(params)
            .subscribe(function (contacts) {
            self.contacts = contacts;
        });
    };
    ContactListCmp.prototype.show = function (event, contactId) {
        this.nav.push(contact_info_1.ContactInfoCmp, { id: contactId, animate: false });
    };
    ContactListCmp.prototype.createContact = function (event) {
        this.nav.push(contact_new_1.ContactCmp, { animate: false });
    };
    ContactListCmp.prototype.remove = function (contactId) {
        var self = this;
        this.contactService.remove(contactId)
            .subscribe(function () {
            self.contacts = self.contacts.filter(function (item) {
                return item.id != contactId;
            });
        });
    };
    ContactListCmp = __decorate([
        core_1.Component({
            selector: 'contact-list',
            templateUrl: 'build/pages/contact-list/contact-list.html',
            providers: [contact_1.ContactService, base_http_1.BaseHttpService],
            directives: []
        }), 
        __metadata('design:paramtypes', [contact_1.ContactService, ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], ContactListCmp);
    return ContactListCmp;
}());
exports.ContactListCmp = ContactListCmp;
