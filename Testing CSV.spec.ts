//include playwright module


const {test, expect} = require('playwright/test');


test.use({
    headless: false, // Set to false for headed mode
  ignoreHTTPSErrors: true,
   
   });
//important to have here
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';


const records = parse (

  fs.readFileSync(path.join(__dirname,"../Test CSV/testdata.csv")),

  { 

    //Goes by column I think, false to do row? Will need to test
    columns:true,
    skip_empty_lines:true,
      
  });

for (const record of records) {

  //Test to be written
  test (`Data Driven Testing Using CSV file in Playwright ${record.TestCaseID}`,async ({page}) =>{
  // Go to dashboard
await page.goto('https://mnscat1.mnscat.lott/admin/portal.do#');
  await page.locator('input[name="username"]').fill('administrator');
  await page.locator('input[name="password"]').fill('password');
  await page.getByRole('button', { name: 'Go' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  
  //search with keywords
  await page.locator('#APjFqb').click();

  //Input data from csv column
  await page.locator('#APjFqb').fill(record.Skill1);
  await page.locator('#APjFqb').press('Enter');

  await page.waitForTimeout(5000);

})


}
