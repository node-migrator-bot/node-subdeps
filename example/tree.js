var subdeps = require('../');
var deps = subdeps.sync(__dirname + '/tree/start.js');
console.dir(deps);
