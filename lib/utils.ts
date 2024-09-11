import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


interface IPronounsOptions {
	isNormalized?: boolean;
  returnAsString?: boolean;
}

interface Pronouns {
	subject: string;
	object: string;
	possessive: string;
	reflexive: string;
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function makePronouns(
	pronouns: string,
	options: IPronounsOptions = {},
): Pronouns | string {
	const [subject, object, possessive = '', reflexive = ''] =
		pronouns.split('/');

	const subjectNormalized =
		options.isNormalized ? capitalize(subject) : subject;
	const objectNormalized = options.isNormalized ? capitalize(object) : object;
	const possessiveNormalized =
		options.isNormalized ? capitalize(possessive) : possessive;
	const reflexiveNormalized =
		options.isNormalized ? capitalize(reflexive) : reflexive;

  if (options.returnAsString) {
    return `${subjectNormalized}/${objectNormalized}/${possessiveNormalized}/${reflexiveNormalized}`
  }
  return {
    subject: subjectNormalized,
    object: objectNormalized,
    possessive: possessiveNormalized,
    reflexive: reflexiveNormalized,
  }
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}