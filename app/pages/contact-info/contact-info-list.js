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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var contact_info_1 = require('../../services/contact-info');
var base_http_1 = require('../../services/base-http');
var ContactInfoListCmp = (function () {
    function ContactInfoListCmp(contactInfoService, routeParams, router) {
        this.contactInfoService = contactInfoService;
        this.routeParams = routeParams;
        this.router = router;
        this.contactInfo = [];
        this.contactInfoFields = [
            { label: 'ID', key: 'id' },
            { label: 'Type', key: 'infoType', mobileShow: true },
            { label: 'Phone', key: 'phone' },
            { label: 'Email', key: 'email' },
            { label: 'Address', key: 'address' },
            { label: 'City', key: 'city' },
            { label: 'State', key: 'state' },
            { label: 'Country', key: 'country' },
        ];
        this.params = new http_1.URLSearchParams();
        this.params.set('filter', 'contact_id=' + routeParams.get('id'));
        this.getList();
    }
    ;
    ContactInfoListCmp.prototype.getList = function () {
        var self = this;
        this.contactInfoService.query(this.params)
            .subscribe(function (contactInfo) {
            self.contactInfo = contactInfo;
        });
    };
    ;
    ContactInfoListCmp.prototype.edit = function (id) {
        this.router.navigate(['/ContactInfo', { id: id, contactId: this.routeParams.get('id') }]);
    };
    ;
    ContactInfoListCmp.prototype.add = function () {
        this.router.navigate(['/NewContactInfo', { contactId: this.routeParams.get('id') }]);
    };
    ContactInfoListCmp.prototype.remove = function (id) {
        var self = this;
        this.contactInfoService.remove(id)
            .subscribe(function (id) {
            self.contactInfo = self.contactInfo.filter(function (item) { return item.id !== id; });
        });
    };
    ;
    ContactInfoListCmp = __decorate([
        core_1.Component({
            selector: 'contact-info-list',
            templateUrl: './components/contact-info/contact-info-list.html',
            styleUrls: ['./components/contact-info/contact-info.css'],
            providers: [contact_info_1.ContactInfoService, base_http_1.BaseHttpService],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [contact_info_1.ContactInfoService, (typeof (_a = typeof router_1.RouteParams !== 'undefined' && router_1.RouteParams) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], ContactInfoListCmp);
    return ContactInfoListCmp;
    var _a, _b;
}());
exports.ContactInfoListCmp = ContactInfoListCmp;
