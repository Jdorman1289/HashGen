"use strict";

function generateHashTag(str) {
    let outputText = document.getElementById("outputText");
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
        outputText.innerHTML = (tagList.join("")); //Comment this line out for Jasmine test
        return tagList.join("");
    }
}