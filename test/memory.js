var test = require('tap').test;
var subdeps = require('../');

test('memory', function (t) {
    var deps = subdeps.sync('/a.js', { sources : {
        '/a.js' : "var b = require('./b');",
        '/b.js' : "var c = require('./c')",
        '/c.js' : "var d = require('./lib/d.js'); var f = require('f');",
        '/lib/d.js' : "var e = require('e');",
        '/node_modules/e/index.js' : '55',
        '/node_modules/f/beep.js' : '"boop"',
        '/node_modules/f/package.json' : JSON.stringify({ main : "beep.js" })
    } }).sort();
    
    t.deepEqual(deps, [
        '/a.js',
        '/b.js',
        '/c.js',
        '/lib/d.js',
        '/node_modules/e/index.js',
        '/node_modules/f/beep.js'
    ].sort());
    
    t.end();
});
