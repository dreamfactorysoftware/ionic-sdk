"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var constants = require('./constants');
var DfRequestOptions = (function (_super) {
    __extends(DfRequestOptions, _super);
    function DfRequestOptions() {
        _super.call(this);
        this.headers.set('X-Dreamfactory-API-Key', constants.DSP_API_KEY);
        var token = localStorage.getItem('session_token');
        if (token) {
            this.headers.set('X-Dreamfactory-Session-Token', token);
        }
    }
    return DfRequestOptions;
}(http_1.BaseRequestOptions));
exports.DfRequestOptions = DfRequestOptions;
