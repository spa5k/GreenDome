const FONT_TYPE_V1 = "v1";
const FONT_TYPE_V2 = "v2";

const urlList: string[] = [
  "https://cdn.statically.io/gh/mustafa0x/qpc-fonts/9cf744bc",
  "https://cdn.jsdelivr.net/gh/mustafa0x/qpc-fonts@master",
  "https://rawcdn.githack.com/mustafa0x/qpc-fonts/9cf744bc9395e91ed6ff44cfc528a828193c787a",
];

const addedFonts: Set<string> = new Set();

/**
 * Loads a font based on the given page and type.
 * @param page The page number as a string.
 * @param type The font type, either 'v1' or 'v2'.
 */
export const loadFont = async (
  page: string,
  type: string = FONT_TYPE_V1,
): Promise<void> => {
  const url = urlList[Math.floor(Math.random() * urlList.length)];
  const { fontName, fontUrl } = getFontDetails(page, type, url);

  if (addedFonts.has(fontName)) {
    return;
  }

  try {
    const fontFace = new FontFace(fontName, `url(${fontUrl})`);
    await fontFace.load();
    document.fonts.add(fontFace);
    addedFonts.add(fontName);
  } catch (error) {
    console.error(`Failed to load font ${fontName}:`, error);
  }
};

/**
 * Constructs the font name and URL based on the page, type, and base URL.
 * @param page The page number as a string.
 * @param type The font type.
 * @param baseUrl The base URL for the font files.
 * @returns An object containing the font name and URL.
 */
function getFontDetails(
  page: string,
  type: string,
  baseUrl: string,
): { fontName: string; fontUrl: string } {
  let fontName: string;
  let fontUrl: string;

  if (type === FONT_TYPE_V1) {
    fontName = `Mushaf_Page_${page}`;
    fontUrl = `${baseUrl}/mushaf-woff2/QCF_P${page.padStart(3, "0")}.woff2`;
  } else if (type === FONT_TYPE_V2) {
    fontName = `Mushaf2_Page_${page}`;
    fontUrl = `${baseUrl}/mushaf-v2/QCF2${page.padStart(3, "0")}.ttf`;
  } else {
    throw new Error(`Unsupported font type: ${type}`);
  }

  return { fontName, fontUrl };
}
