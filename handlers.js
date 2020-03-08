const words = require('./data/words')


const handleWords = (req, res) => {
    const getRandomWord = () =>{
    
        randomWord = words[Math.floor(Math.random()* words.length)];
        
        return randomWord;
        
        }
    const getWord =  getRandomWord();
    console.log(getWord)
    res.status(200).send({
        id: getWord.id, 
        letterCount: getWord.letterCount
    })
}
const handleLetters = (req, res) =>{
    let liveWord = req.params.wordId
    let inputLetter = req.params.letter
    let findWord = words.find(word=> {return word.id === liveWord});
    let splitWord = findWord.word.split('');
    let isLetterGood = splitWord.map(secretLetter => {return secretLetter === inputLetter});
    console.log(isLetterGood, inputLetter)
    res.send ({
        response : isLetterGood,
        letter: inputLetter,
        status:  'success'
    })
};

module.exports = {
    handleWords,
    handleLetters
}
