

const { wrap, configure } = require('agentql')
const puppeteer = require('puppeteer');

configure({ apiKey: '' });

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await  wrap(await browser.newPage());


  await page.goto('https://play.google.com/store/apps/details?id=com.TrimatraKajew.Kosan&hl=id');

  const data = await page.evaluate(() => {
    const heading = document.querySelector('h1')?.innerText;
    const ratings = document.querySelector('div.BHMmbe')?.innerText;
    const reviews = [];
    const reviewElements = document.querySelectorAll('div.DWPxHb'); 
    reviewElements.forEach(review => {
      const reviewerName = review.querySelector('span.X43Kjb')?.innerText; 
      const reviewText = review.querySelector('span[jsname="bN97Pc"]')?.innerText; 
      const reviewStars = review.querySelector('div.Pf5lIe')?.getAttribute('aria-label');

      reviews.push({
        reviewerName,
        reviewText,
        reviewStars
      });
    });
    
    
    return { heading, ratings, reviews};
  });

  console.log(data);

//   await page.waitForTimeout(10000);
  await browser.close();
})();
