const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await page.goto('file://' + process.argv[2]);
  await page.waitForTimeout(300);
  // e-like stroke via pen pointer events in pad
  async function drawE(holderSel, ox, oyFrac, pen) {
    await page.evaluate(({ holderSel, ox, oyFrac, pen }) => {
      const ink = document.querySelector(holderSel + ' .pad-ink');
      const r = ink.getBoundingClientRect();
      // geometry: 1 row: P = 1+1+1+0.7=3.7; scale = h/(rows*P)
      const rows = Math.round(r.height / (r.height)); // ignore
      const P = 3.7, sc = r.height / P * (oyFrac);
      const base = r.top + (0.35 + 2) * sc, mid = base - sc;
      const pts = [];
      // e: start at middle of band, go right, up around, down to baseline, end
      const cx = r.left + ox * sc, cy = (mid + base) / 2;
      pts.push([cx - 0.4 * sc, cy]); pts.push([cx + 0.4 * sc, cy]);
      for (let a = 0; a <= 1.75 * Math.PI; a += 0.12) pts.push([cx + 0.4 * sc * Math.cos(-a), cy + 0.5 * sc * Math.sin(-a)]);
      let t = performance.now();
      const fire = (type, x, y) => ink.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: pen ? 'pen' : 'mouse', clientX: x, clientY: y, pressure: 0.4, bubbles: true, cancelable: true, button: 0, buttons: 1 }));
      fire('pointerdown', ...pts[0]);
      for (const p of pts.slice(1)) fire('pointermove', ...p);
      fire('pointerup', ...pts[pts.length - 1]);
    }, { holderSel, ox, oyFrac, pen });
  }
  for (let i = 0; i < 3; i++) await drawE('#padHolder', 1 + i * 1.6, 1, true);
  await page.click('#evalBtn');
  await page.waitForTimeout(200);
  console.log('RESULT1:', (await page.textContent('#resultPanel')).slice(0, 600));
  // record template
  await page.click('[data-tab=alphabet]');
  await page.waitForTimeout(200);
  await page.selectOption('#recTarget', 'va');
  await drawE('#recHolder', 1.2, 1, false);
  await page.click('#recSave');
  await page.waitForTimeout(200);
  await page.click('[data-tab=draw]');
  await page.waitForTimeout(200);
  for (let i = 0; i < 2; i++) await drawE('#padHolder', 1 + i * 1.6, 1, false);
  await page.click('#evalBtn');
  await page.waitForTimeout(200);
  console.log('RESULT2:', (await page.textContent('#resultPanel')).slice(0, 700));
  await page.click('#playMotionBtn'); await page.waitForTimeout(500);
  await page.screenshot({ path: 'studio.png' });
  // word mode
  await page.click('[data-mode=word]'); await page.waitForTimeout(200);
  console.log('WORDS:', await page.textContent('#wordChips'), '|', await page.textContent('#connChips'));
  await page.click('[data-mode=free]'); await page.waitForTimeout(200);
  await page.click('[data-tab=stats]'); await page.waitForTimeout(300);
  console.log('STATS:', (await page.textContent('#statCards')));
  await page.screenshot({ path: 'stats.png', fullPage: true });
  await page.click('[data-tab=paper]'); await page.waitForTimeout(200);
  await page.click('#wsPreviewBtn'); await page.waitForTimeout(1500);
  const src = await page.getAttribute('#wsPreview img', 'src');
  console.log('WS img', !!src);
  await page.screenshot({ path: 'paper.png', fullPage: true });
  await page.click('[data-tab=users]'); await page.waitForTimeout(200);
  console.log('USERS:', (await page.textContent('#usersList')));
  // xss check
  await page.fill('#newUserName', '<img src=x onerror=alert(1)>');
  await page.click('#createUserBtn'); await page.waitForTimeout(200);
  console.log('XSS imgs in list:', await page.$$eval('#usersList img', a => a.length));
  console.log('ERRORS', errs);
  // worksheet render as file
  const ws = await page.evaluate(() => buildWorksheet().toDataURL('image/png'));
  require('fs').writeFileSync('ws.png', Buffer.from(ws.split(',')[1], 'base64'));
  await b.close();
})();
