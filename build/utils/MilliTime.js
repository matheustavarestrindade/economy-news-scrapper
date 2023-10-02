"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MilliTime = /** @class */ (function () {
    function MilliTime() {
    }
    MilliTime.SECOND = 1000;
    MilliTime.MINUTE = 60 * MilliTime.SECOND;
    MilliTime.HOUR = 60 * MilliTime.MINUTE;
    MilliTime.DAY = 24 * MilliTime.HOUR;
    MilliTime.WEEK = 7 * MilliTime.DAY;
    MilliTime.MONTH = 30 * MilliTime.DAY;
    MilliTime.YEAR = 365 * MilliTime.DAY;
    return MilliTime;
}());
exports.default = MilliTime;
