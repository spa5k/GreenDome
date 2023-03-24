export default function getHijriDate(language: string): string {
	const languageTag = language === 'en' ? 'en-TN-u-ca-islamic-nu-eng' : 'ar-TN-u-ca-islamic-nu-ar';
	const hijriFormatter = new Intl.DateTimeFormat(languageTag, {
		day: 'numeric',
		month: 'long',
		weekday: 'long',
		year: 'numeric',
	});
	return hijriFormatter.format(Date.now());
}


// const hijriDateInArabic = getHijriDate('ar'); // returns the Hijri date in Arabic
// const hijriDateInEnglish = getHijriDate('en'); // returns the Hijri date in English