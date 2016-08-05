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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
require('rxjs/add/operator/map');
var ionic_angular_1 = require('ionic-angular');
var NotificationService = (function () {
    function NotificationService(document, nav) {
        this.document = document;
        this.nav = nav;
    }
    NotificationService.prototype.show = function (type, content) {
        var _this = this;
        var alert = ionic_angular_1.Alert.create({
            title: type,
            subTitle: content,
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        var navTransition = alert.dismiss();
                        navTransition.then(function () {
                            _this.nav.pop();
                        });
                        return false;
                    }
                }]
        });
        this.nav.present(alert);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, ionic_angular_1.NavController])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
