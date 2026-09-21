(function injectTelemetryHUD() {
  // Prevent duplicate HUD elements
  if (document.getElementById("tabpulse-hud")) return;

  const hud = document.createElement("div");
  hud.id = "tabpulse-hud";
  hud.style.position = "fixed";
  hud.style.bottom = "15px";
  hud.style.right = "15px";
  hud.style.backgroundColor = "rgba(20, 20, 20, 0.85)";
  hud.style.color = "#10b981"; // Matrix Green
  hud.style.padding = "8px 12px";
  hud.style.borderRadius = "6px";
  hud.style.fontFamily = "monospace";
  hud.style.fontSize = "11px";
  hud.style.zIndex = "999999";
  hud.style.pointerEvents = "none";
  hud.style.border = "1px solid #059669";
  hud.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";

  document.body.appendChild(hud);

  function updateMetrics() {
    // Collect memory footprints when native window telemetry is available
    if (performance && performance.memory) {
      const usedMem = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
      const totalMem = (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(1);
      hud.textContent = `⚡ Pulse | JS Mem: ${usedMem}MB / ${totalMem}MB`;
    } else {
      hud.textContent = `⚡ Pulse | Shield Active (Profile Monitored)`;
    }
  }

  setInterval(updateMetrics, 2000);
  updateMetrics();
})();
