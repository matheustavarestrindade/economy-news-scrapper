"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.log = function (message) {
        console.log("[LOG] ".concat(message));
    };
    Debug.info = function (message) {
        console.log("[INFO] ".concat(message));
    };
    Debug.error = function (message) {
        console.error("[ERROR] ".concat(message));
    };
    Debug.warn = function (message) {
        console.warn("[WARN] ".concat(message));
    };
    return Debug;
}());
exports.default = Debug;
