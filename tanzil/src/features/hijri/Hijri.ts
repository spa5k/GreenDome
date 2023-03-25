/**
 * Get the current Hijri date formatted in the specified language
 * @param {string} language - The language code to use for the formatted date. Accepted values: 'en' for English and 'ar' for Arabic.
 * @returns {string} The formatted Hijri date as a string.
 * @example
 * const hijriDateInArabic = getHijriDate('ar'); // returns the Hijri date in Arabic
 * const hijriDateInEnglish = getHijriDate('en'); // returns the Hijri date in English
 */
    export default function getHijriDate(language) {
		const languageTag = language === 'en' ? 'en-TN-u-ca-islamic-nu-eng' : 'ar-TN-u-ca-islamic-nu-ar';
		const hijriFormatter = new Intl.DateTimeFormat(languageTag, {
		day: 'numeric',
		month: 'long',
		weekday: 'long',
		year: 'numeric',
		});
		return hijriFormatter.format(Date.now());
		}
