#!/usr/bin/env python
import paramiko
import os
import sys
import json
import struct
# host = "172.104.180.45"
# username = "junior"
# password = "0711"
class GetSSh_Connection:
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.buffer.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.buffer.read(messageLength).decode('utf-8')
        return json.loads(message)
    # Encode a message for transmission.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}
    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()
    while True:
        receivedMessage = getMessage()
        if receivedMessage == "ping":
            sendMessage(encodeMessage("pong3"))
class Communication:
    pass

client = paramiko.client.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host, username=username, password=password)

class Invoke_Shell:
    def Channel_Data(self):
        channel = client.invoke_shell()
        while True:
            if (channel.recv_ready()):
                channel_data = channel.recv(9999).decode(encoding='utf_8', errors='strict')
                os.system('cls')
                #print(channel_data)
                about = channel_data.rsplit(' ', 2)[0]
                print(about)
                arr = channel_data.split()
                self.hostname = arr[len(arr)-1]
                #print(hostname)
            else:
                break
class command:
    def User_cmd(self):
        while True:
            shellname = inshell.hostname
            cmd = input(f'{shellname}')
            if cmd == 'exit':break
            _stdin, _stdout,_stderr = client.exec_command(cmd)
            print(_stdout.read().decode())

inshell = Invoke_Shell()
usshell = command()

# inshell.Channel_Data()
# usshell.User_cmd()