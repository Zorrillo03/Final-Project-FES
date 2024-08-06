// https://www.omdbapi.com/?i=tt3896198&apikey=c21baa5d&s=
// http://www.omdbapi.com/?apikey=[yourkey]&

const searchInput = document.querySelector("[movie-search]");
const movieListEl = document.querySelector(".movie-list");
const movieListEl2 = document.querySelector(".movie-list2");
const movieListEl3 = document.querySelector(".movie-list3");
const searchResults = document.querySelector(".search-results");
const getRidOfMovies = document.querySelector(".movies");
const showSearchResults = document.querySelector(".movie__list");
const showSearchBarBG = document.querySelector(".search-bar__bg")
const showSearchBar = document.querySelector(".show__search-bar")
const showMenu = document.querySelector(".nav__menu--bg")


// Because I couldn't figure out how to have full access to all the movies at once
// this main home screen will just look really messy with all the html having to show
// multiple fetch functions for each s="" result.

// Function showing the movies on the starting screen
async function main() {
  let movies = await fetch(`https://www.omdbapi.com/?apikey=c21baa5d&s=fast`);
  let movies2 = await fetch(`https://www.omdbapi.com/?apikey=c21baa5d&s=work`);
  let movies3 = await fetch(`https://www.omdbapi.com/?apikey=c21baa5d&s=batman`);

  const moviesData = await movies.json();
  const moviesData2 = await movies2.json();
  const moviesData3 = await movies3.json();

  const moviesSearch = moviesData.Search;
  const moviesSearch2 = moviesData2.Search;
  const moviesSearch3 = moviesData3.Search;

  const movieListEl = document.querySelector(".movie__list");
  const movieListEl2 = document.querySelector(".movie__list2");
  const movieListEl3 = document.querySelector(".movie__list3");

  movieListEl.innerHTML = moviesSearch
    .map((movie) => movieHTML(movie))
    .slice(0, 6)
    .join("");
  movieListEl2.innerHTML = moviesSearch2
    .map((movie) => movieHTML(movie))
    .slice(0, 6)
    .join("");
  movieListEl3.innerHTML = moviesSearch3
    .map((movie) => movieHTML(movie))
    .slice(0, 6)
    .join("");
}
main();

// Search results function
function userInput() {
  searchInput.addEventListener("keypress", (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);

    if (e.key === "Enter") {
      getRidOfMovies.classList.remove("main__show-movies");
      showSearchResults.classList.remove("search__results") 
      const loading = document.querySelector(".fa-spinner");
      loading.classList += " movie__loading--visible";

      setTimeout(async function searchMovies() {
        let movies = await fetch(
          `https://www.omdbapi.com/?apikey=c21baa5d&s=${inputValue}`
        );
        const moviesData = await movies.json();
        const moviesSearch = moviesData.Search;

        const movieListEl = document.querySelector(".movie__list");

        movieListEl.innerHTML = moviesSearch
          .map((movie) => movieHTML(movie))
          .slice(0, 6)
          .join("");

        loading.classList.remove("movie__loading--visible");

        searchResults.innerHTML = `Search Results For " ${inputValue} "`;

        showSearchResults.classList += " search__results";
        getRidOfMovies.classList += " remove"; 
      }, 1000);
    }
  });
}
userInput();

// This helps is the function that gets mapped over by the api information
function movieHTML(movie) {
  return `<div class="movie__template">
      <div class="movie__template--container">
        <img
            class="movie__poster"
          src="${movie.Poster}"
          alt=""
        />
        <h4 class="movie__titleYear">${movie.Title} (${movie.Year})</h4>
        <div class="movie__template--bg">
          <h3 class="movie__title--bg">${movie.Title}</h3>
          <p class="movie__plot">short description of movie</p>
      </div>
    </div>
  </div>`;
}

// function that refreshes the page because that is the easiest way to clear the search result/ get back on main site

function refreshPage() {
  window.location.reload("http://127.0.0.1:5500/index.html");
}


function searchBarVisible() {

  if (showSearchBarBG.style.display === "none") {
    showSearchBarBG.style.display = "flex";
  }
  else {
    showSearchBarBG.style.display = "none"
  }

  searchInput.addEventListener("keypress", (e) => {
    let inputValue = e.target.value;
    if (e.key === "Enter")
      showSearchBarBG.style.display = "none"
    getRidOfMovies.classList.remove("main__show-movies");
  }
  )
  showMenu.classList.remove("menu--open")
      
}

function openMenu() {
  showMenu.classList += " menu--open"
}

function closeMenu() {
  showMenu.classList.remove("menu--open")
}