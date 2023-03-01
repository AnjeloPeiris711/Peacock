import eel
import os
eel.init('web')
@eel.expose
def getData():
    return "ok"
@eel.expose
def sendData(msg):
    print(msg)
eel.start("index.html")