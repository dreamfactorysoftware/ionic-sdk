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
var base_http_1 = require('../../services/base-http');
var group_1 = require('../../services/group');
var contact_1 = require('../../services/contact');
var ionic_angular_1 = require('ionic-angular');
var group_2 = require('../group/group');
var GroupListCmp = (function () {
    function GroupListCmp(groupService, nav, navParams) {
        this.groupService = groupService;
        this.nav = nav;
        this.groups = [];
        this.shadowImage = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.png';
        this.getList();
    }
    GroupListCmp.prototype.getList = function () {
        var self = this;
        var params = new http_1.URLSearchParams();
        params.set('order', 'name+ASC');
        this.groupService.query(params)
            .subscribe(function (groups) {
            self.groups = groups;
        });
    };
    GroupListCmp.prototype.remove = function (groupId) {
        var self = this;
        this.groupService.remove(groupId)
            .subscribe(function () {
            self.groups = self.groups.filter(function (item) {
                return item.id != groupId;
            });
        });
    };
    GroupListCmp.prototype.show = function (groupId) {
        this.nav.push(group_2.GroupCmp, { id: groupId });
    };
    GroupListCmp = __decorate([
        core_1.Component({
            selector: 'group-list',
            templateUrl: 'build/pages/group/group-list.html',
            providers: [group_1.GroupService, contact_1.ContactService, base_http_1.BaseHttpService],
            directives: []
        }), 
        __metadata('design:paramtypes', [group_1.GroupService, ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], GroupListCmp);
    return GroupListCmp;
}());
exports.GroupListCmp = GroupListCmp;
