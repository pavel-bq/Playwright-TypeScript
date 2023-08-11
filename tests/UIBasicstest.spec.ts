import {test, expect, Locator} from '@playwright/test';

test('Browser Playwritght Test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const userPass = page.locator("[type='password']");
    const singIn = page.locator('#signInBtn');
    const cartdTitles = await page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.type('rahulshetty');
    await userPass.type('learning');
    await singIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill('rahulshettyacademy');
    await userName.fill('learning');

    await Promise.all([
        page.waitForURL(),
        singIn.click()
    ]);

    // console.log(await cartdTitles.first().textContent());
    // console.log(await cartdTitles.nth(1).textContent());
    const allTitles = await cartdTitles.allTextContents();
    
    console.log(allTitles);

});

test('@Web UI Controls', async ({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const signIn = page.locator("#signInBtn");
   const documentLink = page.locator("[href*='documents-request']");
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   console.log(await page.locator(".radiotextsty").last().isChecked());
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect( page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect( await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test('Child windows hadl', async ({browser})=>
{
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] =await  Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const  text = await newPage.locator(".red").textContent();
    if (typeof text === 'string') {
        const arrayText = text.split("@");
        const domain =  arrayText[1].split(" ")[0];
        console.log(domain);
        await page.locator("#username").type(domain);
    }
    console.log(await page.locator("#username").textContent());
});