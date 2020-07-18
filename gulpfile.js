
const browserSync = require('browser-sync')
const bs = browserSync.create()

const server = () => {
    bs.init({
        port: 9988,
        open: false,
        files: '**',
        server: {
            baseDir: ['.', 'css', 'js', 'imgs', 'fonts']
        }
    })
}

module.exports = {
    server
} 