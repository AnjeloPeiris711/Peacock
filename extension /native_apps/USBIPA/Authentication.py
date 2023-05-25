import os
import rsa
import socket
import threading


s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.bind(("0.0.0.0",21))
s.listen(5)


class Asymmetric:
	def __init__(self):
		self.public_key = None
		self.private_key = None
		self.clear_message = None
	def genrate_key(self):
		self.public_key,self.private_key = rsa.newkeys(1024)
		# with open("public.pem","wb") as f:
		#  	f.write(public_key.save_pkcs1("PEM"))
		# with open("private.pem","wb") as f:
		#  	f.write(private_key.save_pkcs1("PEM"))
		# message = "hello"
		# encrypted_message = rsa.encrypt(message.encode(),public_key)
		# clear_message = rsa.decrypt(encrypted_message,private_key)
		# print(clear_message.decode())

	# def sharekey(self):
	# 	with open("public.pem","rb") as r:
	# 		self.publickey = rsa.PublicKey.load_pkcs1(r.read())
	# 	with open("private.pem","rb") as r:
	# 		self.privatekey = rsa.PrivateKey.load_pkcs1(r.read())
		
asymm = Asymmetric()
asymm.genrate_key()
class IstablishedAthentication:
	def __init__(self, asymm):
		self.asymmdata = asymm
		self.public_partner = None
		self.client = None
	def broadcast(self):
		# self.client.send(bytes(str(self.asymmdata.publickey), "utf-8"))
		self.client.send(self.asymmdata.public_key.save_pkcs1("PEM"))
	def handle(self):
			self.client,address = s.accept()
			print(f"Connection from {address} has been established!")
			self.broadcast()
			self.public_partner = rsa.PublicKey.load_pkcs1(self.client.recv(1024))
			threading.Thread(target = usbip.sening_messages,args =(self.client,)).start()
			threading.Thread(target = usbip.receiving_messages,args =(self.client,)).start()

istablished = IstablishedAthentication(asymm)

class USBIPAthentication:
	def __init__(self,istablished,):
		self.athenticationdata = istablished
	def sening_messages(self,c):
		try:
			message = "Are_you_the_write_one"
			self.athenticationdata.client.send(rsa.encrypt(message.encode(),self.athenticationdata.public_partner))
		except:
			print("client error")
			self.athenticationdata.client.close()
	def receiving_messages(self,c):
			print("Partner: "+ rsa.decrypt(self.athenticationdata.client.recv(1024),self.athenticationdata.asymmdata.private_key).decode())
			

usbip = USBIPAthentication(istablished)
istablished.handle()		