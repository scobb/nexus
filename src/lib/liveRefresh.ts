/** Renders the pulsing Live indicator + Pause/Resume toggle button */
export function liveRefreshBar(): string {
  return `<div class="flex items-center gap-2">
    <div id="live-indicator" class="flex items-center gap-1.5 text-xs text-green-400">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
      </span>
      Live
    </div>
    <button id="live-toggle" class="text-xs text-gray-400 hover:text-white border border-gray-700 rounded px-2 py-0.5 transition-colors">Pause</button>
  </div>`
}

/** CSS animation for newly-appeared trace rows */
export function liveRefreshStyle(): string {
  return `<style>
  @keyframes trace-flash { 0% { background-color: rgba(99,102,241,0.18); } 100% { background-color: transparent; } }
  .trace-new { animation: trace-flash 3s ease-out forwards; }
  </style>`
}

/**
 * Auto-refresh script — reads/writes localStorage('nexusLive') and
 * sessionStorage('nexusLastTraceIds') to track new rows and drive the timer.
 * Pages that don't want auto-refresh (trace detail) simply don't include this script.
 */
export function liveRefreshScript(): string {
  // The closing </script> tag must be escaped to avoid breaking the template literal
  return `<script>
(function() {
  var LS_KEY = 'nexusLive';
  var SS_KEY = 'nexusLastTraceIds';
  var autoRefresh = localStorage.getItem(LS_KEY) !== 'false';
  var timer = null;

  // Highlight traces that are new since the last page load
  var currentIds = Array.from(document.querySelectorAll('[data-trace-id]')).map(function(el) {
    return el.getAttribute('data-trace-id');
  });
  var prevIds = [];
  try { prevIds = JSON.parse(sessionStorage.getItem(SS_KEY) || '[]'); } catch(e) {}
  var prevSet = new Set(prevIds);
  currentIds.forEach(function(id) {
    if (!prevSet.has(id)) {
      var row = document.querySelector('[data-trace-id="' + id + '"]');
      if (row) {
        row.classList.add('trace-new');
        setTimeout(function() { row.classList.remove('trace-new'); }, 3000);
      }
    }
  });
  sessionStorage.setItem(SS_KEY, JSON.stringify(currentIds));

  var indicator = document.getElementById('live-indicator');
  var btn = document.getElementById('live-toggle');

  function updateUI() {
    if (indicator) indicator.style.display = autoRefresh ? '' : 'none';
    if (btn) btn.textContent = autoRefresh ? 'Pause' : 'Resume';
  }
  function startTimer() { timer = setTimeout(function() { location.reload(); }, 30000); }
  function stopTimer() { clearTimeout(timer); timer = null; }

  if (autoRefresh) startTimer();
  updateUI();

  if (btn) {
    btn.addEventListener('click', function() {
      autoRefresh = !autoRefresh;
      localStorage.setItem(LS_KEY, String(autoRefresh));
      if (autoRefresh) { startTimer(); } else { stopTimer(); }
      updateUI();
    });
  }
})();
<\/script>`
}
