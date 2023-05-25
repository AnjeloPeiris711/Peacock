import os
import sys
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
	# 	self.address = None
	def set_client_address(self,client):
		self.client = client
	def broadcast(self):
		# self.client.send(bytes(str(self.asymmdata.publickey), "utf-8"))
		self.client.send(self.asymmdata.public_key.save_pkcs1("PEM"))
	def handle(self):
			#self.client,address = s.accept()
			print(f"Connection from {address} has been established!")
			self.broadcast()
			self.public_partner = rsa.PublicKey.load_pkcs1(self.client.recv(1024))
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
			#print("Partner: "+ rsa.decrypt(self.athenticationdata.client.recv(1024),self.athenticationdata.asymmdata.private_key).decode())
			ip = rsa.decrypt(self.athenticationdata.client.recv(1024),self.athenticationdata.asymmdata.private_key).decode()
			print("partner:"+ip)
			file_path = os.path.abspath("PFTP/user.txt")
			print(f"Writing to {file_path}")
			with open(file_path,"w") as f:
				f.write(ip)
			#self.athenticationdata.client.close()
#usbip = USBIPAthentication(istablished)
#istablished.handle()		
class Comunication:
	def __init__(self,istablished):
		self.transfer = istablished
		self.file_size = None
		self.encrypted_file_data = None
	# def broadcast(self):
	# 	# self.client.send(bytes(str(self.asymmdata.publickey), "utf-8"))
	# 	self.client.send(self.asymmdata.public_key.save_pkcs1("PEM"))
	def uplord(self,c):
			try:
				print("file uploading....")
				#self.file_size = os.path.getsize("file")
				ReadFile = os.path.abspath("PFTP/file")
				try:
					with open(ReadFile,"rb") as f:
						file_data = f.read()
						print(file_data)
				except:
					pass
				self.encrypted_file_data = rsa.encrypt(file_data,self.transfer.public_partner)
				self.transfer.client.send("new.png".encode())
				#self.client.send(str(self.file_size))
				self.transfer.client.sendall(self.encrypted_file_data)
				self.transfer.client.send(b"<END>")
			except:
				self.transfer.client.close()
	# def handle(self):
	# 		self.client,address = s.accept()
	# 		print(f"Connection from {address} has been established!")
	# 		comm.broadcast()
	# 		self.public_partner = rsa.PublicKey.load_pkcs1(self.client.recv(1024))
	# 		threading.Thread(target = comm.uplord,args =(self.client,)).start()
			#threading.Thread(target = comm.receiving_messages,args =(self.client,)).start()	

#comm = Comunication(istablished)

if __name__ == '__main__':
	client,address = s.accept()
	istablished.set_client_address(client)
	usbip = USBIPAthentication(istablished)
	comm = Comunication(istablished)
	istablished.handle()
	if sys.argv[1] == 'func1':
		threading.Thread(target=usbip.sening_messages, args=(istablished.client,)).start()
		threading.Thread(target=usbip.receiving_messages, args=(istablished.client,)).start()
	else:
		threading.Thread(target=comm.uplord, args=(istablished.client,)).start()
				