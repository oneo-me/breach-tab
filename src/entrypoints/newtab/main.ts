import { getConfig } from '../../utils/config';

async function redirectToSavedUrl() {
  const saveUrl = await getConfig('saveUrl');
  const targetUrl = saveUrl || 'https://www.google.com/ncr';
  window.location.replace(targetUrl);
}

redirectToSavedUrl();

const interval = setInterval(() => {
  redirectToSavedUrl();
}, 1000);

window.addEventListener('beforeunload', () => {
  clearInterval(interval);
});
