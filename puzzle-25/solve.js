import { words } from 'popular-english-words'
import  fs  from "fs";
String.prototype.removeCharAt = function (i) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}

const searchForSubstring = (substring, remainingForWord, totalRemaining, length) => {

    if(substring.length > length) return null;

    //check if just the current substring is a word
    if(substring.length == length && wordMap.has(substring)) {
        return {
            validWord:substring,
            remainingString: totalRemaining
        }
    }

    //if just the current substring is not a word, and we have no string remaining
    if(!remainingForWord || remainingForWord.length == 0) {
        return null;
    }

    //check if the current substring + any 1 letter in the string is a word
    let index = 0;
    for(let char of remainingForWord) {
        //is it valid when we add this letter?
        const word = (substring + char);
        const indexFromEnd = remainingForWord.length - 1 - index;
        const newRemainingForWord = remainingForWord.substring(index + 1);
        const newTotalRemaining = totalRemaining.slice(0, totalRemaining.length - 1  - indexFromEnd) + totalRemaining.slice(totalRemaining.length  - indexFromEnd)
        
        if(word.length == length && wordMap.has(word)) {
            return {
                validWord: word, 
                remainingString: newTotalRemaining
            }
        }

        //if not, check for more words with this letter 
        const results = searchForSubstring(word, newRemainingForWord, newTotalRemaining, length);
        if(results) return results;

        index++;
    }

    return null;
}

const solve = (originalString) => {
    // papsfrutesutternet - 18 total, 17 usable

    const usableLength = originalString.length - 1;
    const possibleWordLengths = [];
    
    for(let i = 1; i < usableLength - 1; i++) {
        for(let j = 1; j < usableLength - i; j++) {
            const lengths = [i, j, usableLength - i - j];
            possibleWordLengths.push(lengths);
        }
    }

    //sort them by probable word lengths bring of similar word length?
    possibleWordLengths.sort((a, b) => {
        return (Math.abs(a[0]-a[1]) + Math.abs(a[1]-a[2]) + Math.abs(a[0]-a[2])) - (Math.abs(b[0]-b[1]) + Math.abs(b[1]-b[2]) + Math.abs(b[0]-b[2]));
    })

    originalString = originalString.toLowerCase();
    console.log("Original String: ", originalString);


    for(let lengths of possibleWordLengths) {
        //try each combo starting with likely word lengths

        const wordASearchResults = searchForSubstring("", originalString, originalString, lengths[0]);
        if(!wordASearchResults) {
            continue;
        }
    
        const wordBSearchResults = searchForSubstring("", wordASearchResults.remainingString, wordASearchResults.remainingString, lengths[1]);
        if(!wordBSearchResults) {
            continue;
        }
    
        const wordCSearchResults = searchForSubstring("", wordBSearchResults.remainingString, wordBSearchResults.remainingString, lengths[2]);
        if(!wordCSearchResults) {
            continue;
        }
        
        console.log("SOLVED: ");
        console.log(wordASearchResults, wordBSearchResults, wordCSearchResults);
        
        
    }

}












// var wordbank = words.getMostPopular(2000);

var text = fs.readFileSync("./words.txt");
var textByLine = text.toString().split("\n")

const wordMap = new Map();
for(let word of textByLine) {
    wordMap.set(word, true);
}

// console.log(wordMap.has('pizza'))

solve("papsfrutesutternet");
