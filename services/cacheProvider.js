let NodeCache = require('node-cache')
let cache=null

module.exports.start = function (done){
    if(cache) return done()
    cache = new NodeCache({
        stdTTL:3600,
        useClones:false,
        maxKeys: 2500
    })
}

module.exports.instance = function () {
    return cache
}