chrome.action.onClicked.addListener(function (tab) {
    // 检查当前页面是否支持扩展
    if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
        console.log("Extension is not supported on this page.");
        return;
    }
    // 动态注入 content.js
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    }, function () {
        // 注入完成后发送消息
        chrome.tabs.sendMessage(tab.id, { action: "show" }, function (response) {
            if (chrome.runtime.lastError) {
                console.error("Failed to send message:", chrome.runtime.lastError);
            }
        });
    });
});