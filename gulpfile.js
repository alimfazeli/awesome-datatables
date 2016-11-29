var gulp = require( 'gulp' );
var ngAnnotate = require( 'gulp-ng-annotate' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var watch = require( 'gulp-watch' );



gulp.task( 'default', function () {
    gulp.src( [
            'src/module.js',
            'src/services/*.js',
            'src/directives/*.js',
        ] )
        .pipe( concat( 'awesome-datatables.min.js' ) )
        .pipe( ngAnnotate( {
            remove: true,
            add: true,
            single_quotes: true
        } ) )
        .pipe( uglify( {
            mangle: true
        } ) )
        .pipe( gulp.dest( './dist/' ) );

} );


gulp.task( 'watch', function () {
    gulp.watch( [
        'src/module.js',
        'src/services/*.js',
        'src/directives/*.js',
    ], [ 'default' ] );
} );
