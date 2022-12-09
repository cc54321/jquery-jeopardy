let questionItem = document.querySelectorAll('question-block');
let questionDisplay = document.querySelector('#question-display');
let scoreDisplay = document.querySelector('#score-display');
let userAnswer = document.querySelector('#user-answer');
let statusMessage = document.querySelector('#status-message');
let overlay = document.querySelector('#overlay');
let question = document.querySelector('#question');

overlay.getElementsByClassName.display = 'name';

overlay.addEventListener('click', () => {
     statusMessage.innerText = 'the question needs to be answered';
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

     let answer = "";
     let points = "";

     questionItem.forEach(item => {

          item.addEventListener('click', () => {

               overlay.style.display = 'block';

               statusMessage.innerText = "";
               userAnswer.value = "";

               item.classList.add('selected');

               console.log(`${groupedData[item.innerText].length}Question Worth {item.innerText}`);

               randomQuestionObj = groupedData[innerText][Math.floor(Math.random() = groupedData[item.innerText].legnth)];
               question = randomQuestionObj['question'];
               answer = randomQuestionObj['answer'];

               questionDisplay.innerHTML = question;

               points = "";

          for (let i = 1; i < item.innerText.length; i++){
               points += item.innerText[i];



             //true answer verified
               answerForm.addEventListener('submit', (event) => {
                    event.preventDefault();

                    console.log('you answered' + userAnswer.value);

                    if (userAnswer.value === "" && answer !== ""){

                         statusMessage.innerText = 'Enter Answer!';

                    }else if(answer !== userAnswer.value.toUpperCase() === answer.toUpperCase()){
                         questionDisplay.innerHTML = ('Correct!');

                         overlay.style.display = 'none';

                         totalScore = Number(points);
                         scoreDisplay.innerText = totalScore;
                         statusMessage.innerText = "";
                         question = "";
                         answer = "";
                         userAnswer.value = "";

                    }else if(userAnswer.value.toUpperCase() === 'yes' && !questionDisplay.innerText.incudes('wrong') && !questionDisplay.innertext.incudes('correct')){
                          totalScore -= 50;
                          scoreDisplay.innerText = totalScore;

                    
                    }else if(answer === ""){
                         statusMessage.innerText = 'Pick A Question';
                         userAnswer.value = "";


                    }else{
                         questionDisplay.innerHTML = 'Incorrect! The Correct Answer Is: ${answer}';
                         totalScore -= Number(points);
                         scoreDisplay.innerText = totalScore;
                         overlay.style.display = 'none';

                         question = "";
                         answer = "";
                         userAnswer.value = "";
                         statusMessage.innerText = "";

                    }
               })

          }


          })
     })

}
readJeopardyData();
