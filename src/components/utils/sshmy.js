export default async function getssh() {
    var sshconfig = {
        host: '172.104.180.45',
        username: 'root',
        password: '(Ap0711@)'
    }
    var ssh = new SSH2Promise(sshconfig);
//Promise
    ssh.connect().then(() => {
        console.log("Connection established")
    });
//Async Await
    await ssh.connect();
    console.log("Connection established");

//Close the ssh connection
//very important otherwise event leaks can happen
    ssh.close();

}