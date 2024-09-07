import log from "electron-log";

export async function getLatestReleaseVersion(
  user: string,
  repo: string,
): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${user}/${repo}/releases/latest`,
    );
    const data = await response.json();
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
    const data = await response.json();
    const asset = data.assets.find((asset: any) => asset.name === "quran.db");
    return asset.browser_download_url;
  } catch (error) {
    log.error("Error fetching latest release:", error);
    throw error;
  }
}
