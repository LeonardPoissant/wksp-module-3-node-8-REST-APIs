const displayWord = document.getElementById("displayWord");
const letter = document.getElementById("letter");
const guessedLetters = document.getElementById("guessedLetters");
let wordToGuess = [];
let myWordId = 0;
let guessedLetter = [];

const setUnderscores = x => {
  let fill = "";
  for (let i = 0; i < x; i++) {
    fill += " _ ";
  }
  return fill;
};

const createGame = () => {
  fetch("/hangman/words", {
    headers: {
      Application: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(data => data.json())
    .then(res => {
      let myWord = res;
      myWordId = myWord.id;
      let myWordLength = myWord.letterCount;
      wordToGuess = setUnderscores(myWordLength);

      //displayWord.innerText =  Array.apply(null, Array(wordLength)).map(_ => '_')
      displayWord.innerText = wordToGuess;
      console.log(myWordLength);
      console.log(myWordId);

      // window.location.href =(`/hangman/guess/${myWordId}/${guessLetter}`)
    });
};

const handleGame = event => {
  event.preventDefault();
  fetch(`/hangman/guess/${myWordId}/${event.target.elements[0].value}`, {
    headers: {
      Application: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(data => data.json())
    .then(res => {
      const { response, letter } = res;
      //I NEED TO SET THE WORDTOGUESS LETTERS TO FALSE BY DEFAULT(WHEN THE GAME STARTS)
      //THEN COMPARE THEM TO THE VALUES OF THE NEW ARRAY THATS SENT
      //IF THERES A MATCH UPDATE WORDTOGUESS WITH IT
      console.log("ASDKJASDKJ", wordToGuess[letter]);
      console.log("***********", response);
      console.log("***********", letter);
      response.forEach((item, index) => {
        if (item === true) {
          wordToGuess = response;
          wordToGuess[index] = letter;
          return (displayWord.innerHTML = wordToGuess[index]);
        }
        console.log("asdSDKJSDKJS", wordToGuess);

        //wordToGuess.forEach((letter, index) => {
        //   displayWord.innerHTML = letter;
        // });

        //UPDATE THE GLOBAL VARIABLE TO KEEP THE VALUE OF TRUTHY FALSY VALUESSO YA OK
        //for (i = 0; i < response.length; i++) {
        //if (response[i]) {
        //wordToGuess[i] = letter;
        //  }
        // }
      });
    });
};

// async function playGame(event){
//  event.preventDefault();

//   let letter = await
//}
///
// console.log(id)
//DESTRUCED ELEMENTS ARE UNUSED || ISNT IT PASSED DOWN TO THE NEXT .THEN ?
//  }//
//})
//.then(res =>{
//
//})
