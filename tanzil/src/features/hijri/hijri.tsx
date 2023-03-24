function getHijriDate(language: string): string {
	const hijriFormatter = new Intl.DateTimeFormat(`ar-TN-u-ca-islamic-nu-${language}`, {
		day: 'numeric',
		month: 'long',
		weekday: 'long',
		year: 'numeric',
	});
	return hijriFormatter.format(Date.now());
}

getHijriDate('ar');
