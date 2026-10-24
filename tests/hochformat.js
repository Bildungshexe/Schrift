const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 1, hasTouch: true });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + process.argv[2]); await page.waitForTimeout(400);
  await page.screenshot({ path: 'portrait.png' });
  await page.click('[data-tab=alphabet]'); await page.waitForTimeout(300);
  await page.screenshot({ path: 'alpha.png', fullPage: false });
  console.log('ERR', errs);
  await b.close();
})();
