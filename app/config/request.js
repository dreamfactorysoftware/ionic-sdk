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
var constants = require('./constants');
var DfRequest = (function () {
    function DfRequest(http) {
        this.http = http;
    }
    DfRequest.prototype._request = function (url, options) {
        var request;
        if (typeof url === 'string') {
            options = options || { headers: new http_1.Headers() };
        }
        else {
            var req = url;
            req.headers = req.headers || new http_1.Headers();
            req.headers.set('X-DreamFactory-API-Key', constants.DSP_API_KEY);
            request = this.http.request(req);
        }
        return request;
    };
    DfRequest = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DfRequest);
    return DfRequest;
}());
exports.DfRequest = DfRequest;
