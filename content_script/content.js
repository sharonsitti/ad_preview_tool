chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = request.data || {};

    var newNode = document.createElement('div');
    newNode.innerHTML = data.adString;

    document.querySelector(data.container).appendChild(newNode);

    sendResponse({data: data, success: true});
});