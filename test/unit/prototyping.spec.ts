import { NeuralNetwork, likely } from 'brain.js';

describe('prototyping', () => {
    function character(string: string): number[] {
        return string.trim().split('').map(integer);
    }

    function integer(character: string): number {
        if (character === '#') return 1;
        return 0;
    }

    // prettier-ignore
    const a = character(
        '....###....' +
        '  #######  ' +
        '###     ###' +
        '###     ###' +
        '###########' +
        '###########' +
        '###     ###' +
        '###     ###' +
        '###     ###' + 
        '###     ###'
    );

    // prettier-ignore
    const b = character(
        '#######    ' +
        '########## ' +
        '###     ###' +
        '###     ## ' +
        '#########  ' +
        '#########  ' +
        '###.....## ' +
        '###.....###' +
        '########## ' + 
        '#########..'
    );

    // prettier-ignore
    const c = character(
        '###########' +
        '###########' +
        '###......  ' +
        '###......  ' +
        '###......  ' +
        '###......  ' +
        '###......  ' +
        '###......  ' +
        '###########' +
        '###########' 
    );

    // prettier-ignore
    const testChar = character(
        '...........' +
        ' ########  ' +
        ' #       # ' +
        ' #       # ' +
        ' ########  ' +
        ' #       # ' +
        ' # ..... # ' +
        ' # .....  #' +
        ' # ##### # ' + 
        '...........'
    );

    it('can recognize character with bold stroke training set and skeleton test data', () => {
        const net = new NeuralNetwork();
        net.train([
            { input: a, output: { a: 1 } },
            { input: b, output: { b: 1 } },
            { input: c, output: { c: 1 } },
        ]);

        expect(likely(testChar, net)).toBe('b');
    });

    xit('not working!!! neural net can call and train data multiple times', () => {
        let net = new NeuralNetwork();
        net.train([
            { input: a, output: { a: 1 } },
            { input: c, output: { c: 1 } },
        ]);

        let result = expect(likely(testChar, net)).toBe('a');

        net.train([
            { input: a, output: { a: 1 } },
            { input: c, output: { c: 1 } },
            { input: b, output: { b: 1 } },
        ]);

        expect(likely(testChar, net)).toBe('b');
    });

    it('neural net can save and load', () => {
        const net = new NeuralNetwork();
        net.train([
            { input: a, output: { a: 1 } },
            { input: b, output: { b: 1 } },
            { input: c, output: { c: 1 } },
        ]);

        expect(likely(testChar, net)).toBe('b');

        const netOutput = net.toJSON();

        const newNet = new NeuralNetwork();
        newNet.fromJSON(netOutput);

        expect(likely(testChar, newNet)).toBe('b');
    });
});
