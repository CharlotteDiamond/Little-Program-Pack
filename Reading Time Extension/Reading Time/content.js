// 创建浮动小方框
function createFloatingWindow() {
    const floatingWindow = document.createElement("div");
    floatingWindow.id = "word-counter-floating";
    document.body.appendChild(floatingWindow);
}

// 统计中文字数和英文字数
function countWords(text) {
    // 统计中文字数（按单个汉字统计）
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    const chineseCount = chineseChars.length;

    // 统计英文字数（不包括标点符号）
    const englishWords = text.match(/\b[a-zA-Z]+(?:[-'][a-zA-Z]+)*\b/g) || [];
    const englishCount = englishWords.length;
    const totalCount = chineseCount+englishCount;
    return { chineseCount, englishCount ,totalCount};
}
function calculateReadingTime(totalWords) {
    // 假设平均阅读速度为每分钟 600 字（个人速读速度）
    const wordsPerMinute = 600;
    const minutes = Math.ceil(totalWords / wordsPerMinute);
    return minutes;
}
// 更新浮动小方框的内容
function updateFloatingWindow() {
    // 获取页面可见文本内容
    const text = document.body.innerText;

    // 统计字数
    const { chineseCount, englishCount,totalCount } = countWords(text);
    const readingTime = calculateReadingTime(totalCount);

    // 更新浮动小方框的内容
    const floatingWindow = document.getElementById("word-counter-floating");
    if (floatingWindow) {
        floatingWindow.innerHTML = `
            <p>中文字数: ${chineseCount-17}</p>
            <p>英文字数: ${englishCount}</p>
            <p>总字数: <span id="total-count">${totalCount}</span></p>
            <p>预计阅读: <span id="reading-time">${readingTime}</span> 分钟</p>
        `;
    }
}
// 初始化浮动小方框
createFloatingWindow();
updateFloatingWindow();

// 监听消息，更新浮动小方框
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateWordCount") {
        updateFloatingWindow();
    }
});
