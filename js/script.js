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