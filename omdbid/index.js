// penggunaan ajax

// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=5b1d8303&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movies-container").html(cards);

//       $(".movie-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=5b1d8303&i=" +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = cardDetail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// function showCards(m) {
//   return `<div class="col-md-3 my-3">
//             <div class="card">
//               <img src="${m.Poster}" class="card-img-top" />
//               <div class="card-body">
//                 <h5 class="card-title">${m.Title}</h5>
//                 <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
//                 <a href="#" class="btn btn-primary movie-detail-button" data-bs-toggle="modal"
//                 data-bs-target="#movieDetail" data-imdbid=${m.imdbID} >Show details</a>
//               </div>
//             </div>
//           </div>`;
// }

// function cardDetail(m) {
//   return `<div class="container-fluid">
//               <div class="row">
//                   <div class="col-md-3">
//                     <img src="${m.Poster}" class="img-fluid" />
//                   </div>
//                   <div class="col-md">
//                     <ul class="list-group">
//                       <li class="list-group-item"><strong>${m.Title}</strong></li>
//                       <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
//                       <li class="list-group-item"><strong>writers : </strong>${m.Writer}</li>
//                       <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
//                       <li class="list-group-item">
//                         <strong>Plot : </strong><br  />${m.Plot}
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>`;
// }

// akhir ajax

// promise
// let lagi = false;

// const film = new Promise((resolve, reject) => {
//   if (lagi) {
//     setTimeout(() => {
//       resolve([
//         {
//           nama: "batman",
//           genre: "action",
//           rating: 3,
//         },
//       ]);
//     }, 3000);
//   } else {
//     setTimeout(() => {
//       reject([
//         {
//           salah: "ulang lagi",
//         },
//       ]);
//     }, 3000);
//   }
// });

// const cuaca = new Promise((resolve, reject) => {
//   if (lagi) {
//     setTimeout(() => {
//       resolve([
//         {
//           kondisi: "hujan",
//           kota: "garut",
//           suhu: 19,
//         },
//       ]);
//     }, 3000);
//   } else {
//     setTimeout(() => {
//       reject([
//         {
//           gagal: "coba lagi",
//         },
//       ]);
//     }, 3000);
//   }
// });

// const data = Promise.all([film, cuaca])
//   .then((ress) => {
//     const [film, cuaca] = ress;
//     console.log(film[0]);
//     console.log(cuaca);
//   })
//   .catch((ress) => {
//     const [film, cuaca] = ress;
//     console.log(film[0]);
//     console.log(cuaca);
//   });

// akhir promise

// fetch

// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");

//   fetch("http://www.omdbapi.com/?apikey=5b1d8303&s=" + inputKeyword.value)
//     .then((ress) => ress.json())
//     .then((ress) => {
//       const movies = ress.Search;
//       let cards = " ";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movies-container");
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail klik
//       const modalDetailButton = document.querySelectorAll(
//         ".movie-detail-button"
//       );
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=5b1d8303&i=" + imdbid)
//             .then((ress) => ress.json())
//             .then((m) => {
//               const movieDetail = cardDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });
// akhir fetch

// fetch async await
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=5b1d8303&s=" + keyword)
    .then((ress) => ress.json())
    .then((ress) => ress.Search); // hati hati di bagian sini harus benar
}

function updateUI(movies) {
  let cards = " ";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movies-container");
  movieContainer.innerHTML = cards;
}

// event binding

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("movie-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetails(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetails(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=5b1d8303&i=" + imdbid)
    .then((ress) => ress.json())
    .then((ress) => ress); // hati hati di bagian sini harus benar
}

function updateUIDetail(m) {
  const movieDetail = cardDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

// method
function showCards(m) {
  return `<div class="col-md-3 my-3">
            <div class="card">
              <img src="${m.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                <a href="#" class="btn btn-primary movie-detail-button" data-bs-toggle="modal"
                data-bs-target="#movieDetail" data-imdbid=${m.imdbID} >Show details</a>
              </div>
            </div>
          </div>`;
}

function cardDetail(m) {
  return `<div class="container-fluid">
              <div class="row">
                  <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid" />
                  </div>
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><strong>${m.Title}</strong></li>
                      <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                      <li class="list-group-item"><strong>writers : </strong>${m.Writer}</li>
                      <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                      <li class="list-group-item">
                        <strong>Plot : </strong><br  />${m.Plot}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>`;
}

// akhirfetch async await
