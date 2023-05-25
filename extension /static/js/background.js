function onclickRun() {
    chrome.action.onClicked.addListener(function (tab) {
        chrome.tabs.create({
            url: chrome.runtime.getURL("index.html"),
            selected:true,
            active:true
        });
    });
}
onclickRun();
var port = chrome.runtime.connectNative("com.peacock.ssh")
chrome.runtime.onMessage.addListener(function (request,sender,sendResponse){
    if (request.type == 'info') {
        // Listen for messages from the app
        //var port = chrome.runtime.connectNative("com.peacock.ssh")
        //sending message
        console.log("sending:ssh data")
        port.postMessage(request.value)
        port.onMessage.addListener(function (message){
            console.log("Recived:" + message)
            chrome.runtime.sendMessage({
                type:'data',
                value: message
            })
        })
        // port.onDisconnect.addListener(function (error){
        //     console.log(error)
        //     console.log("last error:" + chrome.runtime.lastError.message)
        // })
    }
    if (request.type == 'password') {
        console.log("sending:password " +request.value)
        port.postMessage(request.value)
        // port.onMessage.addListener(function (message) {
        //     console.log("Recivedssh:" + message)
        //     chrome.runtime.sendMessage({
        //         type: 'command',
        //         value: message
        //     })
        // })
    }
    if (request.type == 'sshcommand') {
        console.log("sending:command " +request.value)
        port.postMessage(request.value)
        port.onMessage.addListener(function (message) {
            console.log("Recivedssh:" + message)
            chrome.runtime.sendMessage({
                type: 'command',
                value: message
            })
        })
    }
    if (request.type == 'USBInfo') {
        port.postMessage(request.value)
    }
    if (request.type == 'uplordfiledata'){
        port.postMessage(request.value)
    }
    if (request.type == 'requestSFile'){
        port.postMessage(request.value)
    }
    if (request.type == 'Serverfiledata'){
        port.postMessage(request.value)
        port.onMessage.addListener(function (message) {
            console.log("severfile:"+ message)
            chrome.runtime.sendMessage({
                type:'Sfile_data',
                value: message
            })
        })
    }
    if (request.type == 'exit') {
        port.postMessage(request.value)
        console.log("port disconnect")
        disconnect()
    }
    port.onDisconnect.addListener(function (error){
        console.log(error)
        console.log("last error:" + chrome.runtime.lastError.message)
    })
})

