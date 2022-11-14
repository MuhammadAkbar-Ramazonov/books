const elForm = document.querySelector(".site-form");
const elSearchInput = elForm.querySelector(".form-search-input");
const elSearchSort = elForm.querySelector(".site-select-sort");
const elSearchYear = elForm.querySelector(".form-search-year");
const elSelectAuthor = elForm.querySelector(".site-select-author");
const elSelectLanguage = elForm.querySelector(".site-select-language");
const elList = document.querySelector(".books-list");

// feragment
const newFragment = document.createDocumentFragment();

function showSearchMovies(search) {
  const filteredMovies = books.filter(item => {
    const moreCriterias =  String(item.title).match(search);
    return moreCriterias;
  });  
  return filteredMovies;
};

function sortArr(arr, select){
  if(select == "a-z"){
    arr.sort((a, b) => {
      if (String(a.title) > String(b.title)) {
        return -1
      }
      if (String(a.title) < String(b.title)) {
        return 1
      }
      return 0
    })
  } else if(select == "z-a"){
    arr.sort((a, b) => {
      if (String(a.title) < String(b.title)) {
        return -1
      }
      if (String(a.title) > String(b.title)) {
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
  for (const  book of arr) {
    
    const elTemp = document.querySelector(".book-temp").content;
    const elCloneTemp = elTemp.cloneNode(true);
    
    elCloneTemp.querySelector(".book-img").src = book.imageLink;
    
    if(regex.source != "(?:)" && regex){
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
  const elSearchSortValue = elSearchSort.value.trim();
  
  
  const regex = new RegExp(elFormInputValue, "gi");
  
  const searchMovie = showSearchMovies(regex)
  
  if (searchMovie.length > 0){
    sortArr(searchMovie, elSearchSortValue)
    renderArr(searchMovie, regex);
  }else{
    elList.innerHTML = "Movie not found !!!";
  }
});


const err = ["dfssd", "sdfsdf", "sadasd","asdad"]

err.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
});

renderArr(books);