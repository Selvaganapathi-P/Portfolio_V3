const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITES = [
  { url: 'https://gle-studio.vercel.app/', name: 'studiopro' },
  { url: 'https://kidzoo-learn.vercel.app/', name: 'kidzoo' },
  { url: 'https://cinevalutzone.netlify.app', name: 'cinevault' },
];

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'previews');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  for (const site of SITES) {
    console.log(`Capturing ${site.name}...`);
    try {
      const page = await context.newPage();
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);
      const dest = path.join(outputDir, `${site.name}.png`);
      await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 } });
      await page.close();
      console.log(`  ✓ Saved ${site.name}.png`);
    } catch (err) {
      console.error(`  ✗ Failed ${site.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done.');
}

main();
