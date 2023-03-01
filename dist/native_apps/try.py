#!/usr/bin/env python
#host = "172.104.180.45"
#username = "junior"
#password = "0711"
import paramiko
import os
import sys
import json
import struct
class SSHConnection:
    def host_user_Name(self,sshMainData):
        sshurl = sshMainData.split("@")
        self.host = sshurl[1]
        self.username = sshurl[0]
    def getpassword(self):
        print('now enter password')
    def sshpassword(self,sshPassd):
        self.password = sshPassd
sshcon = SSHConnection()
# class Invoke_Shell:
#      def Channel_Data(self):
#         channel = client.invoke_shell()
#         while True:
#             while not channel.exit_status_ready():
#                 if (channel.recv_ready()):
#                     channel_data = channel.recv(9999).decode(encoding='utf_8', errors='strict')
#                     # os.system('cls')
#                     #print(channel_data)
#                     #about = channel_data.rsplit(' ', 2)[0]
#                     #print(about)
#                     #arr = channel_data.split()
#                     #self.hostuse = arr[len(arr)-1]
#                     print(channel_data)
#             else:
#                 break
# inshell = Invoke_Shell()
class command():
        def User_cmd(self,ok):
            shellname = "junior>"
            cmd = input(f'{shellname}')
           #cmd = "whoami"
            stdin, _stdout,_stderr = client.exec_command(cmd)
            self.out = (_stdout.read().decode())
          #return output
              #print(_stdout.read().decode())
        def Invoke_shell(self,ok):
            channel = client.invoke_shell()
            channel.send('ls\n')
            while not channel.exit_status_ready():
                if channel.recv_ready():
                    self.output = (channel.recv(1024).decode())
usshell = command()
count=0
while True:
        receivedMessage = input("Enter:")
        count+=1
        if(count==1):
            sshcon.host_user_Name(receivedMessage)
            sshcon.getpassword()
        else:
           sshcon.sshpassword(receivedMessage)
           # Create an SSH client
           client = paramiko.client.SSHClient()
           # Set policy to automatically add the server's host key
           client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
           client.connect(sshcon.host, username=sshcon.username, password=sshcon.password)
           while True:
            usshell.Invoke_shell("ok")
            print(usshell.output)
            
        #test = inshell.hostname
        # usshell.User_cmd()
        #print(output)
# usshell.User_cmd()