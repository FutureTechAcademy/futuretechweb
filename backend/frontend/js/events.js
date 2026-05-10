// Load Events
async function loadEvents() {
    const res = await fetch(window.ENV.API_URL + "/post")
    const data = await res.json()
    var str1 = ""
    for (let evt of data) {
        str1 += `
        <div class="col-md-6 col-lg-4 reveal-up">
          <div class="blog-card card">
            <img src="${evt.Image}"
              class="blog-image" alt="blog1" />
            <div class="card-body">
              <h5 class="bg-brand p-2">${evt.Title}</h5>
              <p class="card-text">${evt.Description}</p>
            </div>
          </div>
        </div>`
    }

    document.querySelector("#evtBox").innerHTML = str1
    applyRevealAnimation()
}


// Trending Courses Show
async function trendingCourse() {
  const res = await fetch(window.ENV.API_URL + "/course")
  const data = await res.json()
  var str1 = ""
  var len = (data.length > 8) ? 8 : data.length;

  for (let i = 0; i < len; i++) {
    if (data[i].Category == "Trending") {
      str1 += `<li><a href="/course.html?id=${data[i]._id}"><i class="bi bi-arrow-right-circle-fill"></i> ${data[i].Title}</a></li>`
    }
  }
  document.querySelector("#footer_TrendingCourse").innerHTML = str1
  applyRevealAnimation()
}

trendingCourse()
loadEvents()
applyRevealAnimation()