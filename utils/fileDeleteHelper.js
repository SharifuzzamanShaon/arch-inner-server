import fs from "fs";

import { join } from "path";

export const deleteBlogImg = (imageUrl) => {
  if (!imageUrl) return false;
  const hostUrl = process.env.HOST_URL;
  try {
    const url = new URL(imageUrl, hostUrl);
    const filename = url.pathname.split("/").pop();

    const fullPath = join(process.cwd(), "assets", filename);

    if (!fs.existsSync(fullPath)) {
      return false;
    }
    fs.unlinkSync(fullPath);
    return true;
  } catch (err) {
    return false;
  }
};
