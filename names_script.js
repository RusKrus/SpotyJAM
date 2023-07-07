console.log('Прямо сейчас мы генерируем тебе крутой никнейм! И это будет...')

const firstWord = ["Великий", "Несокрушимый", "Первосходный", " Умопомрачиетльный", "Талантливый"];
const secondWord = ["Гоблинский", "Счастливый", "Организованый", "Аутентичный"];
const thirdWord = ["Открыватель", "Путешественник", "Убийца", "Коллайдер", "Наемник"];

let randFirst = firstWord[Math.floor(Math.random()*firstWord.length)];
let randSecond = secondWord[Math.floor(Math.random()*secondWord.length)];
let randThird = thirdWord[Math.floor(Math.random()*thirdWord.length)];

let coolName = (`${randFirst} ${randSecond} ${randThird}`);
console.log(coolName)
