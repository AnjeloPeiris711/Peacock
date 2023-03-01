import paramiko
import os
# Create an SSH client
client = paramiko.SSHClient()

# Set policy to automatically add the server's host key
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

# Connect to the server
client.connect(hostname='172.104.180.45', username='junior', password='0711')

# Start a live session
channel = client.invoke_shell()

# Send commands to the shell
# channel.send('ls\n')
# channel.send('hjhhjhjhjh\n')

# Print the output of the commands in real-time
while not channel.exit_status_ready():
    if channel.recv_ready():
        #print(channel.recv(1024).decode())
        channel_data = channel.recv(1024).decode()
        os.system('cls')
        #about = channel_data.rsplit(' ', 2)[0]                   
        arr = channel_data.split()
        print(arr[len(arr)-1])
        
# Close the connection
client.close()

# Close the connection