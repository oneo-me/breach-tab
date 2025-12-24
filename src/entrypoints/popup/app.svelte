<script lang="ts">
import { setConfig } from '../../utils/config'

interface Item {
  width: number
  height: number
  header: string
}

const items: Item[] = [
  { width: 900, height: Math.ceil((900 / 4) * 3), header: 'Desktop' },
  { width: 1024, height: Math.ceil((1024 / 4) * 3), header: 'Desktop Plus' },
  { width: 1366, height: Math.ceil((1366 / 4) * 3), header: 'Desktop Max' },
  { width: 320, height: Math.ceil((320 / 9) * 17), header: 'Phone' },
  { width: 380, height: Math.ceil((380 / 9) * 17), header: 'Phone Plus' },
  { width: 420, height: Math.ceil((420 / 9) * 17), header: 'Phone Max' },
]

async function getCurrentTab() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  if (tabs === undefined || tabs.length <= 0) return undefined
  return tabs[0]
}

async function openTab(width: number, height: number) {
  const tab = await getCurrentTab()
  if (tab === undefined) return

  browser.windows.create({
    url: tab.url,
    type: 'popup',
    width: width,
    height: height,
  })

  window.close()
}

async function setNewTabUrl(url: string | undefined) {
  if (url === undefined) return

  const result = prompt('Set the following link as the default tab?', url)
  if (result !== null) {
    await setConfig('saveUrl', result)
  }

  window.close()
}

async function setNewTab() {
  const tab = await getCurrentTab()
  if (tab === undefined) return

  setNewTabUrl(tab.url || tab.pendingUrl)
}

async function reset() {
  setNewTabUrl('https://www.google.com/ncr')
}
</script>

<div class="text-sm">
  <div class="flex flex-col">
    {#each items as item}
      <button
        onclick={() => openTab(item.width, item.height)}
        class="flex-1 flex flex-col place-items-start px-3 py-1 bg-accent/0 hover:bg-accent transition-colors duration-150">
        <p >{item.header}</p>
        <p class="text-xs opacity-50">{item.width} × {item.height}</p>
      </button>
    {/each}
  </div>
  <div class="text-xs flex border-t border-border">
    <button
      onclick={setNewTab}
      class="flex-1 px-2 py-1 bg-accent/0 hover:bg-accent transition-colors duration-150"
    >
      Set new
    </button>
    <button
      onclick={reset}
      class="flex-1 px-2 py-1 bg-accent/0 hover:bg-accent transition-colors duration-150"
    >
      Reset
    </button>
  </div>
</div>
