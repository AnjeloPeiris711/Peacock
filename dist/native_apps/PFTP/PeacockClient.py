import os
import rsa
import time
import socket
import threading
import logging

class Log:
	def __init__(self):
		self.logger = None
	def log_Data(self):
		logging.basicConfig(level=logging.DEBUG)
		self.logger =  logging.getLogger("PeacockClient")
		file_handler = logging.FileHandler("logfile.log")
		file_handler.setLevel(logging.INFO)
		self.logger.addHandler(file_handler)

log = Log()
log.log_Data()

class Asymmetric:
	def __init__(self):
		self.public_key = None
		self.private_key = None
	def genrate_key(self):
		self.public_key,self.private_key = rsa.newkeys(1024)

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
			self.broadcast()
			self.public_partner = rsa.PublicKey.load_pkcs1(self.client.recv(1024))


istablished = IstablishedAthentication(asymm)

class USBIPAthentication:
	def __init__(self,istablished,log):
		self.athenticationdata = istablished
		self.loginfo = log
	def sening_messages(self,c):
		try:
			message = "Are_you_the_write_one"
			self.athenticationdata.client.send(rsa.encrypt(message.encode(),self.athenticationdata.public_partner))
		except:
			self.loginfo.logger.info("client error")
			self.athenticationdata.client.close()
	def receiving_messages(self,c):
			#print("Partner: "+ rsa.decrypt(self.athenticationdata.client.recv(1024),self.athenticationdata.asymmdata.private_key).decode())
			ip = rsa.decrypt(self.athenticationdata.client.recv(1024),self.athenticationdata.asymmdata.private_key).decode()
			print("partner:"+ip)
			file_path = os.path.abspath("PFTP/user.txt")
			print(f"Writing to {file_path}")
			with open(file_path,"w") as f:
				f.write(ip)
class Comunication:
	def __init__(self,istablished,log):
		self.transfer = istablished
		self.logInfo =log
		self.file_size = None
		self.encrypted_file_data = None
		self.block_size = 128
		self.encrypted_blocks = []
		self.Finished = False
		self.file_bytes = b""
		
	def uplord(self,c):
			try:
				try:
					with open("PFTP/file","rb") as f:
						file_data = f.read()
						self.logInfo.logger.info("file Open")
				except:
					self.logInfo.logger.info("file Open Error")
				blocks = [file_data[i:i+self.block_size] for i in range(0, len(file_data), self.block_size)]
				try:
					#self.encrypted_file_data = rsa.encrypt(file_data,self.transfer.public_partner)
					for block in blocks:
						self.encrypted_block = rsa.encrypt(block,self.transfer.public_partner)
						self.encrypted_blocks.append(self.encrypted_block)
				except Exception as e:
					self.logInfo.logger.info("Encryption failed:", e)
				ciphertext = b"".join(self.encrypted_blocks)
				#print(ciphertext)
				try:
					self.transfer.client.send("file.txt".encode())
				except:
					self.logInfo.logger.info("Send File Name")
				try:
					self.transfer.client.sendall(ciphertext)
				except Exception as e:
					self.logInfo.logger.info("Encriyption Error:",e)
					time.sleep(5)
				try:
					self.transfer.client.send(b"<END>")
					self.transfer.client.close()
				except:
					self.logInfo.logger.info("End Error")
			except:
				self.transfer.client.close()

	def Downlord(self,c,ufile_name):
		try:
			# self.transfer.client.send("downuplord.txt".encode())
			self.transfer.client.send(("down"+ufile_name).encode())
			file_name = self.transfer.client.recv(1024).decode()
			print(file_name)
			while not self.Finished:
				data = self.transfer.client.recv(1024)
				if self.file_bytes[-5:] == b"<END>":
					self.Finished = True
				else:
					self.file_bytes += data
			decrypted_blocks = []
			for i in range(0, len(self.file_bytes[-5:]), 128):
				block = self.file_bytes[i:i+128]
				try:
					decrypted_block = rsa.decrypt(block, self.transfer.asymmdata.private_key)
				except rsa.DecryptionError:
					print(f"Decryption failed for block at index {i}")
					continue
				except Exception as e:
					print(f"Encryption failed: {e}")
					continue
				try:
					decrypted_blocks.append(decrypted_block)
				except Exception as e:
					print(f"Appending decrypted block failed: {e}")
					continue
				file_data = b"".join(decrypted_blocks)
				print(file_data)
			try:
				with open("../static/option/data/uplord.txt", "wb") as f: 
					f.write(file_data) #cheak this it work but not right
			except:
				self.logInfo.logger.info("file writing error:", e)
				self.transfer.client.close()
		except:
			self.transfer.client.close()

def start():
    client = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    client.connect(("10.147.19.107",25))
    istablished.set_client_address(client)
    usbip = USBIPAthentication(istablished,log)
    istablished.handle()
    threading.Thread(target=usbip.sening_messages, args=(istablished.client,)).start()
    threading.Thread(target=usbip.receiving_messages, args=(istablished.client,)).start()

def UpPeacock():
	client = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
	client.connect(("10.147.19.107",21))
	istablished.set_client_address(client)
	comm = Comunication(istablished,log)
	istablished.handle()
	threading.Thread(target=comm.uplord, args=(istablished.client,)).start()

def DownPeacock(file_name):
	client = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
	client.connect(("10.147.19.107",21))
	istablished.set_client_address(client)
	comm = Comunication(istablished,log)
	istablished.handle()
	threading.Thread(target=comm.Downlord, args=(istablished.client,file_name)).start()
def t():
	try:
		with open("../static/option/data/uplord.txt","w") as f: 
			f.write("work")
	except:
		log.logger.info("filepath error")
