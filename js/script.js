"use strict";

function generateHashTag() {
    let outputText = document.getElementById("outputText");
    let str = document.getElementById("theText").value
    let list = str.split(" ");
    let tagList = [];
    list.forEach(word => {
        tagList.push(word.charAt(0).toUpperCase() + word.slice(1));
    });

    if (tagList.join("") === "") {
        return false;
    } else if (tagList.join("").length > 139) {
        return false;
    } else {
        tagList.unshift("#");
        outputText.innerHTML = (tagList.join(""));
    }
}

// Load data file using AJAX
let data = null;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        data = this.responseText;
    }
};
xhttp.open("GET", "shakespeare_set.txt", true);
xhttp.send();

// Function to split string into words
function splitIntoWords(str) {
    return str.trim().split(/\s+/);
}

// Total next outcomes function
function totalNextOutcomes(data, prompt) {
    let dataWords = splitIntoWords(data);
    let promptWords = splitIntoWords(prompt);
    let nextWords = {};
    let comboSize = promptWords.length;
    for (let i = 0; i <= dataWords.length - comboSize; i++) {
        if (dataWords.slice(i, i + comboSize).join(' ') === prompt) {
            let nextWord = dataWords[i + comboSize];
            nextWords[nextWord] = (nextWords[nextWord] || 0) + 1;
        }
    }
    return nextWords;
}

// Most probable word function
function mostProbableWord(wordCount) {
    let values = Object.values(wordCount);
    let isProbabilitySame = values.every(val => val === values[0]);
    let keys = Object.keys(wordCount);
    if (isProbabilitySame) {
        return keys[Math.floor(Math.random() * keys.length)];
    } else {
        let highestCount = 0;
        let mostProbableWord = "";
        for (let key in wordCount) {
            if (wordCount[key] > highestCount) {
                highestCount = wordCount[key];
                mostProbableWord = key;
            }
        }
        return mostProbableWord;
    }
}

let contextWords = [];
let prompt = window.prompt("Prompt: ");
let referencePrompt = prompt;

// Loop to generate text continuations
while (true) {
    try {
// Get the dictionary of next words and their count
        let nextWords = totalNextOutcomes(data, prompt);
// Get the most probable next word
        let nextWord = mostProbableWord(nextWords);

        console.clear();

        console.log(referencePrompt + " " + contextWords.join(' '));

        let isKeeping = window.prompt(`Suggested word: '${nextWord}'\n\nPress 1 to keep or 2 to change. `);
        if (isKeeping === '1') {
            contextWords.push(nextWord);
            prompt = contextWords.join(' ');
        } else {
            prompt = window.prompt("Enter the next word: ");
            contextWords.push(prompt);
        }

        if (contextWords[contextWords.length - 1].endsWith('.') ||
            contextWords[contextWords.length - 1].endsWith('?') ||
            contextWords[contextWords.length - 1].endsWith('!')) {
            let isDone = window.prompt("\n\nWould you like to continue? Press 1 to continue or 2 to end.\n");
            if (isDone === '1') {
                prompt = window.prompt("Prompt: ");
            } else {
                break;
            }
        }
    } catch (error) {
        console.clear();
        console.log("\n" + referencePrompt + " " + contextWords.join(' '));
        let quitOnShakespeare = window.prompt("\nShakespeare has no suggestions for that.\nWould you like to continue? Press 1 to continue or 2 to end. ");
        if (quitOnShakespeare === '1') {
            prompt = window.prompt("Prompt: ");
            contextWords.push(prompt);
        } else {
            break;
        }
    }
}

console.clear();
// Print the generated text
console.log("\nGenerated Text:\n");
console.log(referencePrompt + " " + contextWords.join(' '));

