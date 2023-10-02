"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    DateUtils.getFormattedDateString = function (date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return "".concat(day, "/").concat(month, "/").concat(year);
    };
    DateUtils.getFormattedDateStringWithHoursAndMinutes = function (date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hours, ":").concat(minutes);
    };
    return DateUtils;
}());
exports.default = DateUtils;
