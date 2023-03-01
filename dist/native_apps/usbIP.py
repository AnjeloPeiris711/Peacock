import pyuac
import subprocess
import sys
def main():
        subprocess.run(['usbipd', 'bind', '-b','2-4'], check=True, shell=True)
    # The window will disappear as soon as the program exits!
        # subprocess.run(['ipconfig'], check=True, shell=True)
        input("Press enter to close the window. >")

if __name__ == "__main__":
    if not pyuac.isUserAdmin():
        print("selected usb bind")
        pyuac.runAsAdmin()
    else:        
        main()  # Already an admin here.
