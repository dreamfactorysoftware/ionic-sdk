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
//import {RouteParams, Router} from '@angular/router';
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var group_1 = require('../../models/group');
var contact_group_1 = require('../../models/contact-group');
var group_2 = require('../../services/group');
var contact_1 = require('../../services/contact');
var contact_group_2 = require('../../services/contact-group');
var base_http_1 = require('../../services/base-http');
var ionic_angular_1 = require('ionic-angular');
var GroupCmp = (function () {
    function GroupCmp(groupService, contactService, contactGroupService, formBuilder, nav, navParams) {
        this.groupService = groupService;
        this.contactService = contactService;
        this.contactGroupService = contactGroupService;
        this.formBuilder = formBuilder;
        this.nav = nav;
        this.id = new common_1.Control('');
        this.name = new common_1.Control('', common_1.Validators.required);
        this.selectedContactId = null;
        this.group = new group_1.Group();
        this.contactGroups = [];
        this.remainingContacts = [];
        var groupId = navParams.get('id');
        if (groupId) {
            var self_1 = this;
            var contactGroupParams = new http_1.URLSearchParams();
            contactGroupParams.set('filter', 'contact_group_id=' + groupId);
            groupService
                .get(groupId)
                .subscribe(function (group) { return self_1.group = group; });
            contactGroupService
                .query(contactGroupParams, true)
                .subscribe(function (contactGroups) {
                self_1.contactGroups = contactGroups;
                self_1.getRemainingContacts();
            });
        }
        this.form = this.formBuilder.group({
            name: this.name
        });
    }
    GroupCmp.prototype.back = function () {
        this.nav.pop();
    };
    GroupCmp.prototype.getRemainingContacts = function () {
        var self = this;
        this.contactService
            .query()
            .subscribe(function (contacts) {
            self.remainingContacts = contacts.filter(function (item) {
                return !self.contactGroups.some(function (a) {
                    return a.group.id == item.id;
                });
            });
        });
    };
    GroupCmp.prototype.addSelectedContact = function () {
        if (!this.selectedContactId)
            return;
        var self = this;
        var contact = this.remainingContacts.filter(function (item) {
            return item.id == self.selectedContactId;
        })[0];
        this.contactGroupService.addGroup(this.group.id, contact.id)
            .subscribe(function (response) {
            var newContactGroup = new contact_group_1.ContactGroup(response.id);
            newContactGroup.contact = contact;
            self.remainingContacts = self.remainingContacts.filter(function (item) {
                return item.id !== contact.id;
            });
            self.contactGroups.unshift(newContactGroup);
            self.selectedContactId = null;
        });
    };
    GroupCmp.prototype.removeContact = function (id) {
        var self = this;
        this.contactGroupService
            .remove(id)
            .subscribe(function () {
            self.contactGroups = self.contactGroups.filter(function (item) {
                return item.id !== id;
            });
        });
    };
    ;
    GroupCmp.prototype.save = function () {
        var self = this;
        this.groupService.save(this.group)
            .subscribe(function (response) {
            self.back();
        });
    };
    GroupCmp = __decorate([
        core_1.Component({
            selector: 'group',
            templateUrl: 'build/pages/group/group.html',
            //styleUrls: ['./components/group/group.css'],
            providers: [group_2.GroupService, contact_group_2.ContactGroupService, contact_1.ContactService, base_http_1.BaseHttpService],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [group_2.GroupService, contact_1.ContactService, contact_group_2.ContactGroupService, common_1.FormBuilder, ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], GroupCmp);
    return GroupCmp;
}());
exports.GroupCmp = GroupCmp;
