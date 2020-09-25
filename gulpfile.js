const {
          src,
          dest,
          series,
          parallel,
          watch
      } = require('gulp');

const pkg         = require('./package.json')
const fs          = require('fs')
const os          = require('os')
const through     = require('through2');
const sourcemap   = require('gulp-sourcemaps')
const identityMap = require('@gulp-sourcemaps/identity-map')
const babel       = require('gulp-babel')
const less        = require('gulp-less')
const lessc       = require('less')
const postcss     = require('gulp-postcss')
const autoprefix  = require('autoprefixer')
const pxtorem     = require('postcss-pxtorem')
const connect     = require('gulp-connect')
const minimist    = require('minimist')
const preprocess  = require("gulp-preprocess")
const cleancss    = require('gulp-clean-css')
const minifyCSS   = require('clean-css');
const clean       = require('gulp-rimraf')
const uglify      = require('gulp-uglify')
const relogger    = require('gulp-remove-logging')
const validate    = require('gulp-jsvalidate')
const notify      = require('gulp-notify')
const header      = require('gulp-header')
const open        = require('gulp-open')

const knownOptions = {
          string : 'env',
          default: {
              env: process.env.NODE_ENV || 'dev'
          }
      },
      options      = minimist(process.argv.slice(2), knownOptions)

const cmt     = '/** <%= pkg.name %>-v<%= pkg.version %> <%= pkg.license %> License By <%= pkg.homepage %> */' + os.EOL + ' <%= js %>',
      note    = [cmt, {
          pkg: pkg,
          js : ';'
      }],
      noteCss = [cmt, {
          pkg: pkg,
          js : ''
      }];

const compileVue = function () {
    const compile = (stream, file, content, css, next) => {
        let gps    = /<template>(.*)<\/template>/ims.test(content), tpl = gps ? RegExp.$1 : null;
        let script = /<script[^>]*>(.*)<\/script>/ims.test(content);
        if (tpl && script) {
            content = RegExp.$1.trim().replace('$tpl$', tpl.trim())
        } else if (script) {
            content = RegExp.$1.trim()
        }
        if (css) {
            let minCss = new minifyCSS({
                compatibility: '*'
            }).minify(css.css).styles;

            let styleId = css.styleID;
            content     = `layui.injectCss('cmp-${styleId}',\`${minCss}\`);` + content;
        }

        file.contents = Buffer.from(content);
        stream.push(file);
        next();
    };
    return through.obj(function (file, enc, cbx) {
        let content = file.contents.toString();

        let les = /<style\s+id\s*=\s*"([^"]+)"[^>]*>(.*)<\/style>/ims.test(content),
            css = les ? RegExp.$2.trim() : null;
        if (css) {
            let styleID = RegExp.$1.trim();
            lessc.render(css, {
                async    : false,
                fileAsync: false
            }).then((val) => {
                val.styleID = styleID;
                compile(this, file, content, val, cbx)
            }).catch((err) => {
                compile(this, file, content, false, cbx);
            });
        } else {
            compile(this, file, content, false, cbx)
        }
    });
};

const cleanTask = cb => {
    src(['js/*', 'css/*'], {
        read      : true,
        allowEmpty: true
    }).pipe(clean())

    cb()
}

const buildCss = cb => {
    let gp = src(['src/less/[^_]*.less'])

    if (options.env != 'pro') {
        gp = gp.pipe(sourcemap.init()).pipe(identityMap());
    }

    gp = gp.pipe(less()).on('error', e => {
        console.error(e.message)
    })
    .pipe(postcss([pxtorem({
        rootValue: 16
    }), autoprefix()]))
    .on('error', e => {
        console.error(e.message)
    })

    // write sourcemap
    if (options.env != 'pro')
        gp = gp.pipe(sourcemap.write())

    if (options.env == 'pro')
        gp = gp.pipe(cleancss()).pipe(header.apply(null, noteCss))

    gp = gp.pipe(dest('css'))

    if (options.watch)
        gp.pipe(connect.reload());

    cb();
}

const buildmJs = cb => {
    let gp = src(['src/js/*.js'])

    if (options.env != 'pro') {
        gp = gp.pipe(sourcemap.init()).pipe(identityMap());
    }

    gp = gp.pipe(babel()).on('error', (e) => {
        console.error(e.message)
        notify.onError(e.message)
    }).pipe(validate()).on('error', (e) => {
        notify.onError(e.message)
        console.error(e.message)
    })

    if (options.env != 'pro')
        gp = gp.pipe(sourcemap.write())

    if (options.env == 'pro')
        gp = gp.pipe(relogger({
            replaceWith: 'void 0'
        })).pipe(uglify()).on('error', (e) => {
            notify.onError(e.message)
            console.error(['js', e.message, e])
        }).pipe(header.apply(null, note))

    gp = gp.pipe(dest('js'))

    if (options.watch) {
        gp.pipe(connect.reload());
    }

    cb();
}

const buildVue = cb => {
    let gp = src(['src/widget/*.vue']);

    gp = gp.pipe(compileVue()).pipe(babel()).on('error', (e) => {
        console.error(e.message);
        notify.onError(e.message)
    }).pipe(validate()).on('error', (e) => {
        notify.onError(e.message);
        console.error(e.message)
    });

    if (options.env == 'pro')
        gp = gp.pipe(relogger({
            replaceWith: 'void 0'
        })).pipe(uglify()).on('error', (e) => {
            notify.onError(e.message)
            console.error(['widget', e.message])
        }).pipe(header.apply(null, note))

    gp = gp.pipe(dest('js'));

    if (options.watch) {
        gp.pipe(connect.reload());
    }
    cb();
}

const watching = cb => {
    // start dev server
    // connect.server({
    //     root      : './',
    //     livereload: true,
    //     port      : 9090,
    // })
    options.env ="dev"
    options.watch = false

    watch(['src/js/**/*.js'], buildmJs)
    watch(['src/less/**/*.less'], buildCss)
    watch(['src/widget/*.vue'], buildVue)

    cb()
}

exports.clean = cleanTask

exports.build    = parallel(buildCss, buildVue, buildmJs);
exports.buildVue = buildVue;

exports.default = series(cb => {
    options.env = 'pro'
    cb()
}, exports.build);

exports.watch = series(exports.build, watching)
