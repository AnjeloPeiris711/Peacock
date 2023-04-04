import os
import subprocess
from subprocess import call
x = input("enter number:")
if x == "2":
	call(["python", "pft.py","func1"])
else:
	subprocess.Popen(["python", "pft.py","func2"])

