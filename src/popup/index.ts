import * as svelte from "svelte";
import App from "./app/main.svelte";

const container = document.getElementById("app");
const app = svelte.mount(App, {
    target: container as HTMLElement,
});

export default app;
