#!/usr/bin/env python
#host = "172.104.180.45"
#username = "junior"
#password = "0711"
import paramiko
import json

# create SSH client
ssh = paramiko.SSHClient()

# automatically add the server's host key
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

# connect to the remote server
ssh.connect('172.104.180.45', username='root', password='(Ap0711@)')

# execute 'ls -l' command to get directory listing
stdin, stdout, stderr = ssh.exec_command('ls -l /root')

# create directory tree object
# tree = {'id': '1', 'name': 'root', 'isFolder': True, 'items': []}

# # parse directory listing
# for line in stdout:
#     if line.startswith('total'):
#         continue

#     parts = line.split()
#     name = parts[-1]

#     if name.startswith('.'):
#         continue

#     is_folder = parts[0].startswith('d')
#     item = {'id': len(tree['items']) + 1, 'name': name, 'isFolder': is_folder}

#     if is_folder:
#         # recursively get the subdirectory tree
#         stdin2, stdout2, stderr2 = ssh.exec_command('ls -l /' + name)
#         item['items'] = []
#         for subline in stdout2:
#             if subline.startswith('total'):
#                 continue

#             subparts = subline.split()
#             subname = subparts[-1]

#             if subname.startswith('.'):
#                 continue

#             subis_folder = subparts[0].startswith('d')
#             subitem = {'id': len(item['items']) + 1, 'name': subname, 'isFolder': subis_folder}

#             if subis_folder:
#                 # recursively get the subdirectory tree
#                 stdin3, stdout3, stderr3 = ssh.exec_command('ls -l /' + name + '/' + subname)
#                 subitem['items'] = []
#                 for subsubline in stdout3:
#                     if subsubline.startswith('total'):
#                         continue

#                     subsubparts = subsubline.split()
#                     subsubname = subsubparts[-1]

#                     if subsubname.startswith('.'):
#                         continue

#                     subsubis_folder = subsubparts[0].startswith('d')
#                     subsubitem = {'id': len(subitem['items']) + 1, 'name': subsubname, 'isFolder': subsubis_folder}

#                     subitem['items'].append(subsubitem)

#             item['items'].append(subitem)

#     tree['items'].append(item)

# # serialize directory tree as a JSON string
# json_string = json.dumps(tree, indent=2)

# # print the JSON string
# print(json_string)

# # close the SSH connection
# ssh.close()

# create directory tree object
tree = {'id': '1', 'name': 'root', 'isFolder': 'true', 'items': []}

# parse directory listing
for line in stdout:
    if line.startswith('total'):
        continue

    parts = line.split()
    name = parts[-1]

    if name.startswith('.'):
        continue

    is_folder = parts[0].startswith('d')
    item = {'id': len(tree['items']) + 1, 'name': name, 'isFolder': str(is_folder).lower()}

    if is_folder:
        # recursively get the subdirectory tree
        stdin2, stdout2, stderr2 = ssh.exec_command('ls -l /' + name)
        item['items'] = []
        for subline in stdout2:
            if subline.startswith('total'):
                continue

            subparts = subline.split()
            subname = subparts[-1]

            if subname.startswith('.'):
                continue

            subis_folder = subparts[0].startswith('d')
            subitem = {'id': len(item['items']) + 1, 'name': subname, 'isFolder': str(subis_folder).lower()}

            if subis_folder:
                # recursively get the subdirectory tree
                stdin3, stdout3, stderr3 = ssh.exec_command('ls -l /' + name + '/' + subname)
                subitem['items'] = []
                for subsubline in stdout3:
                    if subsubline.startswith('total'):
                        continue

                    subsubparts = subsubline.split()
                    subsubname = subsubparts[-1]

                    if subsubname.startswith('.'):
                        continue

                    subsubis_folder = subsubparts[0].startswith('d')
                    subsubitem = {'id': len(subitem['items']) + 1, 'name': subsubname, 'isFolder': str(subsubis_folder).lower()}

                    subitem['items'].append(subsubitem)

            item['items'].append(subitem)

    tree['items'].append(item)

# serialize directory tree as a JSON string
json_string = json.dumps(tree, indent=2)

# print the JSON string
print(json_string)

# close the SSH connection
ssh.close()


