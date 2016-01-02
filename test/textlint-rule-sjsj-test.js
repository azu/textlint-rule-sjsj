var TextLintTester = require("textlint-tester");
var tester = new TextLintTester();
// rules
import rule from "../src/textlint-rule-sjsj"
// ruleName, rule, expected[]
tester.run("sjsj", rule, {
    valid: [
        "Babel is Babel.",
        "babel is safe."
    ],
    invalid: [
        {
            text: "Babal",
            errors:[
                {
                    message: 'Babal => Babel\n' +
                    'See https://github.com/HugoGiraudel/SJSJ/tree/master/glossary/BABEL.md for details on.'
                }
            ]
        }
    ]
});