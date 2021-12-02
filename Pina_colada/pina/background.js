const maxMeows = 6; //only one time

// The extension listens to the onUpdated event, and executes when the page is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    detectPinas(tabId);
  }
});

// It executes the cat detection as well when we switch tabs on the active tab
chrome.tabs.onActivated.addListener((activeTab) => detectPinas(activeTab.tabId));

const detectPinas = (tabId) => {
  // Here we clear the badge
  chrome.browserAction.setBadgeText({ text: "" });
  // Then we send a message to the content script, together with a callback
  chrome.tabs.sendMessage(tabId, { text: "pina_count" }, onPinaCount);
};

// This is the callback called by the content script
const onPinaCount = (pinaNumber) => {
  if (!pinaNumber) {
    deactivateIcon();
  } else {
    // When cats are detected, show an animation on the badge
    animateBadge(pinaNumber);
  }
};

const deactivateIcon = () => {
  // Here we detect what the active tab is and disable the action
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    chrome.browserAction.disable(activeTab[0].id);
  });
};

const animateBadge = (pinaNumber) => {
  // Limit meows, we don't want 1000 sounds to be played
  let i = pinaNumber - maxMeows > 0 ? pinaNumber - maxMeows : 1;
  let j = 0;
  // Cats will meow at random times

if(pinaNumber>0){
   (new Audio(chrome.runtime.getURL(`audios/pina_song.mp3`))).play();
};


};




