export class Config {
    public static async Get(key: string): Promise<any> {
        const config = await chrome.storage.sync.get([key]);
        return config[key];
    }
    public static async Set(key: string, value: any): Promise<void> {
        await chrome.storage.sync.set({ [key]: value });
    }
}
