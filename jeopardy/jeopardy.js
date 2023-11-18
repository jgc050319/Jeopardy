const startBtn = document.getElementById("startBtn");
const reStartBtn = document.getElementById("restartBtn");
const jeopardyTable = document.getElementById("jTable");
const BASE_URL = "http://jservice.io/api";
// gameBoard data variable
let gameInfo = [];
let qClicks = 0;

function checkWin() {
  console.log(`qclicks: ${qClicks}`);
  if (qClicks === 12) {
    document.getElementById("jeopardyTable").classList.add("visually-hidden");
    document.getElementById("gameOver").classList.remove("visually-hidden");
    document.getElementById("restartBtn").classList.add("pulse");
  }
}

function ansClick(questionData) {
  document.getElementById("jeopardyTable").classList.add("visually-hidden"); //hide loader
  document.getElementById("jeopardyCard").classList.remove("visually-hidden"); //show table
  document
    .getElementById("jeopardyCard")
    .querySelector("div.categor").textContent = questionData.cat;
  document
    .getElementById("jeopardyCard")
    .querySelector("div.question").textContent = questionData.question;
  const ansElement = document
    .getElementById("jeopardyCard")
    .querySelector("div.ans");
  ansElement.textContent = "Click for Answer";
  ansElement.addEventListener("click", function (e) {
    //diplay ans onClick
    e.preventDefault();
    ansElement.innerHTML = `
          ${questionData.ans}
          <br>
          <button class="btn btn-warning" id="backBtn">Back to the Board</button>
          `;
    document.getElementById("backBtn").addEventListener("click", function (e) {
      e.preventDefault();
      qClicks++;
      document.getElementById("jeopardyCard").classList.add("visually-hidden"); //hide loader
      document
        .getElementById("jeopardyTable")
        .classList.remove("visually-hidden"); //show backBtn
      checkWin();
    });
  });
}

// handle clicks on questions
function handleClick(e) {
  const objectIndex = e.classList[2];
  const pos = e.classList[1];

  if (pos == "Top") {
    // if top click
    ansClick(gameInfo[objectIndex]["q1"]);
  } else {
    // if bottom click
    ansClick(gameInfo[objectIndex]["q2"]);
  }
}

// get gameData
async function getCategoriesIds() {
  // show loading screen
  document.getElementById("loading").classList.remove("visually-hidden");
  // get 6 categories
  let random = Math.floor(Math.random() * 30);
  const catGet = await axios(`${BASE_URL}/categories?count=6&offset=${random}`);
  let categories = [];
  // loop thru categories
  for (const i of catGet.data) {
    const questionGet = await axios.get(
      `http://jservice.io/api/category?id=${i.id}`
    );

    // assign to random questions
    // console.log(`questions for cat: ${questionGet.data.clues}`);
    let random1 = Math.floor(Math.random() * questionGet.data.clues.length);
    let random2 = Math.floor(Math.random() * questionGet.data.clues.length);
    categories.push({
      q1: {
        cat: i.title,
        id: questionGet.data.clues[random1].id,
        question: questionGet.data.clues[random1].question,
        ans: questionGet.data.clues[random1].answer,
      },
      q2: {
        cat: i.title,
        id: questionGet.data.clues[random2].id,
        question: questionGet.data.clues[random2].question,
        ans: questionGet.data.clues[random2].answer,
      },
    });
  }
  // fill game board
  fillTable(categories);
}

// FILL GAME TABLE
function fillTable(gameData) {
  // loop thru gamedata
  gameInfo = gameData;
  for (const i in gameData) {
    // set variables
    const cat = gameData[i].q1.cat.toUpperCase();
    const z = parseInt(i) + 1;

    const catElement = document.querySelector(`.cat${z}`);
    if (catElement) {
      catElement.textContent = cat; // set Category
    }

    const catQ1Element = document.querySelector(`.cat${z}Q1`);
    if (catQ1Element) {
      catQ1Element.textContent = `${gameData[i].q1.cat}, question 1`;
      catQ1Element.classList.remove("bg-danger");
      catQ1Element.classList.add("clickable");
    }

    const catQ2Element = document.querySelector(`.cat${z}Q2`);
    if (catQ2Element) {
      catQ2Element.textContent = `${gameData[i].q2.cat}, question 2`;
      catQ2Element.classList.remove("bg-danger");
      catQ2Element.classList.add("clickable");
    }
  }

  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.classList.add("visually-hidden"); // hide loader
  }

  const jeopardyTableElement = document.getElementById("jeopardyTable");
  if (jeopardyTableElement) {
    jeopardyTableElement.classList.remove("visually-hidden"); // show Table
  }
}

/** On click of start / restart button, set up game. */
startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("startBtn").classList.add("visually-hidden");
  document.getElementById("restartBtn").classList.remove("visually-hidden");
  getCategoriesIds();
});

reStartBtn.addEventListener("click", function (e) {
  document.getElementById("jeopardyTable").classList.add("visually-hidden");
  document.getElementById("gameOver").classList.add("visually-hidden");
  document.getElementById("restartBtn").classList.remove("pulse");
  qClicks = 0;
  getCategoriesIds();
});

/** On page load, add event handler for clicking clues */
jeopardyTable.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("clickable")) {
    console.log(e);
    e.target.classList.add("bg-danger");
    e.target.classList.remove("clickable");
    handleClick(e.target);
  }
});
// const startBtn = document.getElementById("startBtn")


// const tableJeop = document.getElementById("jeopardyTable")
// const BASE_API_URL = "https://jservice.io/api";
// let gameInfo= [];
// const NUM_CATEGORIES = 6;
// const NUM_CLUES_PER_CAT = 5;

// // async function getRandomQuestion(){
// //   const apiResponse = await axios.get(`${BASE_API_URL}/categories?count=6`)
// //   console.log(apiResponse);
// //   let myArray = []
// //   for(let i of apiResponse.data){}

// // }

// // startBtn.addEventListener("click", function(e){
// //   e.preventDefault()
// //   getRandomQuestion()

// // })

// // /*
// // // categories is the main data structure for the app; it looks like this:

// // //  [
// // //    { title: "Math",h
// // //      clues: [
// // //        {question: "2+2", answer: 4, showing: null}, 
// // //        {question: "1+1", answer: 2, showing: null}
// // //        ...
// // //      ],
// // //    },
// // //    { title: "Literature",
// // //      clues: [
// // //        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
// // //        {question: "Bell Jar Author", answer: "Plath", showing: null},
// // //        ...
// // //      ],
// // //    },
// // //    ...
// // //  ]


// startBtn.addEventListener("click", (e)=>{
//   e.preventDefault()
//   startBtn.classList.add('visually-hidden')
//   document.getElementById('restartBtn').classList.remove('visually-hidden')
//   getCategoryIds()
// })
// // async function getQuestions(){
// //   let categories= await axios.get(BASE_API_URL)
// //   let myArray=[];
// //   for (let i of categories.data){
// //     const catQuestions = axios.get(BASE_API_URL)
// //   }
// // }

// /** Get NUM_CATEGORIES random category from API.
//  *
//  * Returns array of category ids
//  */

// async function getCategoryIds() {
//   let categories = [];
//   let response = await axios (`${BASE_API_URL}/categories?count=6&offset=${random}`);
//   document.getElementById("loading").classList.remove("visually-hidden");
//   let random = Math.floor(Math.random()*30);
// //for (let i = 0; i < categoryIds.length; i++) {
// for (let i of response.data) {
//   const dataCategory = await axios.get(`${BASE_API_URL}/category?id=${i.id}`);
// let random1 = Math.floor (Math.random()*dataCategory.data.clues.length)
//   let random2 = Math.floor(Math.random()*dataCategory.data.clues.length)
// categories.push ({
//   question1: {
//     cat:i.title,
//     id : dataCategory.data.clues[random1].id,
//     question:dataCategory.data.clues[random1].question,
//     answer:dataCategory.data.clues[random1].answer,

//   },  question2: {
//     cat:i.title,
//     id : dataCategory.data.clues[random2].id,
//     question:dataCategory.data.clues[random2].question,
//     answer:dataCategory.data.clues[random2].answer,

//   }
// }); 
// }
// fillTable(categories)
// }
// /** Return object with data about a category:
//  *
//  *  Returns { title: "Math", clues: clue-array }
//  *
//  * Where clue-array is:
//  *   [
//  *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//  *      {question: "Bell Jar Author", answer: "Plath", showing: null},
//  *      ...
//  *   ]
//  */

// /** Fill the HTML table#jeopardy with the categories & cells for questions.
//  *
//  * - The <thead> should be filled w/a <tr>, and a <td> for each category
//  * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
//  *   each with a question for each category in a <td>
//  *   (initally, just show a "?" where the question/answer would go.)
//  */

// async function fillTable(gameData) {
//   console.log(gameData)
// //   question1
// // : 
// // {cat: 'gardens', id: 100620, question: 'In the 1800s city founders designed Macon, Georgia…look like this ancient city known for its gardens', answer: 'Babylon'}

//   getinfo=gameData 
//   for (let i of gameData){
//     const cat= gameData[i].q1.cat.toUpperCase();
//        // const cat= gameData[i].question1.cat.toUpperCase()
//     let z=parseInt(i)+1;
//     document.querySelector(`.cat${z}`).innerText=cat
//  document.querySelector(`.cat${z}Q1`)
//     .innerText=`${cat}, question1`
//    // .innerText=`${gameData[i].question1.cat}, question1`
//     .classList.remove("bg-danger")
//    .classList.add(`clickable`)
//  document.querySelector(`.cat${z}Q2`)
//    .innerText=`${gameData[i].question2.cat}, question2`
//    //.innerText=`${gameData[i].question2.cat}, question2`
//     .classList.remove("bg-danger")
//    .classList.add(`clickable`)
//   }
//   document.getElementById("loading")
//   .classList.add(`visually-hidden`)
//   document.getElementById("jeopardy")
//   .classList.remove(`visually-hidden`)
//   // Add row with headers for categories
//   // $("#jeopardy thead").empty();
//   // let $tr = $("<tr>");
//   // for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
//   //   $tr.append($("<th>").text(categories[catIdx].title));
//   // }
//   // $("#jeopardy thead").append($tr);

//   // // Add rows with questions for each category
//   // $("#jeopardy tbody").empty();
//   // for (let clueIdx = 0; clueIdx < NUM_CLUES_PER_CAT; clueIdx++) {
//   //   let $tr = $("<tr>");
//   //   for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
//   //     $tr.append($("<td>").attr("id", `${catIdx}-${clueIdx}`).text("QUESTION"));
//   //   }
//   //   $("#jeopardy tbody").append($tr);
//   // }
// }
// const loadingElement = document.getElementById("loading");
// if (loadingElement){
//   loadingElement.classList.add("visually-hidden");
// }
// const jeopardyTableElement = document.getElementById("jeopardyTable");
// if (jeopardyTableElement){
//   jeopardyTableElement.classList.remove("visually-hidden");
// }
// document.getElementById("jTable").addEventListener("click",function(e){
// e.preventDefault()
// if (e.target.classList.contains('clickable')){
//   e.target.classList.add('bg-danger')
//   e.target.classList.remove('clickable')
//   handleClick(e.target)
// }
// })


// function handleClick(evt) {
//   let id = evt.target.id;
//   let [catId, clueId] = id.split("-");
//   let clue = categories[catId].clues[clueId];

//   let msg;

//   if (!clue.showing) {
//     msg = clue.question;
//     clue.showing = "question";
//   } else if (clue.showing === "question") {
//     msg = clue.answer;
//     clue.showing = "answer";
//   } else {
//     // already showing answer; ignore
//     return;
//   }

//   // Update text of cell
//   $(`#${catId}-${clueId}`).html(msg);
// }

// /** Start game:
//  *
//  * - get random category Ids
//  * - get data for each category
//  * - create HTML table
//  * */

// // async function setupAndStart() {
// //   let catIds = await getCategoryIds();

// //   categories = [];

// //   for (let catId of catIds) {
    
      

// //     categories.push(await getCategory(catId));
// //   }


// //   fillTable();
// // }

// /** On click of restart button, restart game. */

// $("restartBtn").on("click", getCategoryIds);

// /** On page load, setup and start & add event handler for clicking clues */

// $(async function () {
//     getCategoryIds();
//     $("#jeopardy").on("click", "td", handleClick);
//   }
// );