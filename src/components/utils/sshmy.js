var host = {
    server:        {
        host:         "172.104.180.45",
        userName:     "junior",
        password:     "0711",
    },
    commands:      [ "" ]
};

var SSH2Shell = require ('ssh2shell'),
    SSH = new SSH2Shell(host),
    callback = function(sessionText){
        console.log(sessionText)
    }

//Start the process
SSH.connect(callback);