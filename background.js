let tabLastActiveTime = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  tabLastActiveTime[activeInfo.tabId] = Date.now();
});

chrome.alarms.create("pulseAudit", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pulseAudit") {
    // Get both the profile and the whitelist from storage
    chrome.storage.local.get(["sleepProfile", "whitelist"], (result) => {
      const profile = result.sleepProfile || "balanced";
      const whitelist = result.whitelist || [];
      
      const limits = {
        aggressive: 5 * 60 * 1000, 
        balanced: 30 * 60 * 1000,   
        developer: 120 * 60 * 1000  
      };

      const idleThreshold = limits[profile];

      chrome.tabs.query({ active: false, pinned: false }, (tabs) => {
        const now = Date.now();
        
        tabs.forEach((tab) => {
          // Check if the tab URL contains any word from our whitelist
          const isWhitelisted = whitelist.some(domain => tab.url && tab.url.includes(domain));
          
          if (isWhitelisted) {
            console.log(`TabPulse skipped whitelisted tab: ${tab.url}`);
            return; // Skip this tab, do not freeze it
          }

          const lastActive = tabLastActiveTime[tab.id] || now;
          if (now - lastActive > idleThreshold) {
            chrome.tabs.discard(tab.id);
            console.log(`TabPulse safely put Tab ${tab.id} to sleep.`);
          }
        });
      });
    });
  }
});
