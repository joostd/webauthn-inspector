const originalGet = navigator.credentials.get;
const originalCreate = navigator.credentials.create;

console.log("%cWebAuthn Tracer is active", "color: red");

// Note that this will log any call to the Credential Management API (not just for WebAuthn)
// https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API

function logAttestation(attestation) {
  console.log('Attestation: ', attestation);
}

function logAssertion(assertion) {
  console.log('Assertion: ', assertion);
}

navigator.credentials.create = function( options ) {
  console.log('%cnavigator.credentials.create: ', "color: green");
  console.log('CredentialCreationOptions: ', options);
  const promise = originalCreate(options);
  promise.then(logAttestation).catch(console.error);
  return promise;
}

navigator.credentials.get = function( options ) {
  console.log('%cnavigator.credentials.get: ', "color: green");
  console.log('CredentialRequestOptions: ', options);
  const promise = originalGet(options);
  promise.then(logAssertion).catch(console.error);
  return promise;
}
