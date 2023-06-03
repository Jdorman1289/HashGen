"use strict";

// Function to generate hashtags
function generateHashTags() {
    // Get user input
    let inputText = document.getElementById("inputText").value;
    let outputDiv = document.getElementById("outputDiv");

    // Normalize input text and split it into words
    let words = inputText.toLowerCase().split(" ");

    // Initialize an empty array for hashtags
    let hashtags = [];

    // Loop through the words and generate hashtags
    for (let word of words) {
        // Ignore short or meaningless words
        if (word.length > 2) {
            // Add the hashtag symbol and push the word to the array
            hashtags.push("#" + word);
        }

        // Limit the number of generated hashtags to 10
        if (hashtags.length == 10) {
            break;
        }
    }

    // Clear previous hashtags in the output
    outputDiv.innerHTML = '';

    // Generate clickable hashtags and add them to the output
    for (let hashtag of hashtags) {
        // Create new clickable element
        let newElement = document.createElement('a');
        newElement.setAttribute('href', 'https://twitter.com/hashtag/' + hashtag.slice(1));
        newElement.setAttribute('target', '_blank');
        newElement.textContent = hashtag;

        // Add a space after the hashtag
        outputDiv.appendChild(newElement);
        outputDiv.innerHTML += ' ';
    }
}

// Attach the function to a button
let generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", generateHashTags);
