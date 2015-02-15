/**
 * Module Dependencies
 */
var path = require.resolve('virtual-dom');
var compile = require('html2hscript');
var fs = require('fs');
var read = fs.readFileSync;

/**
 * Export `plugin`
 */

module.exports = plugin;

/**
 * html2hscript plugin
 *
 * @param {Object} opts
 * @return {String}
 */

function plugin(opts) {
    opts = opts || {};
    var first = true;
    return function parse(file, entry, done) {
        if ('html' != file.type) return done();
        file.type = 'js';

        // if (first) {
        //     var runtime = read(path, 'utf8');
        //     console.log(runtime);
        //     file.include('virtual-dom:h.js', runtime);
        //     first = false;
        // }

        compile(file.src, function (err, src) {
            if (err) return done(err);
            file.src = 'var h = require(\'virtual-dom:h.js\');\n\n' +
            'module.exports = ' + src + ';';
            done();
        });
    };
};