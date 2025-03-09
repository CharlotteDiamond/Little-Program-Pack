// 监听消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "show") {
        createFloatingWindow();
    }
});

function createFloatingWindow() {
    // 如果浮动窗口已经存在，则先移除
    const existingWindow = document.getElementById("reading-time-floating");
    if (existingWindow) {
        existingWindow.remove();
    }

    // 创建浮动窗口
    const floatingWindow = document.createElement("div");
    floatingWindow.id = "reading-time-floating";

    // 获取页面可见文本内容
    let text = "";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement && isElementVisible(node.parentElement)) {
            text += node.textContent + " ";
        }
    }

    // 统计字数
    const { chineseCount, englishCount, totalCount } = countWords(text);
    const readingTime = calculateReadingTime(totalCount);

    // 设置浮动窗口内容
    floatingWindow.innerHTML = `
        <div id="close-btn">×</div>
        <p>中文字数: <span id="chinese-count">${chineseCount}</span></p>
        <p>英文字数: <span id="english-count">${englishCount}</span></p>
        <p>总字数: <span id="total-count">${totalCount}</span></p>
        <p>预计阅读: <span id="reading-time">${readingTime}</span> 分钟</p>
    `;

    // 添加关闭按钮事件
    floatingWindow.querySelector("#close-btn").addEventListener("click", function () {
        floatingWindow.remove();
    });

    // 将浮动窗口添加到页面中
    document.body.appendChild(floatingWindow);
}

function countWords(text) {
    // 统计单个中文字数（不包括中文标点符号）
    const chineseWords = text.match(/[\u4e00-\u9fa5]/g)|| [];
    const chineseCount = chineseWords.length;

    // 统计单个英文字数（不包括标点符号）
    const englishWords = text.match(/\b[a-zA-Z]+(?:[-'][a-zA-Z]+)*\b/g) || [];
    const englishCount = englishWords.length;

    // 总字数
    const totalCount = chineseCount + englishCount;

    return { chineseCount, englishCount, totalCount };
}
function calculateReadingTime(totalWords) {
    // 假设平均阅读速度为每分钟 200 字
    const wordsPerMinute = 600;
    const minutes = Math.ceil(totalWords / wordsPerMinute);
    return minutes;
}

function isElementVisible(element) {
    // 检查元素是否可见
            if (!element) return false;
            if (element.style.display === "none" || element.style.visibility === "hidden") return false;
            if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
            if (window.getComputedStyle(element).opacity === "0") return false;
            return true;
        }
function getVisibleText(element) {
    // 获取可见文本内容
    if (element.style.display === "none" || element.style.visibility === "hidden") {
        return "";
    }
    return element.innerText || element.textContent;
}
