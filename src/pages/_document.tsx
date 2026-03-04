import { Head, Html, Main, NextScript } from "next/document";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const themeInitScript = `
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

export default function Document() {
  return (
    <Html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
