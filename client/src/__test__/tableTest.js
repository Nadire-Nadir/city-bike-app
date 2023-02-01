import { Selector } from "testcafe";

fixture`Interact With the Page`.page`http://localhost:3000/login`;

test("Test Table", async (t) => {
    const usernameInput = Selector(".username-input");
    const passwordInput = Selector(".password-input");

    await t.typeText(usernameInput, "nadire").typeText(passwordInput, "1234");

    const clickLogin = Selector("button").withText("LOGIN");
    await t.click(clickLogin);

    const clickTable = Selector(".table");
    await t.expect(clickTable).exists;

    const clickSortDstation =
        Selector(".header-content").withText("Departure Station");
    const clickSortRstation =
        Selector(".header-content").withText("Return Station");
    const clickSortDistance =
        Selector(".header-content").withText("Distance (km)");

    const clickSortDuration =
        Selector(".header-content").withText("Duration (min)");

    //click twice to sort both end
    await t
        .click(clickSortDstation)
        .click(clickSortDstation)
        .click(clickSortRstation)
        .click(clickSortRstation)
        .click(clickSortDistance)
        .click(clickSortDistance)
        .click(clickSortDuration)
        .click(clickSortDuration);

    const button = Selector(".btn").with({ visibilityCheck: true });
    await t.expect(button.hasAttribute("disabled")).ok();

    await t.click(Selector(".btn").withText("Next"));
    await t.click(Selector(".btn").withText("Previous"));

    const pagelist = Selector(".page-size-options");
    const selectNumber = Selector("option").withText("5 rows");

    await t.click(pagelist);
    await t.click(selectNumber);
    const selectRow = Selector(".table-body").child(".row-group");
    await t.expect(await selectRow.count).eql(5);
});
