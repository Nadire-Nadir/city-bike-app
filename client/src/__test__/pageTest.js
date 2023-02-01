import { Selector } from "testcafe";

fixture`Interact With the Page`.page`http://localhost:3000/login`;

test("Test pages", async (t) => {
    const usernameInput = Selector(".username-input");
    const passwordInput = Selector(".password-input");

    await t.typeText(usernameInput, "nadire").typeText(passwordInput, "1234");

    const clickLogin = Selector("button").withText("LOGIN");
    await t.click(clickLogin);

    const clickMenuBar = Selector(".menu-bars");
    await t.click(clickMenuBar);

    const clickJourneys = Selector("li").withText("Journeys");

    await t.click(clickJourneys);
    const journeyTitle = Selector(".page-title").textContent;
    await t.expect(await journeyTitle).eql("Journeys List");

    await t.click(clickMenuBar);

    const clickStations = Selector("li").withText("Stations");

    await t.click(clickStations);
    const stationTitle = Selector(".page-title").textContent;
    await t.expect(await stationTitle).eql("Stations List");

    const clickTable = Selector(".table");
    await t.click(clickTable);
    const detailTitle = Selector(".page-title").textContent;
    await t.expect(await detailTitle).eql("Station Details");
});
