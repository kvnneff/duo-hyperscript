var read = require('fs').readFileSync;
var join = require('path').join;
var fixture = join.bind(null, __dirname);
var assert = require('assert');
var html2hscript = require('..');
var Duo = require('duo');
var vm = require('vm');

/**
 * Tests
 */

describe('duo-html2hscript', function () {
    it('should compile .html', function (done) {
        var expected = read(fixture('simple/template.js'), 'utf8');
        var duo = Duo(__dirname)
            .cache(false)
            .use(html2hscript())
            .entry(fixture('simple/template.html'))
            .run(function(err, js) {
                if (err) return done(err);
                console.log(js);
                assert(html == expected.trim());
                done();
            });
    });
});