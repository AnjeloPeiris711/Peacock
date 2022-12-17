const ssh = require('ssh2-client');

const HOST = 'junior@172.104.180.45';

// Exec commands on remote host over ssh
ssh
    .exec(HOST, 'touch try')
    .then(() => ssh.exec(HOST, 'ls -l try'))
    .then(output => {
        const { out, error } = output;
        console.log(out);
        console.error(error);
    })
    .catch(err => console.error(err));

// Setup a live shell on remote host
ssh
    .shell(HOST)
    .then(() => console.log('Done'))
    .catch(err => console.error(err));

// Enable interactive password prompt
// askPassword option is only needed for the first command
const opts = {
    askPassword: true,
};

ssh
    .exec(HOST, 'touch try', opts)
    .then(() => ssh.exec(HOST, 'ls -l try'))
    .then(output => {
        const { out, error } = output;
        console.log(out);
        console.error(error);
    })
    .catch(err => console.error(err));