"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('angular2/core');
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () {
        this.res.forEach(function (error) {
            console.error(error);
        });
    };
    ;
    return _ArrayLogger;
}());
var CustomExceptionHandler = (function (_super) {
    __extends(CustomExceptionHandler, _super);
    function CustomExceptionHandler() {
        _super.call(this, new _ArrayLogger(), true);
    }
    CustomExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
        if (~[401, 404].indexOf(exception.status)) {
            window.location.hash = '/login';
        }
        else {
            _super.prototype.call.call(this, exception, stackTrace, reason);
        }
    };
    return CustomExceptionHandler;
}(core_1.ExceptionHandler));
exports.CustomExceptionHandler = CustomExceptionHandler;
