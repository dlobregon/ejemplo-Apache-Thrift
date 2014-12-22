#!/usr/bin/env python
import sys
#apache thrift genera la carpeta 'gen-py' la renombre como 'genpy' y la importe aca
from genpy.twit import Publicar
from genpy.twit.ttypes import *

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

try:
	#hacemos la conexion
	transport = TSocket.TSocket('localhost', 9090)

	transport = TTransport.TFramedTransport(transport)

	protocol = TBinaryProtocol.TBinaryProtocol(transport)
	#creamos nuestro cliente
	client = Publicar.Client(protocol)

	transport.open()


	twit = Twit()
	twit.id = 1000
	#colocamos el usuario
	twit.usuario = raw_input("cual es tu nombre? ")
	#metemos el twit
	twit.casaca = raw_input("cual es tu casaca? ")
	#hacemos las llamadas al sistema
	client.guardar(twit)

	transport.close()

except Thrift.TException, tx:
	print '%s' % (tx.message)
