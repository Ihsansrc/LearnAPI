const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");

  fetch("http://www.omdbapi.com/?apikey=5b1d8303&s=" + inputKeyword.value)
    .then((ress) => ress.json())
    .then((ress) => {
      const movies = ress.Search;
      let cards = " ";
      movies.forEach((m) => (cards += showCards(m)));
      const movieContainer = document.querySelector(".movies-container");
      movieContainer.innerHTML = cards;

      // ketika tombol detail klik
      const modalDetailButton = document.querySelectorAll(
        ".movie-detail-button"
      );
      modalDetailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=5b1d8303&i=" + imdbid)
            .then((ress) => ress.json())
            .then((m) => {
              const movieDetail = cardDetail(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});
