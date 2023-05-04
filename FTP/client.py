from ftplib import FTP

host = "127.0.0.1"
user = "junior"
password = "12345"

with FTP(host) as ftp:
    ftp.login(user=user,passwd=password)
    print(ftp.getwelcome())

    with open("test.txt","wb") as f:
        ftp.retrbinary("RETR " + "secreat.txt", f.write, 1024)
    ftp.quit()