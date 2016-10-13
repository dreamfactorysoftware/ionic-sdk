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
var contact_group_1 = require('../models/contact-group');
var constants = require('../config/constants');
var base_http_1 = require('./base-http');
var contact_1 = require('./contact');
var group_1 = require('./group');
require('rxjs/add/operator/map');
var ServerResponse = (function () {
    function ServerResponse(resource) {
        this.resource = resource;
    }
    return ServerResponse;
}());
;
var ContactGroupService = (function () {
    function ContactGroupService(httpService, contactService, groupService) {
        this.httpService = httpService;
        this.contactService = contactService;
        this.groupService = groupService;
        this.baseResourceUrl = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/db/_table/contact_group_relationship';
    }
    ;
    ContactGroupService.prototype.query = function (params, includeContacts, includeGroups) {
        if (includeContacts === void 0) { includeContacts = false; }
        if (includeGroups === void 0) { includeGroups = false; }
        var self = this;
        return this.httpService.http
            .get(this.baseResourceUrl, { search: params })
            .map(function (response) {
            var result = response.json();
            return result.resource.map(function (item) {
                return contact_group_1.ContactGroup.fromJson(item);
            });
        })
            .map(function (contactGroups) {
            var params = new http_1.URLSearchParams();
            params.set('fields', 'first_name, last_name');
            contactGroups.map(function (contactGroup) {
                if (includeContacts) {
                    self.contactService.get(contactGroup.contact.id, params)
                        .subscribe(function (contact) {
                        contact.id = contactGroup.contact.id;
                        contactGroup.contact = contact;
                    });
                }
                if (includeGroups) {
                    self.groupService.get(contactGroup.group.id)
                        .subscribe(function (group) {
                        group.id = contactGroup.group.id;
                        contactGroup.group = group;
                    });
                }
            });
            return contactGroups;
        });
    };
    ;
    ContactGroupService.prototype.addGroup = function (groupId, contactId) {
        var data = [
            { contact_id: contactId, contact_group_id: groupId }
        ];
        return this.httpService.http
            .post(this.baseResourceUrl, JSON.stringify(data))
            .map(function (response) {
            var result = response.json();
            return result.resource[0];
        });
    };
    ;
    ContactGroupService.prototype.remove = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('filter', 'id=' + id);
        return this.httpService.http
            .delete(this.baseResourceUrl, { search: params })
            .map(function (response) {
            var result = response.json();
            return parseInt(result.id);
        });
    };
    ;
    ContactGroupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [base_http_1.BaseHttpService, contact_1.ContactService, group_1.GroupService])
    ], ContactGroupService);
    return ContactGroupService;
}());
exports.ContactGroupService = ContactGroupService;
