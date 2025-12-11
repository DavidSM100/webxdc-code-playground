const device = document.getElementById("device");
const input = document.getElementById("input");
const form = document.getElementById("form");
const output = document.getElementById("output");

device.innerText = "This is " + window.webxdc.selfName;

function sendMsg(e) {
  e.preventDefault();
  const msg = window.webxdc.selfName + ": " + input.value;
  window.webxdc.sendUpdate({ payload: msg, info: msg }, "");
  input.value = "";
}
form.onsubmit = sendMsg;

function receiveUpdate(update) {
  output.innerText += update.payload + "\n";
}
window.webxdc.setUpdateListener(receiveUpdate, 0);
