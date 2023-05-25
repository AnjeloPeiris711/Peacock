#!/usr/bin/env python

import re
import sys
import json
import struct
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
    def get_state(self,vid_match,pid_match):
        self.vendor_id = vid_match
        self.product_id = pid_match
        self.result = subprocess.run(['usbipd', 'state'], capture_output=True, text=True)
        with open('output.json', 'w') as f:
            f.write(self.result.stdout)
    def get_bus_id(self,vendor_id, product_id):
        with open('output.json') as o:
            usbipdata = json.load(o)
        for device in usbipdata['Devices']:
            instance_id = device['InstanceId']
            if instance_id.startswith('USB\\VID_{:04X}&PID_{:04X}'.format(vendor_id, product_id)):
                return device['BusId']
        sshcom.sendMessage(sshcom.encodeMessage("Ther is unknown erre please restart extention"))  
    def start_usbipd(self):
        self.usbip_process = subprocess.Popen(['python', 'usbIP.py'])
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
class command():
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
    def InvokeShell(self,InvokeCommand):
        channel = client.invoke_shell()
        try:
            channel.send(InvokeCommand)
            while not channel.exit_status_ready():
                try:
                    if channel.recv_ready():
                        channel_data = channel.recv(2048)
                except:
                    sshcom.sendMessage(sshcom.encodeMessage(channel_data))
        except:
            sshcom.sendMessage(sshcom.encodeMessage("error"))
        channel.close()
usshell = command()
while True:
        receivedMessage = sshcom.getMessage()
        receivedMessage.startswith("sshinfo") and receivedMessage[7:]
        if(receivedMessage == "junior172.104.180.45"):
            sshcon.host_user_Name(receivedMessage)
            #raise Exception("error")
            sshcon.getpassword()
        elif(receivedMessage == "0711"):
           sshcon.sshpassword(receivedMessage)
           client = paramiko.client.SSHClient()
           client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
           try:
                client.connect(sshcon.host, username=sshcon.username, password=sshcon.password)
           except:
                sshcom.sendMessage(sshcom.encodeMessage("wrong username or password"))
                #channel = client.invoke_shell()
                #usshell.InvokeShell(channel)
           sshcom.sendMessage(sshcom.encodeMessage("SSH_Connection_Established"))
        # elif(receivedMessage.startswith("usb") and receivedMessage[7:]):
        #     vid_match = re.search(r'vid(\d+)', receivedMessage[7:])
        #     pid_match = re.search(r'pid(\d+)', receivedMessage[7:])
        #     usbIP.get_state(vid_match,pid_match)
        elif(receivedMessage == "kill"):
            usshell.InvokeShell('\x03')
        else:   
            usshell.User_cmd(receivedMessage) 
           #sshcom.sendMessage(sshcom.encodeMessage(usshell.output))
           #sshcom.sendMessage(sshcom.encodeMessage(sshcon.host)) 
           #sshcom.sendMessage(sshcom.encodeMessage(usshell.output)) 
