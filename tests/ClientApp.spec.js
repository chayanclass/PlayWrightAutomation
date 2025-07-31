const { test, expect } = require('@playwright/test');

test("E2e flow test", async ({ page }) => {



    //Login
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("chayanclass@gmail.com");
    await page.locator("#userPassword").fill("Mbeng5233@");
    await page.locator("[value='Login']").click();

    console.log(await page.title());
     const AllProducts = page.locator(".card-body");

    //Order
    await page.waitForLoadState('networkidle');
    await expect(page.locator("#products").first()).toBeVisible();
    const itemcount = await AllProducts.count();
    for (let i = 0; i < itemcount; i++) {
        const itemname = await AllProducts.nth(i).locator("b").textContent();
        console.log(itemname);
        console.log(i);


        if (itemname == "ADIDAS ORIGINAL")
        {
    
           await  AllProducts.nth(i).locator("button").nth(1).click();

            break;
            

        }

    }
   

    //Card
    await page.locator("[routerlink='/dashboard/cart']").click();
    expect(await page.locator(".cartSection h3").textContent()).toContain("ADIDAS ORIGINAL");
 

 await page.getByRole('button',{name:'Buy Now'}).click();
await page.pause();
}
)
