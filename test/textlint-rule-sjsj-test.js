var TextLintTester = require("textlint-tester");
var tester = new TextLintTester();
// rules
import rule from "../src/textlint-rule-sjsj"
// ruleName, rule, expected[]
tester.run("sjsj", rule, {
    valid: [
        "Babel is Babel."
    ],
    invalid: [
        {
            text: "Babal",
            errors:[
                {
                    message: 'Babal => Babel\n' +
                    '"Babel" detail on https://github.com/HugoGiraudel/SJSJ/tree/master/glossary/BABEL.md'
                }
            ]
        }
    ]
});