<script lang="ts">
    import { Config } from "../../utils/config";
    import Icon from "./icon.svelte";
    class Item {
        width: number;
        height: number;
        header: string;
        constructor(width: number, height: number, header: string) {
            this.width = width;
            this.height = height;
            this.header = header;
        }
    }

    const items: Item[] = [];

    items.push(new Item(900, Math.ceil((900 / 4) * 3), "Desktop"));
    items.push(new Item(1024, Math.ceil((1024 / 4) * 3), "Desktop Plus"));
    items.push(new Item(1366, Math.ceil((1366 / 4) * 3), "Desktop Max"));
    items.push(new Item(320, Math.ceil((320 / 9) * 17), "Phone"));
    items.push(new Item(380, Math.ceil((380 / 9) * 17), "Phone Plus"));
    items.push(new Item(420, Math.ceil((420 / 9) * 17), "Phone Max"));

    async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs === undefined || tabs.length <= 0) return undefined;
        return tabs[0];
    }

    async function openTab(width: number, height: number) {
        const tab = await getCurrentTab();
        if (tab === undefined) return;

        chrome.windows.create({
            url: tab.url,
            type: "popup",
            width: width,
            height: height,
        });

        window.close();
    }
    async function setNewTabUrl(url: string | undefined) {
        if (url == undefined) return;

        var result = prompt("Set the following link as the default tab?", url);
        if (result != null) {
            Config.Set("saveUrl", result);
        }

        window.close();
    }
    async function setNewTab() {
        const tab = await getCurrentTab();
        if (tab === undefined) return;

        setNewTabUrl(tab.url || tab.pendingUrl);
    }

    async function reset() {
        setNewTabUrl("https://www.google.com/ncr");
    }
</script>

<div id="root">
    <div id="footer">
        {#each items as item}
            <button on:click={() => openTab(item.width, item.height)}>
                <div class="left">
                    <Icon width={item.width} height={item.height} />
                </div>
                <div class="right">
                    <p class="header">{item.header}</p>
                    <p>{item.width} x {item.height}</p>
                </div>
            </button>
        {/each}
    </div>
    <div id="header">
        <button on:click={reset}>Reset</button>
        <button on:click={setNewTab} class="right">Set as new tab</button>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }
    #root {
        width: 170px;
    }
    #header {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        display: flex;
        position: sticky;
        top: 0;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
    }
    #header button {
        font-size: 12px;
        background: none;
        border: none;
        padding: 0;
        margin: 5px 10px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.9);
    }
    #header button:hover {
        color: rgb(0, 106, 255);
    }
    #header .right {
        margin-left: auto;
    }
    #footer {
        display: flex;
        flex-direction: column;
        margin-top: -1px;
    }
    #footer button {
        font-size: 12px;
        background: none;
        border: none;
        padding: 6px 12px;
        color: rgba(0, 0, 0, 0.9);
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0);
        text-align: left;
    }
    #footer button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    #footer button .right {
        margin-left: 12px;
    }
    #footer button p {
        padding: 0;
        margin: 0;
        color: rgba(0, 0, 0, 0.5);
    }
    #footer button p.header {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
    }
</style>
