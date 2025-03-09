// 监听页面加载、刷新或导航事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        // 向内容脚本发送消息，触发字数统计
        chrome.tabs.sendMessage(tabId, { action: "updateWordCount" });
    }
});