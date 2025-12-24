export async function getConfig(key: string): Promise<string | undefined> {
  const config = await browser.storage.sync.get([key]);
  return config[key] as string;
}

export async function setConfig(key: string, value: string): Promise<void> {
  await browser.storage.sync.set({ [key]: value });
}

export async function deleteConfig(key: string): Promise<void> {
  await browser.storage.sync.remove(key);
}
