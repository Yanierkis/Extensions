// https://github.com/WindzCUHK/chrome-highlight-extension
// https://github.com/padolsey/findAndReplaceDOMText/blob/master/src/findAndReplaceDOMText.js

const words = ["pina", "Pinas", "pinas", "Pina", "Piña", "Piñas","piña", "piñas"];
const regex = new RegExp(`(${words.join("|")})\\b`, "gi");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "pina_count") {
    sendResponse(countCats());
  }

  if (msg.text === "cat_highlight") {
    highlightCats();
  }
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "pina_count") {
    sendResponse(countCats());
  }
});

const countCats = () => {
  var content =
    document.body["innerText" in document.body ? "innerText" : "textContent"];
  content = removeScriptsFromContent(content);
  var regex = /(pina|pinas|piña|piñas)[\s.,]/gi;

  return content.match(regex)?.length || 0;
};

const removeScriptsFromContent = (strCode) => {
  return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
};