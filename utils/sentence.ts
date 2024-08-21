interface IPronounsOptions {
	isNormalized?: boolean;
}

interface Pronouns {
	subject: string;
	object: string;
	possessive: string;
	reflexive: string;
}

export function makeRoles(roles: string[]): string {
	if (roles.length === 0) return '';
	if (roles.length === 1) return roles[0];

	const lastRole = roles.pop();
	return `${roles.join(', ')}, and ${lastRole}`;
}

export function makePronouns(
	pronouns: string,
	options: IPronounsOptions = {},
): Pronouns {
	// Split the input string into parts
	const [subject, object, possessive = '', reflexive = ''] =
		pronouns.split('/');

	// Normalize the parts if the option is set
	const subjectNormalized =
		options.isNormalized ? capitalize(subject) : subject;
	const objectNormalized = options.isNormalized ? capitalize(object) : object;
	const possessiveNormalized =
		options.isNormalized ? capitalize(possessive) : possessive;
	const reflexiveNormalized =
		options.isNormalized ? capitalize(reflexive) : reflexive;

	return {
		subject: subjectNormalized,
		object: objectNormalized,
		possessive: possessiveNormalized,
		reflexive: reflexiveNormalized,
	};
}

// Helper function to capitalize the first letter of a string
function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
