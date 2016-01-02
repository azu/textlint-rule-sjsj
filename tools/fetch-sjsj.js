#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const remark = require("remark");
const walk = require('estree-walker').walk;
const BASE_URL = "https://github.com/HugoGiraudel/SJSJ/tree/master";
const API_ENDPOINT = "https://api.github.com/repos/HugoGiraudel/SJSJ/readme";
function allJargons(AST) {
    var results = [];
    walk(AST, {
        enter: function (node, parent) {
            if (node.type !== "link") {
                return;
            }
            if (/glossary/.test(node.href)) {
                const text = node.children[0].value;
                results.push({
                    word: text,
                    url: BASE_URL + node.href
                });
            }
        }
    });
    return results;
}
fetch(API_ENDPOINT, {
    headers: {
        "Accept": "application/vnd.github.VERSION.raw"
    }
}).then(response => response.text()).then(response => {
    var AST = remark.parse(response);
    var jargons = allJargons(AST);
    var contents = JSON.stringify(jargons, null, 4);
    fs.writeFileSync(path.join(__dirname, "..", "dict", "jargons.json"), contents, "utf-8");
}).catch(error => {
    console.error(error);
});