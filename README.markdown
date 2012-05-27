subdeps
=======

Trace the dependency graph of a javascript file using
[detective](https://github.com/substack/node-detective) and
[resolve](https://github.com/substack/node-resolve).

[![build status](https://secure.travis-ci.org/substack/node-subdeps.png)](http://travis-ci.org/substack/node-subdeps)

examples
========

tree.js
-------

````javascript
var subdeps = require('../');
var deps = subdeps.sync(__dirname + '/tree/start.js');
console.dir(deps);
````

output:

````
substack : node-subdeps $ node example/tree.js 
[ '/home/substack/projects/node-subdeps/example/tree/start.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/index.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/node_modules/burrito/index.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/node_modules/burrito/node_modules/uglify-js/uglify-js.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/node_modules/burrito/node_modules/uglify-js/lib/parse-js.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/node_modules/burrito/node_modules/uglify-js/lib/process.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/node_modules/burrito/node_modules/uglify-js/lib/squeeze-more.js',
  '/home/substack/projects/node-subdeps/node_modules/detective/node_modules/burrito/node_modules/traverse/index.js',
  '/home/substack/projects/node-subdeps/example/tree/lib/util.js',
  '/home/substack/projects/node-subdeps/example/tree/x.js' ]
substack : node-subdeps $ 
````

memory.js
---------

````javascript
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
````

output:

````
[ '/a.js', '/b.js', '/node_modules/f/beep.js' ]
````

methods
=======

var subdeps = require('subdeps');

subdeps.sync(filename, opts)
----------------------------

Return an array of dependencies starting from the file `filename` and expanding
out recursively and synchronously.

Overload [resolve](https://github.com/substack/node-resolve)'s normal behavior
with:

* opts.isFile
* opts.readFileSync

If you have an object mapping filenames to string contents, pass it in as
`opts.sources` and the file will be used for dependency analysis entirely
in-memory.

install
=======

With [npm](http://npmjs.org) do:

    npm install subdeps

and for the CLI tool do:

    npm install -g subdeps

licence
=======

MIT/X11
