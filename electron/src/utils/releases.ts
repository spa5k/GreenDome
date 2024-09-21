import log from "electron-log";

export async function getLatestReleaseVersion(
  user: string,
  repo: string,
): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${user}/${repo}/releases/latest`,
    );
    const data = await response.json() as { tag_name: string };
    return data.tag_name;
  } catch (error) {
    log.error("Error fetching latest release version:", error);
    throw error;
  }
}

export async function getLatestRelease(
  user: string,
  repo: string,
): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${user}/${repo}/releases/latest`,
    );
    const data = await response.json() as { assets: { name: string; browser_download_url: string }[] };
    const asset = data.assets.find((asset) => asset.name === "quran.db");
    return asset!.browser_download_url;
  } catch (error) {
    log.error("Error fetching latest release:", error);
    throw error;
  }
}
