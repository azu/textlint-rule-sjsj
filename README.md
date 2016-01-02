# textlint-rule-sjsj [![Build Status](https://travis-ci.org/azu/textlint-rule-sjsj.svg?branch=master)](https://travis-ci.org/azu/textlint-rule-sjsj)

[textlint](https://github.com/textlint/textlint "textlint") rule that check spell using [HugoGiraudel/SJSJ](https://github.com/HugoGiraudel/SJSJ "HugoGiraudel/SJSJ")(Simplified JavaScript Jargon).

## Installation

    npm install textlint-rule-sjsj

## Usage

Via CLI

    npm install textlint textlint-rule-sjsj -g
    textlint --rule textlint-rule-sjsj README.md
    
Via `.textlintrc`

    {
        "rules": {
            "sjsj": {
                // spelling errors are an edit distance of 1 from the target.
                "distance": 1
            }
        }
    }

## Update jargons

    ./tools/fetch-sjsj.js
    # update dict/jargons.json

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT