const elForm = document.querySelector(".site-form");
const elSearchInput = elForm.querySelector(".form-search-input");
const elSearchSort = elForm.querySelector(".site-select-sort");
const elSearchYear = elForm.querySelector(".form-search-year");
const elSelectAuthor = elForm.querySelector(".site-select-author");
const elSelectLanguage = elForm.querySelector(".site-select-language");
const elList = document.querySelector(".books-list");


const newFragment = document.createDocumentFragment();
// template

function showSearchMovies(search) {
  const filteredMovies = books.filter(item => {
    const moreCriterias =  String(item.title).match(search);
    return moreCriterias;
  });  
  return filteredMovies;
};


for (const  book of books) {

  const elTemp = document.querySelector(".book-temp").content;
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

elForm.addEventListener("submit", evt =>{
  evt.preventDefault();
  
  elList.innerHTML = "";
  
  const elFormInputValue = elSearchInput.value.trim();
  const regexValue = new RegExp(elFormInputValue, "gi");
  
  const searchMovie = showSearchMovies(regexValue)
  
  
  if (searchMovie.length > 0){
    
    for (const  book of searchMovie) {
      
      const elTemp = document.querySelector(".book-temp").content;
      const elCloneTemp = elTemp.cloneNode(true);
      
      elCloneTemp.querySelector(".book-img").src = book.imageLink;
      
      if(regexValue.source != "(?:)" && regexValue){
        elCloneTemp.querySelector(".book-title").innerHTML = book.title.replace(regexValue, `<mark class="bg-warning">${regexValue.source.toLowerCase()}</mark>`);
      } else {
        elCloneTemp.querySelector(".book-title").textContent = book.title;
      }
      elCloneTemp.querySelector(".book-desc").textContent = book.author;
      elCloneTemp.querySelector(".book-year").textContent = book.year;
      elCloneTemp.querySelector(".book-page").textContent = book.pages;
      elCloneTemp.querySelector(".book-language").textContent = book.language;
      elCloneTemp.querySelector(".book-link").href = book.link;
      
      newFragment.appendChild(elCloneTemp);
    };
    
    elList.appendChild(newFragment);
    
    
  }else{
    elList.innerHTML = "Movie not found !!!";
  }
})

