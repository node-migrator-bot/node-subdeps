var resolve = require('resolve');
var detective = require('detective');

var fs = require('fs');
var path = require('path');

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
        var dirname = path.dirname(file);
        
        var src = opts.readFileSync(file);
        detective(src).forEach(function (dep) {
            opts.basedir = dirname;
            var resolved = resolve.sync(dep, opts);
            walk(resolved);
        });
    })(filename);
    
    return Object.keys(walked);
};
