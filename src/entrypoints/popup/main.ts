import { mount } from 'svelte';
import App from './app.svelte';
import './app.css';

const appElement = document.getElementById('app');
if (!appElement) throw new Error('App element not found');

const app = mount(App, {
  target: appElement,
});

export default app;
