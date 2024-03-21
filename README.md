# WebAuthn Tracer

Simple Chrome Extension that logs webauthn API calls to the console.

This is extension can be used for debugging web pages that use the WebAuthn API for creating attestations or assertions.
It will dump arguments to and results from calls to `navigator.credentials.create` and `navigator.credentials.get`.

# Install

To load the extension into Chrome:

- Open Chrome and go to chrome://extensions/.
- Enable "Developer mode" in the top right corner.
- Click on "Load unpacked" and select the directory containing your extension files.

