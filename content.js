(function() {
  const originalCredentialsCreate = navigator.credentials.create;
  const originalCredentialsGet    = navigator.credentials.get;

  navigator.credentials.create = function(options) {
    console.log('navigator.credentials.create:');
    console.log(options);
    console.log(JSON.stringify(options, replacer, "\t"));
    console.log(options.publicKey.authenticatorSelection.authenticatorAttachment);

    deleteAuthenticatorAttachment = false;
    if(chrome.storage) {	// TODO: make available in isolated worlds
      chrome.storage.local.get('deleteAuthenticatorAttachment', function(items) {
        deleteAuthenticatorAttachment = items.deleteAuthenticatorAttachment;
      });
    } else {
      console.warn("chrome.storage API not available");
    }

    // make registration work with cross-platform authenticators
    if(deleteAuthenticatorAttachment) {
      if( options.publicKey.authenticatorSelection.authenticatorAttachment === "platform" ) {
        delete(options.publicKey.authenticatorSelection.authenticatorAttachment);
      }
    }
    const promise = originalCredentialsCreate.apply(this, arguments);
    return promise;
  };

  navigator.credentials.get = function(options) {
    console.log('navigator.credentials.get:');
    console.log(options);
    console.log(JSON.stringify(options, replacer, "\t"));
    const promise = originalCredentialsGet.apply(this, arguments);
    return promise;
  };

  // base64url-encode arrayBuffer 
  function encodeAB(value) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(value)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
  }

  function replacer(key, value) {
    const abKeys = ["challenge", "id"]; // ArrayBuffer keys
    if (abKeys.includes(key)) {
      return encodeAB(value);
    }
    return value;
  }

  console.warn('WARNING: intercepting webauthn API calls');
})();
