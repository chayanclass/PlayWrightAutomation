const { test, expect,request } = require('@playwright/test');

const loginplayload = {userEmail: "chayanclass@gmail.com", userPassword: "Mbeng5233@"};
let token;


test.beforeAll(async()=>
{
 const apicontext = await request.newContext()
 const loginrespons = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginplayload
    },)

    expect(loginrespons.ok()).toBeTruthy();
    const loginresponsejson = await loginrespons.json();
    const token = loginresponsejson.token;
    console.log(token);

});




test("webapi", async ({ page }) => {

await page.addInitScript(value=>{

    window.localStorage.setItem("token",value)
}, token );

    //Login
    await page.goto("https://rahulshettyacademy.com/client/");
    //await page.locator("#userEmail").fill("chayanclass@gmail.com");
    //await page.locator("#userPassword").fill("Mbeng5233@");
    //await page.locator("[value='Login']").click();
    await page.pause();
    console.log(await page.title());
     

    //Order
    const AllProducts = page.locator(".card-body");
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
//await page.pause();
}
)
