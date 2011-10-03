var subdeps = require('../');
var deps = subdeps.sync('/a.js', { sources : {
    '/a.js' : "var b = require('./b');",
    '/b.js' : "var c = require('f')",
    '/c.js' : "var d = require('./lib/d.js')",
    '/lib/d.js' : "var e = require('e');",
    '/node_modules/e/index.js' : '55',
    '/node_modules/f/beep.js' : '"boop"',
    '/node_modules/f/package.json' : JSON.stringify({ main : "beep.js" })
} });
console.dir(deps);
