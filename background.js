// Register the JavaScript to be injected into compose windows
messenger.composeScripts.register({
  js: [{ file: "compose-script.js" }]
});

console.log("Quote Color extension loaded - compose scripts registered");