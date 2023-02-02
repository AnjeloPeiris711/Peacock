#!/usr/bin/env python
import paramiko
import os
import sys
import json
import struct
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
    def User_cmd(self,ok):
        #while True:
            #shellname = inshell.hostname
            #cmd = input(f'{shellname}')
            cmd = "whoami"
            #if cmd == 'exit':break
            stdin, _stdout,_stderr = client.exec_command(cmd)
            self.output = (_stdout.read().decode())
          #return output
              #print(_stdout.read().decode())
    def InvokeShell(self,channel):
        try:
            channel.send("whoami")
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
        if(receivedMessage == "junior@172.104.180.45"):
            sshcon.host_user_Name(receivedMessage)
            #raise Exception("error")
            sshcon.getpassword()
        else:
           sshcon.sshpassword(receivedMessage)
           client = paramiko.client.SSHClient()
           client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
           try:
                client.connect(sshcon.host, username=sshcon.username, password=sshcon.password)
           except:
                sshcom.sendMessage(sshcom.encodeMessage("wrong username or password"))
                channel = client.invoke_shell()
                usshell.InvokeShell(channel)
           #sshcom.sendMessage(sshcom.encodeMessage(sshcon.host)) 
           #sshcom.sendMessage(sshcom.encodeMessage(usshell.output)) 
