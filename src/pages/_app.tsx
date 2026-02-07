import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

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
