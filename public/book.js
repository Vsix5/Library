const booksContainer = document.querySelector('#books-container');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('#search-form');
const categoryFilter = document.querySelectorAll('.category-filter');
async function getBooks(searchTerm = '', selectedCategories = []
) {
  renderLoading();
  let url = '/api/books';
  try {
    const params = new URLSearchParams();
    if(searchTerm){
     params.set('search', searchTerm)
    }
     selectedCategories.forEach((category) => {
      params.append("category", category);
     })
     url = `/api/books?${params.toString()}`
    
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const books = await response.json();
    renderBooks(books);
  }
  catch(error){
    console.error('Failed to fetch books:', error);
    renderError();
  }
}

getBooks();

function renderBooks(books){
  booksContainer.replaceChildren();
  if(books.length === 0){
    const noBookCard = document.createElement('div');

    noBookCard.classList.add('no-books')

    const noBooks = document.createElement('p');

    noBooks.textContent = "No books available"

    noBooks.classList.add('books-empty-message');
    
    noBookCard.appendChild(noBooks)
    booksContainer.appendChild(noBookCard)
    return;
  }
 books.forEach((book) => {
     const card = createBookCard(book);
     booksContainer.appendChild(card);
})
}

function createBookCard(book){

  const card = document.createElement('article');
  card.classList.add('book-card');
  const title = document.createElement('h3');
  title.textContent = book.title;
  title.classList.add('book-title');
  card.appendChild(title);
  const author = document.createElement('p');
  author.textContent = book.author;
  author.classList.add('book-author');
  card.appendChild(author);
  const price = document.createElement('span');
  price.textContent = `$${book.price}`;
  price.classList.add('book-price');
  card.appendChild(price);
  return card;
}
function renderLoading() {
  booksContainer.replaceChildren();
  const loadingMessage = document.createElement('p');
  loadingMessage.classList.add('books-loading-message');
  loadingMessage.textContent = "Loading Books.....";
  booksContainer.appendChild(loadingMessage);
}
function renderError() {
  booksContainer.replaceChildren();
  const errorMsg = document.createElement('p');
  errorMsg.classList.add('books-error-message');
  errorMsg.textContent = "Unable to load books. Please try again."
  booksContainer.appendChild(errorMsg);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  console.log('Form Submitted Successfully')
  getBooks(searchTerm)
})

categoryFilter.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    console.log(checkbox.value)
    const selectedCategories = [];
    categoryFilter.forEach((category) => {
      if(category.checked){
        selectedCategories.push(category.value);
      }
    })
    console.log(selectedCategories);
      getBooks('', selectedCategories);

  })
})
