/* eslint max-classes-per-file: ["error", 2] */
class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  
  class Library {
    constructor() {
      this.books = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    }
  
    addBook(title, author) {
      const book = new Book(title, author);
      this.books.push(book);
      localStorage.setItem('bookLibrary', JSON.stringify(this.books));
    }
  
    removeBook(index) {
      this.books.splice(index, 1);
      localStorage.setItem('bookLibrary', JSON.stringify(this.books));
    }
  
    displayBooks() {
      const table = document.getElementById('books-table');
      table.innerHTML = '';
      table.innerHTML = this.books
        .map(
          (book, index) => `<tr><td>"${book.title}" by ${book.author}</td><td><button data-index="${index}">Remove</button></td></td></tr>`,
        )
        .join('');
      this.setRemoveButtonListeners();
    }
  
    setRemoveButtonListeners() {
      const removeButtons = document.querySelectorAll('#books-table button');
      removeButtons.forEach((button) => {
        const { index } = button.dataset;
  
        button.addEventListener('click', () => {
          this.removeBook(index);
          this.displayBooks(); // added to update the displayed books after removing one
        });
      });
    }
  }
  
  const library = new Library();
  library.displayBooks();
  
  document.getElementById('add-book-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.getElementById('books-form');
    const title = form.elements.title.value.trim();
    const author = form.elements.author.value.trim();
    if (title !== '' && author !== '') {
      library.addBook(title, author);
      library.displayBooks();
      form.reset();
    }
  });
  
  // Display current time
  const currentTime = document.getElementById('time');
  const now = new Date();
  const date = now.toDateString();
  const time = now.toLocaleTimeString();
  currentTime.innerHTML = `${date} ${time}`;
  
  // Single page execution
  
  // Access the nav list
  const bookListPage = document.getElementById('book-list-page');
  const addBookPage = document.getElementById('add-book-page');
  const contactPage = document.getElementById('contact-page');
  
  // Access the sections to display or not
  const booksList = document.getElementById('books-list');
  const formGroup = document.getElementById('form-group');
  const contactSection = document.getElementById('contact');
  
  // Add event listeners
  bookListPage.addEventListener('click', () => {
    formGroup.style.display = 'none';
    booksList.style.display = 'block';
    contactSection.style.display = 'none';
  });
  
  addBookPage.addEventListener('click', () => {
    formGroup.style.display = 'block';
    booksList.style.display = 'none';
    contactSection.style.display = 'none';
  });
  
  contactPage.addEventListener('click', () => {
    formGroup.style.display = 'none';
    booksList.style.display = 'none';
    contactSection.style.display = 'block';
  });
  
  window.addEventListener('load', () => {
    formGroup.style.display = 'none';
    booksList.style.display = 'block';
    contactSection.style.display = 'none';
  });