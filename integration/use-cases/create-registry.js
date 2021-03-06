test("Creates a registry", async () => {
  await page.goto(getUrl("/#/config/ns/kubeapps/repos"));

  await expect(page).toFillForm("form", {
    token: process.env.ADMIN_TOKEN
  });

  await expect(page).toClick("button", { text: "Login" });

  await expect(page).toClick("button", { text: "Add App Repository" });

  try {
    await expect(page).toMatch("Install Repo");
  } catch (e) {
    // The Modal sometimes fail to be opened, click the button again
    await expect(page).toClick("button", { text: "Add App Repository" });

    await expect(page).toMatch("Install Repo");
  }

  await page.type("#kubeapps-repo-name", "my-repo");

  await page.type("#kubeapps-repo-url", "https://charts.gitlab.io/");

  // Similar to the above click for an App Repository, the click on
  // the Install Repo doesn't always register (in fact, from the
  // screenshot on failure, it appears to focus the button only (hover css applied)
  await expect(page).toClick("button", { text: "Install Repo" });

  try {
    await expect(page).toClick("a", { text: "my-repo" });
  } catch (e) {
    await expect(page).toClick("button", { text: "Install Repo" });
    await expect(page).toMatch("Install Repo");
  }

  let retries = 3;
  while (retries > 0) {
    try {
      await expect(page).toMatch("gitlab", { timeout: 2000 });
      break;
    } catch (e) {
      // Refresh since the chart will get a bit of time to populate
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    } finally {
      retries--;
    }
  }
});
