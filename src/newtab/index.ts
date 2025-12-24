import { Config } from "../utils/config";

async function redirectToSavedUrl() {
    const saveUrl = await Config.Get("saveUrl");
    const targetUrl = saveUrl || "https://www.google.com/ncr";
    window.location.replace(targetUrl);
}

redirectToSavedUrl();
