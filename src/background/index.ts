import { Config } from "../utils/config";

chrome.tabs.onCreated.addListener(onUpdateTab);

async function onUpdateTab(tab: chrome.tabs.Tab) {
    var url = tab.url || tab.pendingUrl;
    if (url === "chrome://newtab/" || url === "edge://newtab/") {
        const saveUrl = await Config.Get("saveUrl");
        chrome.tabs.update({
            openerTabId: tab.openerTabId,
            url: saveUrl || "https://www.google.com/ncr",
        });
    }
}

chrome.tabs.query({}, function (tabs: chrome.tabs.Tab[]) {
    if (tabs !== undefined) tabs.forEach(onUpdateTab);
});
