const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const save = document.getElementById('save');
const favQuote = document.getElementById('fav-quote');
const modal = document.getElementById('modal');
const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const singleQuote = document.getElementById('single-quote');
let savedQuotes = [];

// Display modal
function displayModal() {
  modal.classList.add('show-modal');
}
// Modal Event Listener
showModal.addEventListener('click', displayModal);
closeModal.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);
// Show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
removeLoadingSpinner();

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from qpiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // Check if Author field is blank and replace it with 'unKnown'
  if (!quote.author) {
    author.textContent = '-' + 'Unknown';
  } else {
    authorText.textContent = '- ' + quote.author;
  }

  // Check Quote length to deteremine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
// Add to Favroites
function addToFavrouites() {
  savedQuotes.map((quote, i) => {
    const singleQuote = document.createElement('div');
    singleQuote.classList.add('modal');
    // const heading = document.createElement('h3');
    // heading.textContent = 'Your Favorite Quotes';
    // const horizontalLine = document.createElement('hr');

    const para = document.createElement('p');
    para.setAttribute('id', 'fav-quote');
    para.textContent = quote;

    singleQuote.append(para);
    modal.appendChild(singleQuote);
    // return (favQuote.textContent = quote);
  });
}
// Fetch Quotes from local Storage
function fetchQuotes() {
  if (localStorage.getItem('Quotes')) {
    savedQuotes = JSON.parse(localStorage.getItem('Quotes'));
  } else {
    favQuote.textContent = 'Please Add some quotes';
  }
  addToFavrouites();
}
fetchQuotes();
// Delete Quote
function deleteQuote(index) {
  savedQuotes = [];
  // for (let i = 0; i < savedQuotes.length; i++) {
  //   console.log(savedQuotes[i] === index);
  // }
  // savedQuotes.map((quote, index) => {
  //   // quote.map((singleQuote) => {
  //   // });
  //   // console.log(typeof quote);
  //   // if (index === i) {
  //   //   savedQuotes.splice(i, 1);
  //   // }
  // });
}
// Saved Quotes
function saveQuote() {
  const currentQuote = quote.textContent;

  savedQuotes.push(currentQuote);
  localStorage.setItem('Quotes', JSON.stringify(savedQuotes));
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
save.addEventListener('click', saveQuote);
