"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var nodemon = require("nodemon");
var NgRunNodemon = /** @class */ (function () {
    function NgRunNodemon(context) {
        this.context = context;
    }
    NgRunNodemon.prototype.run = function (builderConfig) {
        var _this = this;
        var options = builderConfig.options;
        var nodemonConfig = {
            script: options.script,
            exec: "ts-node --project " + options.tsConfig,
            ext: options.ext || 'ts,json',
            ignore: options.ignore || [],
            watch: options.watch || [],
            verbose: options.verbose || false,
        };
        return new rxjs_1.Observable(function (obs) {
            nodemon(nodemonConfig)
                .on('log', function (msg) { return _this.context.logger.info(msg.colour); })
                .on('quit', function () {
                obs.next({ success: true });
                obs.complete();
            });
        });
    };
    return NgRunNodemon;
}());
exports.NgRunNodemon = NgRunNodemon;
exports.default = NgRunNodemon;
//# sourceMappingURL=index.js.map