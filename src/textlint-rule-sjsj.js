// LICENSE : MIT
"use strict";
const distanceWords = function (a, b) {
    var matrix = new Array(a.length + 1);
    for (let i = 0; i < a.length + 1; i++) {
        matrix[i] = new Array(b.length + 1);
    }

    for (let i = 0; i < a.length + 1; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j < b.length + 1; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i < a.length + 1; i++) {
        for (let j = 1; j < b.length + 1; j++) {
            var x = a[i - 1] == b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + x
            );
        }
    }
    return matrix[a.length][b.length];
};
const JARGONS = require("../dict/jargons.json");
const defaultOptions = {
    distance: 1
};
export default function (context, options = {}) {
    const distance = options.distance || defaultOptions.distance;
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            const text = getSource(node);
            const words = text.split(" ").map(word => {
                var match = word.match(/(\w+)/);
                return match && match[1];
            }).filter(word => word && word.length > 0);
            words.forEach(word => {
                const foundMatchWord = JARGONS.some(jargon => {
                    const jargonWord = jargon.word;
                    // non-case sensitive
                    // if match word then skip checking with other jargon
                    return word.toLowerCase() === jargonWord.toLowerCase();
                });
                if (foundMatchWord) {
                    return;
                }
                JARGONS.forEach(jargon => {
                    const jargonWord = jargon.word;
                    const len = distanceWords(word, jargonWord);
                    if (len !== 0 && len <= distance) {
                        report(node, new RuleError(`${word} => ${jargonWord}
See ${jargon.url} for details on.`));
                        return true;
                    }
                })
            });
        }
    }
}