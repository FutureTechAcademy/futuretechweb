//----------- Index Page Code ----------------

// Slide Code

async function loadSlide() {
  const res = await fetch(window.ENV.API_URL + "/slide")
  const data = await res.json()
  var str1 = ""
  var str2 = ""
  for (let i = 0; i < data.length; i++) {

    str1 += `<button type="button" data-bs-target="#homeSlider" data-bs-slide-to="${i}" class="${i == 0 ? "active" : ""}"></button>`
    str2 += `<div class="carousel-item ${i == 0 ? 'active' : ''}">
          <div class="slide-cover"
            style="background-image: url('${data[i].Image}');">
            <div class="container">
              <div class="slide-content">
              <h1>${data[i].Title}</h1>
             <p>${data[i].Description}</p>
                
                <div class="d-flex flex-wrap gap-2 mt-3">
                  <a href="courses.html" class="btn btn-brand">Explore Courses</a>
                  <a href="contact.html" class="btn btn-outline-brand">Book Free Demo</a>
                </div>
              </div>
            </div>
          </div>
        </div>`

  }
  document.querySelector(".carousel-indicators").innerHTML = str1
  document.querySelector(".carousel-inner").innerHTML = str2
}

// Trending Courses Show
async function trendingCourse() {
  const res = await fetch(window.ENV.API_URL + "/course")
  const data = await res.json()

  var str = ""
  var str1 = ""
  var len = (data.length > 8) ? 8 : data.length;

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].Category)
    if (data[i].Category == "Trending") {

      str += `<div class="col-md-6 col-lg-3 reveal-up">
          <div class="info-card card">
             <img src="${data[i].Image}" alt="${data[i].Title}" class="card-img-top card-img-fixed" >
            <div class="card-body">
              <p style="font-size:0.8rem;" >${data[i].Category}</p>
              <h5 class="card-title" style="height:50px;">${data[i].Title}</h5>
              <p class="card-text">
                In-centre|Online|Hybrid<br>
                <span style="color:var( --brand-blue);font-weight:bold;">${data[i].Duration}</span>|Full / Part time<br>
                Placements support</p>
                <a class="btn btn-brand" href="/course.html?id=${data[i]._id}" >View Details</a>
            </div>
          </div>
        </div>`
      str1 += `<li><a href="/course.html?id=${data[i]._id}"><i class="bi bi-arrow-right-circle-fill"></i> ${data[i].Title}</a></li>`
    }
    if (len == i + 1) {
      break;
    }
  }

  document.querySelector("#trendingCourseDiv").innerHTML = str
  document.querySelector("#footer_TrendingCourse").innerHTML = str1
  applyRevealAnimation()
}


//colors
const avatarColors = [
  "#FF6B6B", // Red Coral
  "#4ECDC4", // Teal
  "#1A73E8", // Blue
  "#F7B801", // Yellow
  "#6A4C93", // Purple
  "#FF9F1C", // Orange
  "#2EC4B6", // Aqua Green
  "#E71D36", // Dark Red
  "#3A86FF", // Bright Blue
  "#8338EC"  // Violet
];

// Review Box
function loadReview() {

  fetch("/data/review.json")
    .then((res) => res.json())
    .then((data) => {
      str = `<div class="reviewContainer">`

      for (let dt of data) {
        const index = Math.floor(Math.random() * avatarColors.length);
        star = ``
        for (let i = 1; i <= dt.rating; i++) {
          star += `⭐`
        }
        str += `
         <div class="review">
          <h2 style="background-color:${avatarColors[index]};">${dt.name[0]}</h2>
          <h4 style="color: var(--brand-blue);">${dt.name}</h4>
          <span>${star}</span>
          <p>${dt.comment}</p>
          <a href="https://share.google/1u5xuyQmlJaNB4cPP" target="_blank"> <img src="/images/google.png" width="20">
            View on Google</a>
        </div>`
      }
      str += `</div>`
      str += str
      document.getElementById("reviewBox").innerHTML = str
      for (k of document.querySelectorAll(".reviewContainer")) { k.style.animation = `reviewAni ${data.length * 10}s infinite linear 3s` }

    })
}


loadSlide()
trendingCourse()
loadReview()
applyRevealAnimation()