import paramiko
import os

# host = "172.104.180.45"
# username = "junior"
# password = "0711"
class GetSSh_Connection:
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

inshell.Channel_Data()
usshell.User_cmd()