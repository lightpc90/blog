

const capitalizeFirstLetter = (input) => {
    if (typeof input !== 'string' || input.length === 0) {
        return input; // Return input as is if it's not a string or empty
      }
    
      const firstLetter = input.charAt(0).toUpperCase();
      const secondLetter = input.charAt(1).toUpperCase()
      const restOfWord = input.slice(1).toLowerCase();
    
      return {fullSentence: firstLetter + restOfWord, firstLetter: firstLetter, firstTwoLetters: firstLetter + secondLetter};
}

export default capitalizeFirstLetter