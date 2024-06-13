console.log('background script');

chrome.storage.local.get('deleteAuthenticatorAttachment', function(items) {
  console.log('Settings retrieved', items);
  console.log(items.deleteAuthenticatorAttachment);
});

chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg.text);
});

chrome.contextMenus.onClicked.addListener(menuItemOnClick);

function menuItemOnClick(info) {
  switch (info.menuItemId) {
    case 'deleteAuthenticatorAttachment':
      chrome.storage.local.set({'deleteAuthenticatorAttachment': info.checked}, function() {
        console.log('deleteAuthenticatorAttachment set to:', info.checked);
      });
      break;
    default:
      console.log(`menu item ${info.menuItemId}`);
  }
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'delete AuthenticatorAttachment',
    type: 'checkbox',
    id: 'deleteAuthenticatorAttachment'
  });

});
