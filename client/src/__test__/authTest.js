import { Selector, ClientFunction } from "testcafe";

fixture`Interact With the Page`.page`http://localhost:3000/signup`;


test("Username input", async (t) => {
    const usernameInput = Selector(".username-input");

    await t.typeText(usernameInput, "newuser");
    const username = await Selector(".username-input").value;

    await t.expect(username).eql("newuser");
});


test("password input", async (t) => {
    const passwordInput = Selector(".password-input");

    await t.typeText(passwordInput, "12a6b");
    const username = await Selector(".password-input").value;

    await t.expect(username).eql("12a6b");
});


test("Test signup", async (t) => {
    await t.typeText(".username-input", "newuser");
    await t.typeText(".password-input", "1234");

    const clickSignup = Selector("button").withText("SIGN UP");

    const localStorageGet = ClientFunction((token) =>
        localStorage.getItem(token)
    );

    await t.click(clickSignup);
    await t.expect(localStorageGet("token")).exists;
});


test("Test Login", async (t) => {
    const usernameInput = Selector(".username-input");
    const passwordInput = Selector(".password-input");

    await t.typeText(usernameInput, "newuser").typeText(passwordInput, "1234");

    const clickLogin = Selector("button").withText("LOGIN");

    const localStorageGet = ClientFunction((token) =>
        localStorage.getItem(token)
    );

    await t.click(clickLogin);
    await t.expect(localStorageGet("token")).exists;
    
}).page`http://localhost:3000/login`;
