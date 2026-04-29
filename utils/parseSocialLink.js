export const socialLinksParser = (value) => {
  if (typeof value !== "string") return value;

  try {
    const fixed = value
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // quote keys
      .replace(/\\"/g, '"');

    return JSON.parse(fixed);
  } catch (err) {
    return null; // or {}
  }
};
