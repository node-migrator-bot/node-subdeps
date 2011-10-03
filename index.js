var resolve = require('resolve');
var detective = require('detective');
var fs = require('fs');

exports.sync = function (filename, opts) {
    if (!opts) opts = {};
    if (!opts.isFile && opts.sources) {
        opts.isFile = function (file) {
            return opts.sources.hasOwnProperty(file)
        };
    }
    if (!opts.readFileSync) {
        opts.readFileSync = opts.sources
            ? function (file) { return opts.sources[file] }
            : fs.readFileSync
        ;
    }
    
    var walked = {};
    (function walk (file) {
        if (walked[file]) return;
        walked[file] = true;
        
        var src = opts.readFileSync(file);
        detective(src).forEach(function (dep) {
            var resolved = resolve.sync(dep, opts);
            walk(resolved);
        });
    })(filename);
    
    return Object.keys(walked);
};
