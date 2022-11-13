const elForm = document.querySelector(".site-form");
const elSearchInput = elForm.querySelector(".form-search-input");
const elSearchSort = elForm.querySelector(".site-select-sort");
const elSearchYear = elForm.querySelector(".form-search-year");
const elSelectAuthor = elForm.querySelector(".site-select-author");
const elSelectLanguage = elForm.querySelector(".site-select-language");
const elList = document.querySelector(".books-list");


const newFragment = document.createDocumentFragment();
// template
const elTemp = document.querySelector(".book-temp").content;

for (const  book of books) {

  const elCloneTemp = elTemp.cloneNode(true);

  elCloneTemp.querySelector(".book-img").src = book.imageLink;
  elCloneTemp.querySelector(".book-title").textContent = book.title;
  elCloneTemp.querySelector(".book-desc").textContent = book.author;
  elCloneTemp.querySelector(".book-year").textContent = book.year;
  elCloneTemp.querySelector(".book-page").textContent = book.pages;
  elCloneTemp.querySelector(".book-language").textContent = book.language;
  elCloneTemp.querySelector(".book-link").href = book.link;

  newFragment.appendChild(elCloneTemp);
};
elList.appendChild(newFragment);
