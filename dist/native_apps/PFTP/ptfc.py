import os
import rsa
import time
import socket
import netifaces
import threading

connected = False
while not connected:
    try:
        client = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        client.connect(("127.0.0.1",21))
        connected = True
    except ConnectionRefusedError:
        print('Server not found. Retrying in 5 seconds...')
        time.sleep(5)

print("Server is connected")

class Asymmetric:
	def __init__(self):
		self.public_key = None
		self.private_key = None
		self.clear_message = None

	def genrate_key(self):
		self.public_key,self.private_key = rsa.newkeys(1024)
		
asymm = Asymmetric()
asymm.genrate_key()


class Comunication:
	def __init__(self, asymm):
		self.asymmdata = asymm
		self.public_partner = None
		self.file_bytes = b""
		self.Finished = False
		self.ip_addresses = []
		self.Interface()
	def broadcast(self):
		client.send(self.asymmdata.public_key.save_pkcs1("PEM"))

	def Interface(self):
		interfaces = netifaces.interfaces()
		for interface in interfaces:
			addresses = netifaces.ifaddresses(interface)
			if netifaces.AF_INET in addresses:
				ipv4_addresses = addresses[netifaces.AF_INET]
				for ipv4_address in ipv4_addresses:
					self.ip_addresses.append(ipv4_address['addr'])

	def sening_messages(self):
			try:
				message = str(self.ip_addresses)
				client.send(rsa.encrypt(message.encode(),self.public_partner))
			except:
				print("client error")
				client.close()

	def receiving_messages(self,c):
			partnermsg = rsa.decrypt(client.recv(1024),self.asymmdata.private_key).decode()
			print(partnermsg)
			if partnermsg == "Are_you_the_write_one":
				self.sening_messages()
			else:
				error = "haha"
				client.send(rsa.encrypt(error.encode(),self.public_partner))

	def Downlord(self,c):
			try:
				file_name = client.recv(1024).decode()
				print(file_name)
				# file_size = client.recv(1024).decode()
				# print(file_size)
				file = open(file_name, "wb")
				while not self.Finished:
					data = client.recv(1024)
					if self.file_bytes[-5:]	== b"<END>":
						self.Finished = True
					else:
						self.file_bytes += data
				file.write(rsa.decrypt(self.file_bytes[:-5],self.asymmdata.private_key))
				file.close()
			except:
				client.close()	
	def handle(self):
			comm.broadcast()
			self.public_partner = rsa.PublicKey.load_pkcs1(client.recv(1024))
			#threading.Thread(target = comm.receiving_messages,args =(client,)).start()
			threading.Thread(target = comm.Downlord,args =(client,)).start()
			

comm = Comunication(asymm)
		
comm.handle()
