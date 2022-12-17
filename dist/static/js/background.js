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
        var port = chrome.runtime.connectNative("com.peacock.ssh")
        port.postMessage(request.value)
        port.onMessage.addListener(function (message){
            console.log("" + message)
        })
        port.onDisconnect.addListener(function (error){
            console.log(error)
            console.log("last error:" + chrome.runtime.lastError.message)
        })
    }
})
