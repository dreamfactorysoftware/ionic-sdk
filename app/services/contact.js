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
var contact_1 = require('../models/contact');
var constants = require('../config/constants');
var base_http_1 = require('./base-http');
require('rxjs/add/operator/map');
var ServerObj = (function () {
    function ServerObj(resource) {
        this.resource = resource;
    }
    return ServerObj;
}());
;
var ContactService = (function () {
    function ContactService(httpService) {
        this.httpService = httpService;
        this.baseResourceUrl = constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact';
    }
    ;
    ContactService.prototype.query = function (params) {
        return this.httpService.http
            .get(this.baseResourceUrl, { search: params })
            .map(function (response) {
            var result = response.json();
            var contacts = [];
            result.resource.forEach(function (contact) {
                contacts.push(contact_1.Contact.fromJson(contact));
            });
            return contacts;
        });
    };
    ;
    ContactService.prototype.get = function (id, params) {
        return this.httpService.http
            .get(this.baseResourceUrl + '/' + id, { search: params })
            .map(function (response) {
            var result = response.json();
            var contact = contact_1.Contact.fromJson(result);
            return contact;
        });
    };
    ;
    ContactService.prototype.remove = function (id) {
        return this.httpService.http
            .delete(this.baseResourceUrl + '/' + id)
            .map(function (response) {
            var result = response.json();
            return result.id;
        });
    };
    ContactService.prototype.save = function (contact) {
        if (contact.id) {
            return this.httpService.http.patch(constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact', contact.toJson(true))
                .map(function (data) {
                return data;
            });
        }
        else {
            return this.httpService.http.post(constants.DSP_INSTANCE_URL + '/api/v2/db/_table/contact', contact.toJson(true))
                .map(function (data) {
                return data;
            });
        }
    };
    ContactService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [base_http_1.BaseHttpService])
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;
