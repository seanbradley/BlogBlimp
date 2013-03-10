#!/usr/bin/python

import sys
import SimpleHTTPServer
import SocketServer

#: A minimal web server.  Serves files relative to the
#: current directory.

PORT = 5000

if len(sys.argv) == 2:
        PORT = int(sys.argv[1])

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
