export default async function getssh() {
    var host = {
        server: {
            host: "172.104.180.45",
            userName: "root",
            password: "(Ap0711@)",

        },
        commands: [
            "`This is a message that will be added to the full sessionText`",
            "msg:This is a message that will be displayed during the process",
            "cd ~/",
            "ls -l"
        ]
    };

    var SSH2Shell = require('ssh2shell'),
        SSH = new SSH2Shell(host);

    var callback = function (sessionText) {
        console.log(sessionText);
    }
    SSH.connect(callback);
    // const resp = await callback.json()
    // return resp[0].data
}