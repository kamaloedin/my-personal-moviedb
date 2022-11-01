// Jquery
// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=286c3877&s=" + $(".search-input").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((mov) => {
//         cards += showCards(mov);
//       });
//       $(".mov-container").html(cards);
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=286c3877&i=" + $(this).data("imdbid"),
//           success: (mov) => {
//             const movDetail = showDetail(mov);
//             $(".modal-body").html(movDetail);
//             $(".modal-title").html(mov.ti);
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

// fetch ori
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const searchInput = document.querySelector(".search-input");
//   fetch("http://www.omdbapi.com/?apikey=286c3877&s=" + searchInput.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const mov = response.Search;
//       let cards = "";
//       mov.forEach((m) => (cards += showCards(m)));
//       const movContainer = document.querySelector(".mov-container");
//       movContainer.innerHTML = cards;
//       const modalDetailButton = document.querySelectorAll(".modal-detail-button");
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=286c3877&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movDetail = showDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movDetail;
//             });
//         });
//       });
//     });
// });

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const searchInput = document.querySelector(".search-input");
    const movies = await getMovies(searchInput.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

document.addEventListener("click", async function (e) {
  try {
    if (e.target.classList.contains("modal-detail-button")) {
      const imdbid = e.target.dataset.imdbid;
      const movDetail = await getMovieDetail(imdbid);
      updateUIDetail(movDetail);
    }
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=286c3877&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(mov) {
  let cards = "";
  mov.forEach((m) => (cards += showCards(m)));
  const movContainer = document.querySelector(".mov-container");
  movContainer.innerHTML = cards;
}

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=286c3877&i=" + imdbid)
    .then((response) => {
      if (!response.ok) {
        throw new Error(error.statusText);
      }
      return response.json();
    })
    .then((m) => m);
}

function updateUIDetail(m) {
  const movDetail = showDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movDetail;
}

function showCards(mov) {
  return `<div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${mov.Poster}" class="card-img-top" alt="" />
                        <div class="card-body">
                            <h5 class="card-title">${mov.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${mov.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movDetailModal" data-imdbid="${mov.imdbID}">Show Details</a>
                        </div>
                    </div>
                </div>`;
}

function showDetail(mov) {
  return `<div class="container-fluid">
  <div class="row">
      <div class="col-md-3">
          <img src="${mov.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"><h4>${mov.Title}</h4></li>
              <li class="list-group-item"><strong>Director: </strong>${mov.Director}</li>
              <li class="list-group-item"><strong>Actor: </strong>${mov.Actors}</li>
              <li class="list-group-item"><strong>Writer: </strong>${mov.Writer}</li>
              <li class="list-group-item"><strong>Plot: </strong>${mov.Plot}</li>
          </ul>
      </div>
  </div>
</div>`;
}
