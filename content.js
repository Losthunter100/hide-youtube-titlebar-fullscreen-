function applyCSS(enabled) {
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
}

chrome.storage.sync.get(["enabled"], (result) => {
  const enabled = result.enabled !== false; // default to true
  applyCSS(enabled);
});
