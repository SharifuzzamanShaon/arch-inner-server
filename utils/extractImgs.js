export const extractImgs = (content) => {
  let removeImgs = [content.thumbnail];

  // Extract image URLs from content
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  let match;
  // get all img urls from content
  while ((match = imgRegex.exec(content)) !== null) {
    removeImgs.push(match[1]);
  }
  return removeImgs;
};
