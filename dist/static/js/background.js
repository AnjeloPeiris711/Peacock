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
chrome.runtime.onMessage.addListener(function (request,sender){
    if(request.type=='info')
    {
        // Listen for messages from the app
        var port = chrome.runtime.connectNative("com.peacock.ssh")
        //sending message
        console.log("sending:ssh data")
        port.postMessage(request.value)
        port.onMessage.addListener(function (message){
            console.log("Recived"+message)
        })
        port.onDisconnect.addListener(function (error){
            console.log(error)
            console.log("last error:" + chrome.runtime.lastError.message)
        })
    }
})
