#!/usr/bin/env node

import envLoader from "@next/env";
import { promises as fs } from "fs";
import path from "path";
import { isPublisherId } from "../dist/utils.js";

const publicPath = path.join(process.cwd(), "public");
const adsTxtPath = path.join(publicPath, "ads.txt");

const env = envLoader.loadEnvConfig(process.cwd()).combinedEnv;
const adsTxtContent = `google.com, ${env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`;

// create "ads.txt" file to "public" folder
// if public folder not exist, create it
const createAdsTxt = async () => {
  if (!isPublisherId(env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID)) {
    throw new Error(
      `Invalid publisher ID: ${env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID}`
    );
  }

  try {
    await fs.access(publicPath);
  } catch (err) {
    await fs.mkdir(publicPath);
  }

  await fs.writeFile(adsTxtPath, adsTxtContent);
};

createAdsTxt();
