import os
# import subprocess
# from subprocess import call
import PeacockClient 
while True:
	x = input("enter number:")
	if x == "2":
	#call(["python", "pft.py","func1"])
		# PeacockClient.start()
		file_name = "uplord.txt"
		PeacockClient.DownPeacock(file_name)
	else:
	# process = subprocess.Popen(["python", "pft.py","func2"],stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	# stdout, stderr = process.communicate()
		PeacockClient.UpPeacock()

