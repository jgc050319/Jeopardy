const startBtn = document.getElementById("start")
const BASE_API_URL = "https://jservice.io/api/random";
let categories = [];
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",h
//      clues: [
//        {question: "2+2", answer: 4, showing: null}, 
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]


startBtn.addEventListener("click", ()=>{
  startBtn.classList.add('visually-hidden')
  spin-container.classList.remove('visually-hidden')
  jeopardyTable.classList.remove('visually-hidden')
  jeopardyCard.classList.remove('visually-hidden')
  gameOver.classList.add('visually-hidden')
  getQuestions()
})
function getQuestions(){
  axios.get(BASE_API_URL).then((response)=>{
    categories = response.data
    console.log(categories)
  })
}
axios.get(BASE_API_URL)
axios.post(BASE_API_URL)
axios.delete(BASE_API_URL)
axios.put(BASE_API_URL)

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  let categoryIds = [];
  let response = await axios.get(`${BASE_API_URL}categories?count=50`);
  let catIds = response.data.map(c => c.id);
  for (let i = 0; i < 100; i++) {
    const element = response.data[i];
    categoryIds.push(element.id);
  }
for (let i = 0; i < categoryIds.length; i++) {
  const dataCategory = await getCategory(categoryIds[i]);
categories.push (dataCategory);
}}
/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const response = await axios.get(`${BASE_API_URL}`, {
    params: {
      id: catId,
    },
  });

  const categoryWithClues = response.data;
  return {
    id: categoryWithClues.id,
    title: categoryWithClues.title,
    clues: categoryWithClues.clues,
  };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  // Add row with headers for categories
  $("#jeopardy thead").empty();
  let $tr = $("<tr>");
  for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
    $tr.append($("<th>").text(categories[catIdx].title));
  }
  $("#jeopardy thead").append($tr);

  // Add rows with questions for each category
  $("#jeopardy tbody").empty();
  for (let clueIdx = 0; clueIdx < NUM_CLUES_PER_CAT; clueIdx++) {
    let $tr = $("<tr>");
    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
      $tr.append($("<td>").attr("id", `${catIdx}-${clueIdx}`).text("QUESTION"));
    }
    $("#jeopardy tbody").append($tr);
  }
}



function handleClick(evt) {
  let id = evt.target.id;
  let [catId, clueId] = id.split("-");
  let clue = categories[catId].clues[clueId];

  let msg;

  if (!clue.showing) {
    msg = clue.question;
    clue.showing = "question";
  } else if (clue.showing === "question") {
    msg = clue.answer;
    clue.showing = "answer";
  } else {
    // already showing answer; ignore
    return;
  }

  // Update text of cell
  $(`#${catId}-${clueId}`).html(msg);
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  let catIds = await getCategoryIds();

  categories = [];

  for (let catId of catIds) {
    
      

    categories.push(await getCategory(catId));
  }


  fillTable();
}

/** On click of restart button, restart game. */

$("restartBtn").on("click", setupAndStart);

/** On page load, setup and start & add event handler for clicking clues */

$(async function () {
    setupAndStart();
    $("#jeopardy").on("click", "td", handleClick);
  }
);