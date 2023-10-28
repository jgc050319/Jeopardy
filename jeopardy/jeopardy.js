// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
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

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare"},
 *      {question: "Bell Jar Author", answer: "Plath"},
 *      ...
 *   ]
 */


function getCategory(catId) {
}

/** Fill the HTML Card#jeopardy with the categories & cells for questions.
 *
 * - It should contain Card Container div and inside this it contain
 * - Card header div where Category title will be prsent
 * - The it should contain Card body div that contain Category Question,
 * - And in last ist should contain Footer div where it should contain answer which will appear on click.
 * 
 */

async function fillCard() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses showed property on category Index to determine what to show:
 * - if currently null, show question & set showed to "true" and render card with current index
 * - if currently true, show answer & set index to index+1"
 * */


function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO