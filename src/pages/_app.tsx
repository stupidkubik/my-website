import type { AppProps } from "next/app";
import Head from "next/head";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "../styles/globals.css";
import Layout from "@/components/Layout";

// The settings of `geist/font/mono` without its preload: no page renders monospace
// text yet, and browsers only fetch a font once a page uses it.
const GeistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Roboto Mono",
    "Menlo",
    "Monaco",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Courier New",
    "monospace"
  ],
  weight: "100 900",
  preload: false
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/site.webmanifest" rel="manifest" />
        <meta content="#ffffff" media="(prefers-color-scheme: light)" name="theme-color" />
        <meta content="#0a0a0a" media="(prefers-color-scheme: dark)" name="theme-color" />
      </Head>
      <div className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}
