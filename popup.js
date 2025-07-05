const toggle = document.getElementById("toggle");

chrome.storage.sync.get(["enabled"], (result) => {
  toggle.checked = result.enabled !== false;
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (enabled) => {
        const existing = document.getElementById("yt-title-style");
        if (enabled && !existing) {
          const style = document.createElement("style");
          style.id = "yt-title-style";
          style.textContent = `
            .ytp-fullscreen .ytp-title {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
        } else if (!enabled && existing) {
          existing.remove();
        }
      },
      args: [enabled]
    });
  });
});
