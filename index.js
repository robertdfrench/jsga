var target = process.argv.slice(2)[0];

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 .,?!"


function randomIndex(target) {
	// Return a random integer from [0, target.length)
	return Math.floor(Math.random() * target.length);
}

function randomCharacter() {
	// Grab a random element from the alphabet
	const index = randomIndex(alphabet);
	return alphabet.charAt(index);
}

function createOrganism(target) {
	// Generate a completely random organism of the target's length
	const randoChars = charArray(target).map(x => randomCharacter());
	return randoChars.join('');
}

function characterPosition(character) {
	// Recover the index of each character relative to the alphabet
	return alphabet.indexOf(character);
}

function zip(a, b) {
	// Merge two arrays into a single array of pairs
	return a.map((e,i) => [e, b[i]]);
}

function charArray(str) {
	// Turns a string into a formal array of characters
	return str.split('');
}

function distance(a, b) {
	// Standard Euclidean distance metric
	const aPositions = charArray(a).map(characterPosition);
	const bPositions = charArray(b).map(characterPosition);
	return Math.sqrt(
		zip(aPoisitions, bPositions).
		map(x => x[0] - x[1]).
		map(x => x**2).
		reduce((acc, cur) => acc + cur)
	)
}

function clone(target) {
	// Clone with entropy at a single random element
	const index = randomIndex(target);
	return charArray(target).
		map((e, i) => i == index ? randomCharacter() : e).
		join('');
}

var mutant = createOrganism(target);
var mutantFitness = distance(mutant, target);
while (mutantFitness > 0) {
	const candidate = clone(mutant);
	const candidateFitness = distance(candidate, target);
	if (candidateFitness < mutantFitness) {
		mutant = candidate;
		mutantFitness = candidateFitness;
		console.log(mutant + ": " + mutantFitness);
	}
}
