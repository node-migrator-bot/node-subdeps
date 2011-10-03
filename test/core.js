var test = require('tap').test;
var subdeps = require('../');

test('memory', function (t) {
    var deps = subdeps.sync('/a.js', { sources : {
        '/a.js' : "var b = require('./b');",
        '/b.js' : "var EventEmitter = require('events').EventEmitter"
    } });
    
    t.deepEqual(deps, [ '/a.js', '/b.js', 'events' ]);
    
    t.end();
});
