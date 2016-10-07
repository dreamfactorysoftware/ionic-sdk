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
var common_1 = require('@angular/common');
var contact_info_1 = require('../../models/contact-info');
var contact_info_2 = require('../../services/contact-info');
var base_http_1 = require('../../services/base-http');
var constants = require('../../config/constants');
var notification_1 = require('../../services/notification');
//import {BrowserDomAdapter} from '@angular/platform-browser';
var ionic_angular_1 = require('ionic-angular');
var ContactInfoCmp = (function () {
    function ContactInfoCmp(nav, navParams, formBuilder, contactInfoService, httpService, notificationService) {
        this.nav = nav;
        this.formBuilder = formBuilder;
        this.contactInfoService = contactInfoService;
        this.httpService = httpService;
        this.notificationService = notificationService;
        this.id = new common_1.Control('');
        this.address = new common_1.Control('', common_1.Validators.required);
        this.infoType = new common_1.Control('', common_1.Validators.required);
        this.city = new common_1.Control('', common_1.Validators.required);
        this.state = new common_1.Control('', common_1.Validators.required);
        this.country = new common_1.Control('', common_1.Validators.required);
        this.email = new common_1.Control('', common_1.Validators.required);
        this.phone = new common_1.Control('', common_1.Validators.required);
        this.zip = new common_1.Control('', common_1.Validators.required);
        this.infoTypes = ['home', 'work', 'mobile'];
        this.contactInfo = new contact_info_1.ContactInfo();
        var id = navParams.get('id');
        this.contactInfo.contactId = navParams.get('contactId');
        if (id) {
            console.log('if');
            var self_1 = this;
            contactInfoService
                .get(id)
                .subscribe(function (contactInfo) { return self_1.contactInfo = contactInfo; });
        }
        else {
            console.log('else', navParams);
        }
        this.form = this.formBuilder.group({
            address: this.address,
            infoType: this.infoType,
            city: this.city,
            state: this.state,
            country: this.country,
            email: this.email,
            phone: this.phone,
            zip: this.zip
        });
    }
    ;
    ContactInfoCmp.prototype.add = function (event) {
        this.nav.push(ContactInfoCmp, { contactId: this.contactInfo.contactId, animate: false });
    };
    ContactInfoCmp.prototype.save = function () {
        var _this = this;
        if (this.form.valid) {
            var self = this;
            if (this.contactInfo.id) {
                this.httpService.http.patch(constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/db/_table/contact_info', this.contactInfo.toJson(true))
                    .subscribe(function (data) {
                    self.notificationService.show('Success', 'Contact Info Updated!');
                    //self.back();
                });
            }
            else {
                delete this.contactInfo.id;
                this.httpService.http.post(constants.DREAMFACTORY_INSTANCE_URL + '/api/v2/db/_table/contact_info/', this.contactInfo.toJson(true))
                    .subscribe(function (data) {
                    _this.notificationService.show('Success', 'New Contact Info Created!');
                    //self.back();
                });
            }
        }
    };
    ;
    ContactInfoCmp.prototype.back = function () {
        this.nav.pop();
    };
    ;
    ContactInfoCmp = __decorate([
        core_1.Component({
            selector: 'contact-info',
            templateUrl: './build/pages/contact-info/contact-info.html',
            //styleUrls: ['./components/contact-info/contact-info.css'],
            providers: [contact_info_2.ContactInfoService, base_http_1.BaseHttpService, notification_1.NotificationService, common_1.FormBuilder],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, common_1.FormBuilder, contact_info_2.ContactInfoService, base_http_1.BaseHttpService, notification_1.NotificationService])
    ], ContactInfoCmp);
    return ContactInfoCmp;
}());
exports.ContactInfoCmp = ContactInfoCmp;
