'use strict'

var	ngrok	= require('ngrok'),
	qrTerm	= require('qrcode-terminal'),
	fs	= require('fs')

var	tunnelURL

module.exports = function (server) {

	server.on('listening', function () {
		var k = server._connectionKey
		var port = parseInt(k.slice(k.lastIndexOf(':') + 1), 10)

		ngrok.connect(port, function (err, url) {
			if (err) {
				console.error('Failed to connect ngrok service:', err)
			} else {
				tunnelURL = url
				console.log('Tunnel URL:', url)
				qrTerm.generate(url)
			}
		})

	})

	var evs = server.listeners('request').slice()
	server.removeAllListeners('request')
	server.on('request', function (req, res) {
		if (req.url === '/demoshare/qr.js') {
			res.setHeader('Content-Type', 'application/javascript')
			res.end(fs.readFileSync(__dirname + '/qrcode.min.js'))
		} else {
			for (var i = 0; i < evs.length; i++) {
				evs[i].call(server, req, wrapResponse(res));
			}
		}
	})
}

function wrapResponse(res) {
	var write = res.write, end = res.end

}