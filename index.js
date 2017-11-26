var target = process.argv.slice(2)[0];

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 .,?!"


function randomIndex(target) {
	return Math.floor(Math.random() * target.length);
}

function randomCharacter() {
	const index = randomIndex(alphabet);
	return alphabet.charAt(index);
}

function createOrganism(target) {
	const randoChars = charArray(target).map(x => randomCharacter());
	return randoChars.join('');
}

function characterPosition(character) {
	return alphabet.indexOf(character);
}

function zip(a, b) {
	return a.map((e,i) => [e, b[i]]);
}

function charArray(str) {
	return str.split('');
}

function distance(a, b) {
	return Math.sqrt(zip(charArray(a), charArray(b)).
		map(x => characterPosition(x[0]) - characterPosition(x[1])).
		map(x => x**2).
		reduce((acc, cur) => acc + cur))
}

function clone(target) {
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
