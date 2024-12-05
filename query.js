const { chromium } = require("playwright");
const { configure, wrap } = require("agentql");

const URL = "https://play.google.com/store/apps/details?id=jp.pokemon.pokemontcgp&hl=id";

async function main() {
    // Configure the AgentQL API key
    configure({
        apiKey: "EpA2HIHHUjCvg6U4n3ZXdTWO9S1DPeFWdR8eLXDCtH7SJi7kAPu60A", // This is the default and can be omitted.
    });

    const browser = await chromium.launch({ headless: false });
    const page = await wrap(await browser.newPage());
    await page.goto(URL);

    const SEARCH_QUERY = `
  {
    search_input
    search_btn
  }
  `;

    const VIDEO_QUERY = `
  {
    videos[] {
      video_link
      video_title
      channel_name
    }
  }
  `;

    const VIDEO_CONTROL_QUERY = `
  {
    play_or_pause_btn
    expand_description_btn
  }
  `;

    const DESCRIPTION_QUERY = `
  {
    description_text
  }
  `;

    const COMMENT_QUERY = `
  {
    comments[] {
      channel_name
      comment_text
    }
  }
  `;

    const ALL_GAMES_QUERY = `
    {
    games[]{
        app_name
        ratings
        developer
        }
    }
  `;

    const GAMES_DETAILS = `
  {
    application[]{
        name
        developer
        ratings
        download
        description(string 150)
     
    }
}
  `

    const REVIEW_QUERY = `
  {
    review[]{
            user
            comments
            ratings
        
        }
  }
  `
    const COMMENTS_CONTROL_QUERY = `
 { lihat_semua_ulasan }
  `

    //   const HOMEPAGE_QUERY = `
    //   {
    //     app[]{
    //         app_link: a[href*='/store/apps/details?id=']
    //         app_name: div[role='heading']
    //     }
    //   }
    //   `
    //   try {
    //     // search query
    //     const searchResponse = await page.queryElements(SEARCH_QUERY);
    //     await searchResponse.search_input.type('machine learning', { delay: 75 });
    //     await searchResponse.search_btn.click();

    //     // video query
    //     const videoResponse = await page.queryElements(VIDEO_QUERY);
    //     console.log(
    //       `Clicking Youtube Video: ${await videoResponse.videos[0].video_title.textContent()}`,
    //     );
    //     await videoResponse.videos[0].video_link.click(); // click the first youtube video

    //     // video control query
    //     const controlResponse = await page.queryElements(VIDEO_CONTROL_QUERY);
    //     await controlResponse.expand_description_btn.click();

    //     // description query
    //     const descriptionData = await page.queryData(DESCRIPTION_QUERY);
    //     console.log(`Captured the following description:\n${descriptionData.description_text}`);

    //     // Scroll down the page to load more comments
    //     for (let i = 0; i < 3; i++) {
    //       await page.keyboard.press('PageDown');
    //       await page.waitForLoadState();
    //     }

    //     // comment query
    //     const commentResponse = await page.queryData(COMMENT_QUERY);
    //     console.log(`Captured ${commentResponse.comments?.length || 0} comments!`);
    //   }
    try {
        // const allAppResponse = await page.queryElements(ALL_GAMES_QUERY)
        // // const homePagesApps = await page.queryElements(HOMEPAGE_QUERY)
        // console.log(`found ${await allAppResponse.games.map((item)=> item)}`);

        const detailApp = await page.queryData(GAMES_DETAILS)
        console.log(JSON.stringify(detailApp.application, null, 2));

        // for (let i = 0; i < 3; i++) {
        //     await page.keyboard.press('PageDown');
        //     await page.waitForLoadState();
        // }

        const getAllReviews = await page.queryData(REVIEW_QUERY)
        console.log(`get all the reviews: ${JSON.stringify(getAllReviews, null, 2)}`);

        //   await detailApp.expand_reviews_btn.click()
        //   const reviewsResponse = await page.queryElements(REVIEW_QUERY)
        //   console.log(reviewsResponse);


    } catch (error) {
        console.error(`Found Error: ${error}`);
        throw error;
    }


    await page.waitForTimeout(60000);

    await browser.close();
}

main();
