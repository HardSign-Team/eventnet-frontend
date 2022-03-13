const nouns = ['bird', 'clock', 'boy', 'plastic', 'duck', 'teacher', 'old lady', 'professor', 'hamster', 'dog'];
const verbs = ['kicked', 'ran', 'flew', 'dodged', 'sliced', 'rolled', 'died', 'breathed', 'slept', 'killed'];
const adjectives = [
    'beautiful',
    'lazy',
    'professional',
    'lovely',
    'dumb',
    'rough',
    'soft',
    'hot',
    'vibrating',
    'slimy'
];
const adverbs = [
    'slowly',
    'elegantly',
    'precisely',
    'quickly',
    'sadly',
    'humbly',
    'proudly',
    'shockingly',
    'calmly',
    'passionately'
];
const preposition = ['down', 'into', 'up', 'on', 'upon', 'below', 'above', 'through', 'across', 'towards'];

export default function getRandomWord(): string {
    const rand1: number = Math.floor(Math.random() * 10);
    const rand2: number = Math.floor(Math.random() * 10);
    const rand3: number = Math.floor(Math.random() * 10);
    const rand4: number = Math.floor(Math.random() * 10);
    const rand5: number = Math.floor(Math.random() * 10);
    const rand6: number = Math.floor(Math.random() * 10);

    return `The ${adjectives[rand1]} ${nouns[rand2]} ${adverbs[rand3]} ${verbs[rand4]}
     because some ${nouns[rand1]} ${adverbs[rand1]} ${verbs[rand1]} ${preposition[rand1]} 
     a ${adjectives[rand2]} ${nouns[rand5]} which,
     became a ${adjectives[rand3]}, ${adjectives[rand4]} ${nouns[rand6]}.`;
}
