#!/usr/bin/env python

import os
import io
import sys
import time
import json
import struct
import base64
import paramiko
import subprocess
from subprocess import call
# host = "172.104.180.45"
# username = "junior"
# password = "0711"
class Communication:
    # Read a message from stdin and decode it.
    def getMessage(self):
        rawLength = sys.stdin.buffer.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.buffer.read(messageLength).decode('utf-8')
        return json.loads(message)

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(self,messageContent):
        encodedContent = json.dumps(messageContent).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(self,encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()

sshcom = Communication()
class USBIP:
    def __init__(self):
        self.usbip_process = None
        self.vendor_id = None
        self.product_id = None
        self.bus_id = None

    def athenticusbip(self):
        try:
            process=subprocess.Popen(['python',"PFTP/pft.py","func1"],stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()
        except:
            pass  
    def get_state(self,v_id,p_id):
        self.vendor_id = "0x"+v_id
        self.product_id = "0x"+p_id
        self.athenticusbip()
        self.result = subprocess.run(['usbipd', 'state'], capture_output=True, text=True)
        with open('output.json', 'w') as f:
            f.write(self.result.stdout)  
        self.get_bus_id()

    def get_bus_id(self):
        with open('output.json') as o:
            usbipdata = json.load(o)
        for device in usbipdata['Devices']:
            instance_id = device['InstanceId']
            if instance_id.startswith('USB\\VID_{:04X}&PID_{:04X}'.format(int(self.vendor_id, 16), int(self.product_id, 16))):
                self.bus_id = device['BusId']
        self.start_usbipd()
    def start_usbipd(self):
        self.usbip_process = subprocess.Popen(['python', 'usbIP.py',str(self.bus_id)])  
    def stop_usbipd(self):
        if self.usbip_process is not None:
            self.usbip_process.terminate()
            self.usbip_process = None  
    # def call_usbipd(self):
    #     call(['python','usbIP.py'])
usbIP = USBIP()
class SSHConnection:
    def host_user_Name(self,sshMainData):
        sshurl = sshMainData.split("@")
        self.host = sshurl[1]
        self.username = sshurl[0]

    def getpassword(self):
        sshcom.sendMessage(sshcom.encodeMessage("Enter_Password"))

    def sshpassword(self,sshPassd):
        self.password = sshPassd
sshcon = SSHConnection()
class PecockFileTransfer:
    def CreateFile(self,bse64Data):
        content = bse64Data
        metadata, encoded_data = content.split(',', 1)
        file_type = metadata.split(';')[0].split(':')[1]
        decoded_data = base64.b64decode(encoded_data)
        file_obj = io.BytesIO(decoded_data)
        extension = file_type.split('/')[1] if '/' in file_type else file_type
        with open(f'PFTP/file.{extension}', 'wb') as f:
            f.write(file_obj.getbuffer())
        self.callPFT()
    def callPFT(self):
        try:
            #subprocess.Popen(["python", "PFTP/pft.py","func2"])
            #call(['python',"PFTP/pft.py","func2"])
            process=subprocess.Popen(['python',"PFTP/pft.py","func2"],stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()
            
        except:
            pass  
pft = PecockFileTransfer()
class command():
    def __init__(self):
        self.end = None
        self.about = None
    def User_cmd(self,usercommand):
        #while True:
            #shellname = inshell.hostname
            cmd = usercommand
            #cmd = "whoami"
            if cmd == 'exit': 
                exit()
            else :
                stdin, _stdout,_stderr = client.exec_command(cmd)
            #self.output = (_stdout.read().decode())
                sshcom.sendMessage(sshcom.encodeMessage(_stdout.read().decode()))
          #return output
              #print(_stdout.read().decode())
    # def Invokeshelloutput(self):
    #     start_time = time.time()
    #     while not channel.recv_ready():
    #         pass
    #     while True:
    #         current_time = time.time()
    #         elapsed_time = current_time - start_time
    #         if elapsed_time > 1:
    #             break
    #         elif channel.exit_status_ready():
    #             sshcom.sendMessage(sshcom.encodeMessage("Server Time Out"))
    #         else:
    #             channel_data = channel.recv(1024).decode()
    #             sshcom.sendMessage(sshcom.encodeMessage(channel_data))
    #             time.sleep(1)
    def Invokeshellwelcome(self):
        start_time = time.time()
        while not channel.recv_ready():
            pass
        while True:
            current_time = time.time()
            elapsed_time = current_time - start_time
            if elapsed_time > 3:
                break
            elif channel.exit_status_ready():
                sshcom.sendMessage(sshcom.encodeMessage("Server Time Out"))
            else:
                channel_data = channel.recv(1024).decode()
                #sshcom.sendMessage(sshcom.encodeMessage(channel_data))
                self.about = channel_data.rsplit(' ', 2)[0]
                arr = channel_data.split()
                self.end = arr[len(arr)-1]
                time.sleep(1)
    def Invokeshelloutput(self):
        while not channel.recv_ready():
            pass
        while True:
            channel_data = channel.recv(1024).decode()
            values = channel_data.rsplit(' ', 2)[0]
            sshcom.sendMessage(sshcom.encodeMessage(values))
            check = channel_data.split()
            if(check[len(check)-1] == self.end):
                break
            time.sleep(1)
    def InvokeShell(self,invokeshellcommand):
            try: 
                sshcom.sendMessage(sshcom.encodeMessage(self.end))   
                channel.send(invokeshellcommand+ '\n')
                usshell.Invokeshelloutput()
            except:
                sshcom.sendMessage(sshcom.encodeMessage("error"))
usshell = command()
class messagecount:
    def __init__(self):
        self.Count=1
    def increament(self):
        while(self.Count<=10):
            self.Count+=1
            sshcom.sendMessage(sshcom.encodeMessage(self.Count))
            time.sleep(1)
cout = messagecount()    
while True:
        receivedMessage = sshcom.getMessage()
        if(receivedMessage.startswith('sshinfo') and receivedMessage[7:]):
            sshcon.host_user_Name(receivedMessage[7:])
            #raise Exception("error")
            sshcon.getpassword()
        elif(receivedMessage.startswith('sshpss') and receivedMessage[6:]):
           sshcon.sshpassword(receivedMessage[6:])
           client = paramiko.client.SSHClient()
           client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
           try:
                client.connect(sshcon.host, username=sshcon.username, password=sshcon.password)
                sshcom.sendMessage(sshcom.encodeMessage("SSH_Connection_Established"))
                channel = client.invoke_shell()
                usshell.Invokeshellwelcome()
                # usshell.InvokeShell()          
           except:
                sshcom.sendMessage(sshcom.encodeMessage("wrong username or password"))
                #channel = client.invoke_shell()
                #usshell.InvokeShell(channel)
        elif(receivedMessage.startswith("BUS") and receivedMessage[3:]):
            vid_match = receivedMessage[6:10]
            pid_match = receivedMessage[13:17]
            usbIP.get_state(vid_match,pid_match)
        elif(receivedMessage.startswith("upfd") and receivedMessage[4:]):
            pft.CreateFile(receivedMessage[4:])
        else:   
            #usshell.InvokeShell(receivedMessage)
           usshell.User_cmd(receivedMessage)
           #sshcom.sendMessage(sshcom.encodeMessage(usshell.output))
           #sshcom.sendMessage(sshcom.encodeMessage(sshcon.host)) 
           #sshcom.sendMessage(sshcom.encodeMessage(usshell.output)) 
client.close()