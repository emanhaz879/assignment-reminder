(async () => {
  // Serve a static manifest from the same GitHub Pages site. No tracking, no backend.
  const version = document.getElementById('version');
  const download = document.getElementById('download-link');
  const note = document.getElementById('download-note');
  const astronaut = document.getElementById('astronaut-release');
  const officialRelease = (url) => {
    try { const u = new URL(url); return u.protocol === 'https:' && u.hostname === 'github.com' && u.pathname.startsWith('/emanhaz879/assignment-reminder/releases/'); }
    catch { return false; }
  };
  try {
    const r = await fetch('updates/manifest.json', {cache:'no-store'});
    if (!r.ok) throw new Error('manifest unavailable');
    const m = await r.json();
    if (m.schema !== 1 || !m.app) throw new Error('manifest invalid');
    version.textContent = `Current release: ${m.app.version}`;
    if (officialRelease(m.app.release_page)) {
      download.href = m.app.release_page;
      download.textContent = 'View Windows downloads';
      download.classList.remove('disabled-link');
      download.removeAttribute('aria-disabled');
      note.textContent = 'Choose the installer or portable build on the official GitHub Releases page.';
    }
    const theme = (m.themes || []).find(x => x.name === 'Astronaut Adventures');
    if (theme && officialRelease(theme.release_page)) {
      astronaut.href = theme.release_page;
      astronaut.hidden = false;
    }
  } catch { version.textContent = 'Version information temporarily unavailable'; }
})();
