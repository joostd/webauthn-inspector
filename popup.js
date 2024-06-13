console.log('popup');

document.querySelector("#deleteAuthenticatorAttachment").addEventListener('change', (e) => {
  e.target.value = e.target.value == "no" ? "yes" : "no";
  chrome.runtime.sendMessage({ text: e.target.value });
});
