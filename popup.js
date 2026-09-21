const select = document.getElementById("profileSelect");
const whitelistInput = document.getElementById("whitelistInput");
const status = document.getElementById("statusNotify");

// Load stored preferences when popup opens
chrome.storage.local.get(["sleepProfile", "whitelist"], (result) => {
  if (result.sleepProfile) select.value = result.sleepProfile;
  if (result.whitelist) whitelistInput.value = result.whitelist.join("\n");
});

// Helper function to save everything
function saveSettings() {
  const profile = select.value;
  // Split lines into an array and clean up spaces
  const whitelist = whitelistInput.value.split("\n").map(item => item.trim()).filter(Boolean);

  chrome.storage.local.set({ sleepProfile: profile, whitelist: whitelist }, () => {
    status.style.display = "block";
    setTimeout(() => { status.style.display = "none"; }, 2000);
  });
}

// Save when dropdown changes or when user stops typing in the whitelist
select.addEventListener("change", saveSettings);
whitelistInput.addEventListener("input", saveSettings);
