#!/usr/bin/env node

const cache = require('./cache')
const ticket = require('./provider/qq').ticket

require('http').createServer().on('request', (req, res) => {
    if(req.url == '/qq/ticket')
        cache(ticket, null, 15 * 60 * 1000).then(vkey => res.end(vkey))
    else
        res.end()
}).listen(parseInt(process.argv[2]) || 9000)