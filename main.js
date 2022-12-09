let questionItem = document.querySelectorAll('.question-block');
let questionDisplay = document.querySelector('#question-display');
let scoreDisplay = document.querySelector('#score-display');
let userAnswer = document.querySelector('#user-answer');
let statusMessage = document.querySelector('#status-message');
let overlay = document.querySelector('#overlay');
let question = document.querySelector('#question');
let answerForm = document.querySelector("#answer-form");

let CURR_ANSWER = "";
let POINTS = "";

overlay.getElementsByClassName.display = 'name';

overlay.addEventListener('click', () => {
     statusMessage.innerText = 'The question needs to be answered.';
})

let totalScore = 0;
scoreDisplay.innerText = totalScore;

let rawJeopardyData = async () => {

}

// getting data $value

let readJeopardyData = async () => {
     let rawJeopardyData = await fetch('jeopardy.json');
     console.log(rawJeopardyData);
     let data = await rawJeopardyData.json();
     console.log(data);


     let groupedData = _.groupBy(data, 'value');

     console.log(groupedData);
     console.log(groupedData.$200);


     questionItem.forEach(item => {

          item.addEventListener('click', () => {

               console.log(`item ${item} clicked`);

               overlay.style.display = 'block';

               statusMessage.innerText = "";
               userAnswer.value = "";

               item.classList.add('selected');
               console.log(item.innerText);

               console.log(`${groupedData[item.innerText]}Question Worth {item.innerText}`);

               randomQuestionObj = groupedData[item.innerText][Math.floor(Math.random())];
               question = randomQuestionObj['question'];
               CURR_ANSWER = randomQuestionObj['answer'];
               console.log(question);
               console.log(CURR_ANSWER);

               questionDisplay.innerHTML = question;

               POINTS = "";

          for (let i = 1; i < item.innerText.length; i++){
               POINTS += item.innerText[i];
          }
          });
     });
}     

//true answer verified
answerForm.addEventListener('submit', (event) => {
     event.preventDefault();

     console.log('you answered' + userAnswer.value);

     if (userAnswer.value === "" && CURR_ANSWER !== ""){

          statusMessage.innerText = 'Enter Answer!';

     }else if(CURR_ANSWER !== userAnswer.value.toUpperCase() === CURR_ANSWER.toUpperCase()){
          questionDisplay.innerHTML = ('Correct Great!');

          overlay.style.display = 'none';

          totalScore = Number(POINTS);
          scoreDisplay.innerText = totalScore;
          statusMessage.innerText = "";
          question = "";
          CURR_ANSWER = "";
          userAnswer.value = "";

     }else if(userAnswer.value.toUpperCase() === 'yes' && !questionDisplay.innerText.incudes('wrong') && !questionDisplay.innertext.incudes('correct great!')){
               totalScore -= 50;
               scoreDisplay.innerText = totalScore;

     
     }else if(CURR_ANSWER === ""){
          statusMessage.innerText = 'Pick A Question';
          userAnswer.value = "";


     }else{
          questionDisplay.innerHTML = 'Incorrect! The Correct Answer Is: ${answer}';
          totalScore -= Number(POINTS);
          scoreDisplay.innerText = totalScore;
          overlay.style.display = 'none';

          question = "";
          CURR_ANSWER = "";
          userAnswer.value = "";
          statusMessage.innerText = "";

     }
});
readJeopardyData();
