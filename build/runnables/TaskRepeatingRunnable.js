"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskRepeatingRunnable = /** @class */ (function () {
    function TaskRepeatingRunnable(startDelay, timeout) {
        var _this = this;
        if (startDelay > 0) {
            setTimeout(function () {
                _this.run();
                setInterval(function () {
                    _this.run();
                }, timeout);
            }, startDelay);
        }
        else {
            this.run();
            setInterval(function () {
                _this.run();
            }, timeout);
        }
    }
    return TaskRepeatingRunnable;
}());
exports.default = TaskRepeatingRunnable;
