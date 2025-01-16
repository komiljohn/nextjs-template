export default function formatPhoneNumber(phoneNumberString: string) {
	const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	const match = cleaned.match(/^(998|)?(\d{2})(\d{3})(\d{2})(\d{2})$/);
	if (match) {
		const intlCode = match[1] ? '+998 ' : '';
		return [
			intlCode,
			'',
			match[2],
			' ',
			match[3],
			'-',
			match[4],
			'-',
			match[5],
		].join('');
	}
	return null;
}
