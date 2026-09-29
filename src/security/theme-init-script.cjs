module.exports = `
  (function () {
    try {
      var savedTheme = window.localStorage.getItem("theme");
      var hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = hasSavedTheme ? savedTheme : (prefersDark ? "dark" : "light");
      document.documentElement.dataset.theme = theme;
    } catch (e) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;
