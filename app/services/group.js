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
var group_1 = require('../models/group');
var constants = require('../config/constants');
var base_http_1 = require('./base-http');
require('rxjs/add/operator/map');
var contact_1 = require('./contact');
var ServerResponse = (function () {
    function ServerResponse(resource) {
        this.resource = resource;
    }
    return ServerResponse;
}());
;
var GroupService = (function () {
    function GroupService(httpService, contactService) {
        this.httpService = httpService;
        this.contactService = contactService;
        this.baseResourceUrl = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/db/_table/contact_group';
        this.contactGroupUrl = constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/db/_table/contact_group_relationship';
    }
    ;
    GroupService.prototype.query = function (params) {
        return this.httpService.http
            .get(this.baseResourceUrl, { search: params })
            .map(function (response) {
            var result = response.json();
            var groups = [];
            result.resource.forEach(function (group) {
                groups.push(group_1.Group.fromJson(group));
            });
            return groups;
        });
    };
    ;
    GroupService.prototype.get = function (id) {
        return this.httpService.http
            .get(this.baseResourceUrl + '/' + id)
            .map(function (response) {
            var result = response.json();
            var group = group_1.Group.fromJson(result);
            return group;
        });
    };
    ;
    GroupService.prototype.remove = function (id) {
        return this.httpService.http
            .delete(this.baseResourceUrl + '/' + id)
            .map(function (response) {
            var result = response.json();
            return result.id;
        });
    };
    GroupService.prototype.save = function (group) {
        if (group.id) {
            return this.httpService.http.patch(this.baseResourceUrl, group.toJson(true))
                .map(function (response) {
                return response;
            });
        }
        else {
            return this.httpService.http.post(this.baseResourceUrl, group.toJson(true))
                .map(function (response) {
                return response;
            });
        }
    };
    GroupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [base_http_1.BaseHttpService, contact_1.ContactService])
    ], GroupService);
    return GroupService;
}());
exports.GroupService = GroupService;
