const elForm = document.querySelector(".site-form");
const elSearchInput = elForm.querySelector(".form-search-input");
const elSearchSort = elForm.querySelector(".site-select-sort");
const elSearchYear = elForm.querySelector(".form-search-year");
const elSelectAuthor = elForm.querySelector(".site-select-author");
const elSelectLanguage = elForm.querySelector(".site-select-language");
const elList = document.querySelector(".books-list");

const elLanguage = [];

// feragment
const newFragment = document.createDocumentFragment();
AOS.init();

function showSearchMovies(search, year, author, language) {
  const filteredMovies = books.filter(item => {
    console.log(Number(year))
    const moreCriterias =  String(item.title).match(search) && (Number(year) <= item.year || Number(year) == 0) && String(item.author).match(author) && (item.language == language || language == "");
    return moreCriterias;
  });  
  return filteredMovies;
};

function sortArr(arr, select){
  if(select == "a-z"){
    arr.sort((a, b) => {
      if (String(a.title) < String(b.title)) {
        return -1
      }
      if (String(a.title) > String(b.title)) {
        return 1
      }
      return 0
    })
  } else if(select == "z-a"){
    arr.sort((a, b) => {
      if (String(a.title) > String(b.title)) {
        return -1
      }
      if (String(a.title) < String(b.title)) {
        return 1
      }
      return 0
    })
  }
  if(select == "new-to-old"){
    arr.sort((a, b) => a.year - b.year)
  }
  else if(select == "old-to-new"){
    arr.sort((a, b) => b.year - a.year)
  }
  
  if(select == "page-from-little"){
    arr.sort((a, b)=> a.pages - b.pages)
  }
  else if(select == "page-from-alot"){
    arr.sort((a, b)=> b.pages - a.pages)
  }
}

function renderArr(arr, regex = ""){
  const elTemp = document.querySelector(".book-temp").content;
  for (const  book of arr) {
    
    const elCloneTemp = elTemp.cloneNode(true);

    book.language.split(" ").forEach(element => {
      if (!elLanguage.includes(element)) {
        elLanguage.push(element);
        const elOption = document.createElement("option");
        
        elOption.textContent = element
        
        elSelectLanguage.appendChild(elOption);
        
      }
    });
    
    elCloneTemp.querySelector(".book-img").src = book.imageLink;
    
    
    
    
    if(regex.source != "(?:)" && regex){
      // console.log(regex.source)
      elCloneTemp.querySelector(".book-title").innerHTML = book.title.replace(regex, `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`);
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
}

elForm.addEventListener("submit", evt =>{
  evt.preventDefault();
  
  elList.innerHTML = "";
  
  const elFormInputValue = elSearchInput.value.trim();
  const elSearchYearValue = elSearchYear.value.trim();
  const elSearchSortValue = elSearchSort.value.trim();
  const elSearchAuthorValue = elSelectAuthor.value.trim();
  const elSelectLanguageValue = elSelectLanguage.value.trim();
  
  const regexSearchText = new RegExp(elFormInputValue, "gi");
  const regexSearchAuthor = new RegExp(elSearchAuthorValue, "gi");
  
  
  const searchMovie = showSearchMovies(regexSearchText, elSearchYearValue, regexSearchAuthor, elSelectLanguageValue)
  console.log(searchMovie);
  if (searchMovie.length > 0){
    sortArr(searchMovie, elSearchSortValue)
    renderArr(searchMovie, regexSearchText);
  }else{
    elList.innerHTML = "Movie not found !!!";
  }
  
});

renderArr(books);