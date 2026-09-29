import { Head, Html, Main, NextScript } from "next/document";
import themeInitScript from "../security/theme-init-script.cjs";

export default function Document() {
  return (
    <Html lang="en">
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
