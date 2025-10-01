# NEXT-GOOGLE-ADSENSE

[![Weekly Download](https://img.shields.io/npm/dw/next-google-adsense?color=0066cc&style=flat)](https://www.npmjs.com/package/next-google-adsense) ![Lint, Format, and Test](https://github.com/soranoo/next-google-adsense/actions/workflows/lint-format-test.yml/badge.svg) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)&nbsp;&nbsp;&nbsp;[![Donation](https://img.shields.io/static/v1?label=Donation&message=❤️&style=social)](https://github.com/soranoo/Donation)

Add Google AdSense to your Next.js app.

This package is deeply inspired by [nextjs-google-adsense](https://github.com/btk/nextjs-google-adsense/).

Why I don't use [nextjs-google-adsense](https://github.com/btk/nextjs-google-adsense/) directly? Because it only support Auto Ads and Responsive Display Ad. I want to use In-article Ads. So I decided to create a new package. (read [👾 Why next-google-adsense?](#-why-next-google-adsense) for more details)

Give me a ⭐ if you like it.

## 🗝️ Features

- Support SSR (Server-Side Rendering), SSG (Static Site Generation) and CSR (Client-Side Rendering)
- Support TypeScript
- Zero Dependencies
- Dummy Ad Support for Development - Preview ads locally without real AdSense integration
- Theoretically support all AdSense AD types (see [🎨 Create a custom layout](#-create-a-custom-layout) for more details)
- Create `ads.txt` automatically (see [Initialization / Verification](#initialization--verification-) for more details)

## 📑 Table of Contents

- [👾 Why next-google-adsense?](#-why-next-google-adsense)
- [📦 Requirements](#-requirements)
- [🚀 Getting Started](#-getting-started)
  - [Installation](#installation)
  - [Initialization / Verification](#initialization--verification-)
  - [Usage](#usage-)
    - [Auto Ads](#auto-ads)
    - [Manual Ads](#manual-ads)
    - [Dummy Ads for Development](#dummy-ads-for-development-)
- [📖 API Reference](#-api-reference)
  - [Components](#components)
    - [GoogleAdSense](#initializes-the-google-adsense)
    - [AdUnit](#manual-ad)
  - [Ad Sizes](#ad-sizes)
    - [Display Ad Sizes](#display-ad-sizes)
    - [In-Article Ad Sizes](#in-article-ad-sizes)
- [🎨 Create a custom layout](#-create-a-custom-layout)
  - [How to convert the given html to a custom layout?](#how-to-convert-the-given-html-to-a-custom-layout)
- [🐛 Known Issues](#-known-issues)
- [⭐ TODO](#-todo)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [☕ Donation](#-donation)

## 👾 Why next-google-adsense?

|                            | next-google-adsense (this) | [nextjs-google-adsense](https://github.com/btk/nextjs-google-adsense/) |
| -------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| TypeScript                 | ✅                         | ✅                                                                     |
| Support Auto Ads           | ✅                         | ✅                                                                     |
| Support Display Ad         | ✅                         | ✅                                                                     |
| Support In-feed Ad         | ✅                         | ❌                                                                     |
| Support In-article Ad      | ✅                         | ❌                                                                     |
| Support Matched Content Ad | ✅                         | ❌                                                                     |
| Dynamic `ads.txt`          | ✅                         | ❌                                                                     |
| Multiple ADs on one page   | ✅                         | ⚠️\*1                                                                  |
| Dummy Ad for Development   | ✅                         | ❌                                                                     |

\*1: According to the their [documentation](https://github.com/btk/nextjs-google-adsense/blob/master/README.md) seems it is ok to use multiple ADs on one page. But I found that it will cause an error.

## 📦 Requirements

- Next.js 11.0.0 or higher.
- React 17.0.0 or higher.

## 🚀 Getting Started

### Installation

```bash
npm install next-google-adsense
```

Visit the [npm](https://www.npmjs.com/package/next-google-adsense) page.

### Initialization / Verification 🍀

There are two ways to verify your site (of course you can implement both):

1. AdSense code snippet

   ```typescript
   // pages/_app.tsx

   // import the module
   import { GoogleAdSense } from "next-google-adsense";

   const App = ({ Component, pageProps }) => {
     return (
       <>
         <GoogleAdSense publisherId="pub-XXXXXXXXXXXXXXXX" /> {/* 👈 16 digits */}
         {/* or */}
         <GoogleAdSense /> {/* if NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is set */}
         <Component {...pageProps} />
       </>
     );
   };

   export default App;
   ```

    You can also add the `publisherId` as environment variable as `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`. The environment variable will override the prop if both are set.

    > [!NOTE]\ No need to add the prefix `ca-` to the `publisherId`. The package will add it automatically.

2. Ads.txt snippet

   ```js
   // package.json
   
   // ...
   "scripts": {
      "build": "next build && create-ads-txt", // 👈 if you want to create ads.txt automatically, recommended
      "create-ads-txt": "create-ads-txt" // 👈 if you want to create ads.txt manually
   },
   // ...
   ```

   > [!WARNING]\ Your old `ads.txt` will be overwritten during the generation process.

   You must set `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` as environment variable. The environment variable will be used to generate the `ads.txt`.

### Usage 🎉

#### Auto Ads

If you decide to use Auto Ads, you are good to go. The ads will be automatically displayed on your page. (Setup [Auto Ads](https://support.google.com/adsense/answer/9261307))

#### Manual Ads

> [!NOTE]\
> Google AdSense does't work in local environment. You need to test it in production or use [Dummy Ads for Development](#dummy-ads-for-development-).

```typescript
import { AdUnit } from "next-google-adsense";

const Page = () => {
  return (
    <>
       <AdUnit
        publisherId="pub-XXXXXXXXXXXXXXXX"  {/* 👈 16 digits */}
        slotId="XXXXXXXXXX"                 {/* 👈 10 digits */}
        layout="display"                    {/* See the API Reference for more options */}
        />
      {/* or */}
       <AdUnit                              {/* if NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is set */}
        slotId="XXXXXXXXXX"
        layout="display"
        />

        <YourContent />
    </>
  );
};

export default Page;
```

#### Dummy Ads for Development 🧪

Perfect for development and testing! Show realistic ad placeholders without needing actual AdSense approval.

```typescript
import { AdUnit, DISPLAY_AD_SIZES, ARTICLE_AD_SIZES } from "next-google-adsense";

const Page = () => {
  return (
    <>
      {/* Using predefined sizes */}
      <AdUnit
        slotId="1234567890"
        layout="display"
        dummySize="LEADERBOARD"  {/* 728x90 */}
      />

      <AdUnit
        slotId="1234567890"
        layout="in-article"
        dummySize="MEDIUM_RECTANGLE"  {/* 300x250 */}
      />

      {/* Using custom dimensions */}
      <AdUnit
        slotId="1234567890"
        layout="display"
        dummySize={{ width: 600, height: 400 }}
      />

      {/* Using size objects directly */}
      <AdUnit
        slotId="1234567890"
        layout="display"
        dummySize={DISPLAY_AD_SIZES.BANNER}  {/* 468x60 */}
      />

      <YourContent />
    </>
  );
};

export default Page;
```

> [!NOTE]\
> Dummy ads only appear when the `dummySize` prop is provided. In production (when `NODE_ENV`/`NEXT_PUBLIC_ENV` is not "development"), real ads will be displayed instead.

## 📖 API Reference

### Components

#### Initializes the Google AdSense

```typescript
<GoogleAdSense publisherId={string}>
```

| Parameter   | Optional | Type   | Default | Description                                                                                         |
| ----------- | -------- | ------ | ------- | --------------------------------------------------------------------------------------------------- |
| publisherId | Yes      | string | n/a     | You can skip this parameter if you set the environment variable `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`. |

#### Manual AD

```typescript
<AdUnit publisherId={string} slotId={string} layout={"display" | "in-article" | "custom"} customLayout={JSX.Element} dummySize={DisplayAdSize | ArticleAdSize | {width: number, height: number}}>
```

| Parameter    | Optional | Type                                                                        | Default   | Description                                                                                         |
| ------------ | -------- | --------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| publisherId  | Yes      | string                                                                      | n/a       | You can skip this parameter if you set the environment variable `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`. |
| slotId       | No       | string                                                                      | n/a       | Google AdSense Slot ID.                                                                             |
| layout       | Yes      | "display" \| "in-article" \| "custom"                                       | "display" | The layout of the AD.                                                                               |
| customLayout | Yes      | JSX.Element                                                                                                       | n/a       | The custom layout of the AD. This parameter is required if `layout` is set to "custom".             |
| dummySize    | Yes      | DisplayAdSize \| ArticleAdSize \| {width: number, height: number}          | n/a       | Show dummy ad for development. Only appears when this prop is provided.                             |

### Dummy Ad Sizes

All available ad sizes for the `dummySize` prop:

#### Display Ad Sizes

For `layout="display"` ads:

| Size Name            | Key                    | Dimensions  | Best For                    |
| -------------------- | ---------------------- | ----------- | --------------------------- |
| Leaderboard          | `"LEADERBOARD"`        | 728 × 90    | Top of page, headers        |
| Banner               | `"BANNER"`             | 468 × 60    | Above content               |
| Half Banner          | `"HALF_BANNER"`        | 234 × 60    | Small horizontal spaces     |
| Medium Rectangle     | `"MEDIUM_RECTANGLE"`   | 300 × 250   | Within content, sidebars    |
| Large Rectangle      | `"LARGE_RECTANGLE"`    | 336 × 280   | Above the fold              |
| Vertical Banner      | `"VERTICAL_BANNER"`    | 120 × 240   | Narrow sidebars             |
| Wide Skyscraper      | `"WIDE_SKYSCRAPER"`    | 160 × 600   | Wide sidebars               |
| Skyscraper           | `"SKYSCRAPER"`         | 120 × 600   | Narrow sidebars             |
| Mobile Banner        | `"MOBILE_BANNER"`      | 320 × 50    | Mobile devices              |
| Large Mobile Banner  | `"LARGE_MOBILE_BANNER"` | 320 × 100   | Mobile devices, larger      |

#### In-Article Ad Sizes

For `layout="in-article"` ads:

| Size Name        | Key                  | Dimensions | Best For                     |
| ---------------- | -------------------- | ---------- | ---------------------------- |
| Small Square     | `"SMALL_SQUARE"`     | 200 × 200  | Small content breaks         |
| Square           | `"SQUARE"`           | 250 × 250  | Content breaks               |
| Medium Rectangle | `"MEDIUM_RECTANGLE"` | 300 × 250  | Between paragraphs           |
| Large Rectangle  | `"LARGE_RECTANGLE"`  | 336 × 280  | Longer content breaks        |

#### Usage Examples

```typescript
import { AdUnit, DISPLAY_AD_SIZES, ARTICLE_AD_SIZES } from "next-google-adsense";

// Using predefined size keys
<AdUnit slotId="123" layout="display" dummySize="LEADERBOARD" />
<AdUnit slotId="456" layout="in-article" dummySize="SQUARE" />

// Using size objects
<AdUnit slotId="789" layout="display" dummySize={DISPLAY_AD_SIZES.BANNER} />
<AdUnit slotId="101" layout="in-article" dummySize={ARTICLE_AD_SIZES.MEDIUM_RECTANGLE} />

// Using custom dimensions
<AdUnit slotId="112" layout="display" dummySize={{ width: 400, height: 300 }} />
```

## 🎨 Create a custom layout

No layout fits your needs? Let's create a custom layout.

Sample custom layout:

```typescript
export const InFeedAd = () => {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="<AD_LAYOUT_KEY>"
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
    />
  );
};
```

### How to convert the given html to a custom layout?

Example (provided by Google AdSense):

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"
></script>
<ins
  class="adsbygoogle"
  style="display:block"
  data-ad-format="fluid"
  data-ad-layout-key="<AD_LAYOUT_KEY>"
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

1. Remove all the `<script>` tags.
2. You will get the following html:

   ```html
   <ins
     class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="<AD_LAYOUT_KEY>"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
   >
   </ins>
   ```

3. Convert the html to JSX:

   ```typescript
   export const InFeedAd = () => {
     return (
       <ins
         className="adsbygoogle"
         style={{ display: "block" }}
         data-ad-format="fluid"
         data-ad-layout-key="<AD_LAYOUT_KEY>"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
       />
     );
   };
   ```

4. Done! You can now use the custom layout in your app.

   ```typescript
   <AdUnit publisherId="<your-publisher-id>" slotId="<your-slot-id>" layout="custom" customLayout={InFeedAd}>
   ```

Full Code:

```typescript
import { AdUnit } from "next-google-adsense";

export const InFeedAd = () => {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="<AD_LAYOUT_KEY>"
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
    />
  );
};

const Page = () => {
  return (
    <>
       <AdUnit
        publisherId="pub-XXXXXXXXXXXXXXXX"  {/* 👈 16 digits */}
        slotId="XXXXXXXXXX"                 {/* 👈 10 digits */}
        layout="custom"
        customLayout={InFeedAd}
        />

        <YourContent />
    </>
  );
};
```

## 🐛 Known Issues

- Waiting for your report.

## ⭐ TODO

- Add custom layout validation.

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you want to contribute code, please fork the repository and submit a pull request.

Before you open a pull request, please make sure that you run `npm run dev` to make sure the code run as expected.

We are following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## ☕ Donation

Love it? Consider a donation to support my work.

[!["Donation"](https://raw.githubusercontent.com/soranoo/Donation/main/resources/image/DonateBtn.png)](https://github.com/soranoo/Donation) <- click me~
