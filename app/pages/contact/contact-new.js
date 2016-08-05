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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var contact_1 = require('../../models/contact');
var contact_2 = require('../../services/contact');
var contact_group_1 = require('../../models/contact-group');
var base_http_1 = require('../../services/base-http');
var notification_1 = require('../../services/notification');
var ionic_angular_1 = require('ionic-angular');
var contact_group_2 = require('../../services/contact-group');
var group_1 = require('../../services/group');
var ContactCmp = (function () {
    function ContactCmp(contactService, navParams, groupService, contactGroupService, router, formBuilder, httpService, notificationService) {
        this.contactService = contactService;
        this.groupService = groupService;
        this.contactGroupService = contactGroupService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.httpService = httpService;
        this.notificationService = notificationService;
        this.contact = new contact_1.Contact();
        this.contactGroups = [];
        this.remainingGroups = [];
        this.selectedGroupId = null;
        var contactId = navParams.get('id');
        if (contactId) {
            var self_1 = this;
            var contactGroupParams = new http_1.URLSearchParams();
            contactGroupParams.set('filter', 'contact_id=' + contactId);
            contactService
                .get(contactId)
                .subscribe(function (contact) { return self_1.contact = contact; });
            contactGroupService
                .query(contactGroupParams, false, true)
                .subscribe(function (contactGroups) {
                self_1.contactGroups = contactGroups;
                self_1.getRemainingGroups();
            });
        }
        this.contactForm = formBuilder.group({
            'firstName': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(6)])],
            'lastName': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(4)])],
            'imageUrl': this.imageUrl,
            'skype': this.skype,
            'twitter': this.twitter,
            'notes': this.notes
        });
        this.firstName = this.contactForm.controls['firstName'];
        this.lastName = this.contactForm.controls['lastName'];
        this.imageUrl = this.contactForm.controls['imageUrl'];
        this.skype = this.contactForm.controls['skype'];
        this.twitter = this.contactForm.controls['twitter'];
        this.notes = this.contactForm.controls['notes'];
    }
    ;
    ContactCmp.prototype.getRemainingGroups = function () {
        var self = this;
        this.groupService
            .query()
            .subscribe(function (groups) {
            self.remainingGroups = groups.filter(function (item) {
                return !self.contactGroups.some(function (a) {
                    return a.group.id == item.id;
                });
            });
        });
    };
    ContactCmp.prototype.addSelectedGroup = function () {
        if (!this.selectedGroupId)
            return;
        var self = this;
        var group = this.remainingGroups.filter(function (item) {
            return item.id == self.selectedGroupId;
        })[0];
        this.contactGroupService.addGroup(group.id, this.contact.id)
            .subscribe(function (response) {
            var newContactGroup = new contact_group_1.ContactGroup(response.id);
            newContactGroup.group = group;
            self.remainingGroups = self.remainingGroups.filter(function (item) {
                return item.id !== group.id;
            });
            self.contactGroups.push(newContactGroup);
            self.selectedGroupId = null;
        });
    };
    ;
    ContactCmp.prototype.removeGroup = function (contactGroup) {
        var self = this;
        this.contactGroupService
            .remove(contactGroup.id)
            .subscribe(function (item) {
            self.contactGroups = self.contactGroups.filter(function (item) {
                return item.id !== contactGroup.id;
            });
            self.remainingGroups.push(contactGroup.group);
        });
    };
    ContactCmp.prototype.save = function () {
        var _this = this;
        if (this.contactForm.valid) {
            var self = this;
            delete this.contact.id;
            this.contactService.save(this.contact)
                .subscribe(function (response) {
                _this.notificationService.show('Success', 'Contact created!');
            });
        }
    };
    ContactCmp.prototype.back = function () {
        this.nav.pop();
    };
    ;
    ContactCmp = __decorate([
        core_1.Component({
            selector: 'contact',
            templateUrl: './build/pages/contact/contact.html',
            providers: [contact_2.ContactService, base_http_1.BaseHttpService, contact_group_2.ContactGroupService, group_1.GroupService, base_http_1.BaseHttpService, notification_1.NotificationService, common_1.FormBuilder],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [contact_2.ContactService, ionic_angular_1.NavParams, group_1.GroupService, contact_group_2.ContactGroupService, router_1.Router, common_1.FormBuilder, base_http_1.BaseHttpService, notification_1.NotificationService])
    ], ContactCmp);
    return ContactCmp;
}());
exports.ContactCmp = ContactCmp;
