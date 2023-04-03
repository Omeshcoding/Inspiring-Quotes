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

let apiQuotes = [];

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

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from qpiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
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

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes);
  } catch (error) {
    // Catch Error Here
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
// Add to Favroites
function addToFavrouites() {
  savedQuotes.map((quote, i) => {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const para = document.createElement('p');
    para.setAttribute('id', 'fav-quote');
    para.textContent = quote;
    const deleteBtn = document.createElement('i');
    // deleteBtn.classList.add('fas', 'fa-trash');
    // deleteBtn.setAttribute('onclick', `deleteQuote(${i})`);
    modalContent.append(para, deleteBtn);
    singleQuote.appendChild(modalContent);
  });
}
// Fetch Quotes from local Storage
function fetchQuotes() {
  if (localStorage.getItem('Quotes')) {
    savedQuotes = JSON.parse(localStorage.getItem('Quotes'));
  }
  addToFavrouites();
}

// Saved Quotes
function saveQuote() {
  // e.preventDefault();

  const currentQuote = quote.textContent;

  savedQuotes.push(currentQuote);
  localStorage.setItem('Quotes', JSON.stringify(savedQuotes));
  // console.log(savedQuotes);
  // fetchQuotes();
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
save.addEventListener('click', saveQuote);
// On Load
getQuotes();
fetchQuotes();
