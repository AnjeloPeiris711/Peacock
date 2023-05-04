import os
import rsa
import time
import socket
import netifaces
import threading



# server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
# server.bind(("0.0.0.0",21))
# server.listen()
file_sock =socket.socket(socket.AF_INET, socket.SOCK_STREAM)
file_sock.bind(("0.0.0.0",21))
file_sock.listen()

msg_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
msg_sock.bind(('0.0.0.0', 23))
msg_sock.listen()


#client,address = server.accept()


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
		#self.public_partner = None
		self.public_partner_file = None
		self.public_partner_msg = None
		self.file_conn = None
		self.msg_conn = None
		self.file_bytes = b""
		self.Finished = False
		self.ip_addresses = []
		self.Interface()
		self.block_size = 128
		self.encrypted_blocks = []



	def msg_broadcast(self):
		try:
			#client.send(self.asymmdata.public_key.save_pkcs1("PEM"))
			try:
				self.msg_conn, msg_addr = msg_sock.accept()
				self.public_partner_msg = rsa.PublicKey.load_pkcs1(self.msg_conn.recv(1024))
				self.msg_conn.send(self.asymmdata.public_key.save_pkcs1("PEM"))
				print("Connection from Message client: " + str(msg_addr) + " has been established!")
				self.receiving_messages()
			except Exception as e:
				print("msgaccept fail:"+str(e))
			finally:
				self.msg_conn.close()
		except:
			print("error")
	def file_broadcast(self):
		try:
			#client.send(self.asymmdata.public_key.save_pkcs1("PEM"))
			try:
				self.file_conn, file_addr = file_sock.accept()
				self.public_partner_msg = rsa.PublicKey.load_pkcs1(self.file_conn.recv(1024))
				self.file_conn.send(self.asymmdata.public_key.save_pkcs1("PEM"))
				print("Connection from File client" +str(file_addr)+"has been established!")
				self.Downlord()
			except Exception as e:
				print("ftpaccept fail:"+str(e))
			finally:
				self.file_conn.close()
		except:
			print("error")
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
				#client.send(rsa.encrypt(message.encode(),self.public_partner))
				self.msg_conn.send(rsa.encrypt(message.encode(),self.public_partner_msg))
			except:
				print("client error")
				#client.close()
				self.msg_conn.close()

	def receiving_messages(self):
			#partnermsg = rsa.decrypt(client.recv(1024),self.asymmdata.private_key).decode()
			partnermsg = rsa.decrypt(self.msg_conn.recv(1024),self.asymmdata.private_key).decode()
			print(partnermsg)
			if partnermsg == "Are_you_the_write_one":
				self.sening_messages()
				print("ok")
			else:
				error = "haha"
				self.msg_conn.send(rsa.encrypt(error.encode(),self.public_partner_msg))

	def Downlord(self):
		try:
			#file_name = client.recv(1024).decode()
			file_name = self.file_conn.recv(1024).decode()
			if file_name.startswith("down") and file_name[4:]:
				print("ok")
			else:
				pass
			print(file_name)
			while not self.Finished:
				#data = client.recv(1024)
				data = self.file_conn.recv(1024)
				if self.file_bytes[-5:] == b"<END>":
					self.Finished = True
				else:
					self.file_bytes += data
				decrypted_blocks = []
				for i in range(0, len(self.file_bytes[-5:]), 128):
					block = self.file_bytes[i:i+128]
					try:
						decrypted_block = rsa.decrypt(block, self.asymmdata.private_key)
					except rsa.DecryptionError:
						print("Decryption failed for block at index" +str(i))
						continue
					except Exception as e:
						print("Encryption failed:" +str(e))
						continue
					try:
						decrypted_blocks.append(decrypted_block)
					except Exception as e:
						print("Appending decrypted block failed:" +str(e))
						continue
					file_data = b"".join(decrypted_blocks)
				try:
					with open(file_name, "wb") as f:
						f.write(file_data)
				except:
					print("Error writing file")
					#client.close()
					#server.close()
					self.file_conn.close()
					file_sock.close()
		except:
			# client.close()
			# server.close()
			self.file_conn.close()
			file_sock.close()

	def uplord(self):
			try:
				try:
					with open("file","rb") as f:
						file_Updata = f.read()
				except:
					print("file Open Error")
				blocks = [file_Updata[i:i+self.block_size] for i in range(0, len(file_Updata), self.block_size)]
				try:
					#self.encrypted_file_data = rsa.encrypt(file_data,self.transfer.public_partner)
					for upblock in blocks:
						self.encrypted_block = rsa.encrypt(upblock,self.public_partner_file)
						self.encrypted_blocks.append(self.encrypted_block)
				except Exception as e:
					print("Encryption failed:", e)
				ciphertext = b"".join(self.encrypted_blocks)
				#print(ciphertext)
				try:
					#client.send("peacock_server.txt".encode())
					self.file_conn.send("peacock_server.txt".encode())
				except:
					print("Send File Name")
				try:
					#client.sendall(ciphertext)
					self.file_conn.sendall(ciphertext)
				except Exception as e:
					print("Encriyption Error:",e)
					time.sleep(5)
				try:
					# client.send(b"<END>")
					# client.close()
					self.file_conn.send(b"<END>")
					self.file_conn.close()
				except:
					print("End Error")
			except:
				#client.close()
				self.file_conn.close

	def handle(self):
			#while True:
				#comm.msg_broadcast()
			#threading.Thread(target=comm.msg_broadcast).start()
			threading.Thread(target=comm.file_broadcast).start()
				#self.public_partner_file = rsa.PublicKey.load_pkcs1(file_conn.recv(1024))
				#print(f"Connection from File client :{file_addr} has been established!")
				# if self.public_partner_msg is not None:
				# 	threading.Thread(target = comm.receiving_messages).start()
				# else:
				# 	time.sleep(1)
				# 	threading.Thread(target=self.Downlord).start()
			#threading.Thread(target=self.uplord, args=(file_conn,)).start()

comm = Comunication(asymm)
		
comm.handle()
#server.close()
file_sock.close()
msg_sock.close()