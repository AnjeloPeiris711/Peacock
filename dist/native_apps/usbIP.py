import sys
import pyuac
import pydivert
import subprocess
bus_id = sys.argv[1]
def user():
    allowed_user = ['10.147.19.107']
    try:
        with open("PFTP/user.txt") as f:
            allowed_user = f.readline() 
    except:
            pass
    return allowed_user
def main():
        allowed_user = user()
        print("""
   ___                          _       __ _                        _ _ 
  / _ \___  __ _  ___ ___   ___| | __  / _(_)_ __ _____      ____ _| | |
 / /_)/ _ \/ _` |/ __/ _ \ / __| |/ / | |_| | '__/ _ \ \ /\ / / _` | | |
/ ___/  __/ (_| | (_| (_) | (__|   <  |  _| | | |  __/\ V  V / (_| | | |
\/    \___|\__,_|\___\___/ \___|_|\_\ |_| |_|_|  \___| \_/\_/ \__,_|_|_|
                                                               Now start                                        
        
        """)
        subprocess.run(['usbipd', 'bind', '-b',bus_id], check=True, shell=True)
    # The window will disappear as soon as the program exits!
        # subprocess.run(['ipconfig'], check=True, shell=True)
        #input("Press enter to close the window. >")
        with pydivert.WinDivert("inbound and tcp") as w:
             # Loop over incoming packets
             for packet in w:
                if packet.tcp.dst_port == 3240 and packet.src_addr not in allowed_user:
                       # Drop the packet if it is on port 3240
                    print("Dropping packet to port 3240 from {} to {}:{}".format(packet.src_addr, packet.dst_addr, packet.tcp.dst_port))
                    continue
                # Send the packet back to the network
                w.send(packet)
if __name__ == "__main__":
    if not pyuac.isUserAdmin():
        print("selected usb bind")
        pyuac.runAsAdmin()
    else:        
        main()  # Already an admin here.
