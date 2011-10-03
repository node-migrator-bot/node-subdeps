var test = require('tap').test;
var subdeps = require('../');

test('core', function (t) {
    var depsInc = subdeps.sync('/a.js', {
        sources : {
            '/a.js' : "var b = require('./b');",
            '/b.js' : "var EventEmitter = require('events').EventEmitter"
        },
        core : true
    });
    t.deepEqual(depsInc, [ '/a.js', '/b.js', 'events' ]);
    
    var depsEx = subdeps.sync('/a.js', {
        sources : {
            '/a.js' : "var b = require('./b');",
            '/b.js' : "var EventEmitter = require('events').EventEmitter"
        }
    });
    t.deepEqual(depsEx, [ '/a.js', '/b.js' ]);
    
    t.end();
});
