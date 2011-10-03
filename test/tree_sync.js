var test = require('tap').test;
var subdeps = require('../');

test('synchronous tree', function (t) {
    var deps = subdeps.sync(__dirname + '/tree/a.js').sort();
    
    t.deepEqual(deps, [
        __dirname + '/tree/a.js',
        __dirname + '/tree/b.js',
        __dirname + '/tree/c.js',
        __dirname + '/tree/lib/d.js',
        __dirname + '/tree/node_modules/e/index.js',
        __dirname + '/tree/node_modules/f/beep.js'
        
    ].sort());
    
    t.end();
});
