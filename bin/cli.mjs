#!/usr/bin/env node

import envLoader from "@next/env";
import { promises as fs } from "fs";
import path from "path";
import { isPublisherId } from "../dist/utils.js";

const publicPath = path.join(process.cwd(), "public");
const adsTxtPath = path.join(publicPath, "ads.txt");

const env = envLoader.loadEnvConfig(process.cwd()).combinedEnv;
const adsTxtContent = `google.com, ${env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`;

// create "ads.txt" file to "public" folder
// if public folder not exist, create it
const createAdsTxt = async () => {
  console.log(`📝 [next-google-adsense] Creating "ads.txt"...`);

  if (!isPublisherId(env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID)) {
    console.error(
      `❌ [next-google-adsense] Invalid Google AdSense Publisher ID: ${env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`
    );
    process.exit(1);
  }

  try {
    await fs.access(publicPath);
  } catch (err) {
    console.log(`📁 [next-google-adsense] Creating "public" folder...`);
    await fs.mkdir(publicPath);
  }

  await fs.writeFile(adsTxtPath, adsTxtContent);

  console.log(`✅ [next-google-adsense] Generation completed: ${adsTxtPath}`);
  console.log(`✨ [next-google-adsense] You can access it at: http://<hostname>/ads.txt`);
};

createAdsTxt();
