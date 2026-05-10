// Load Events
async function loadProjects() {
    const res = await fetch(window.ENV.API_URL + "/project")
    const data = await res.json()
    var str1 = ""
    for (let pro of data) {
         var tk = ""
        for (let tks of pro.Technologies) {
            tk += `<span class="tk-badge">${tks}</span>`
        }
      
     
        str1 += `
          <div class="col-md-6 col-lg-4 reveal-up">
          <div class="project-card card">
            <img src="${pro.Image}" class="project-image" alt="project1" />
            <div class="card-body">
              <h5 class="card-title">${pro.Title}</h5>
              <p class="card-text">${pro.Description}</p>
              <p>${tk}</p>
              <div class="mt-3"><a class="btn btn-brand btn-sm" style="width: 100%;" href="project-details.html?id=1" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll Now</a></div>
            </div>
          </div>
        </div>`
    }

    document.querySelector("#proBox").innerHTML = str1
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
loadProjects()
applyRevealAnimation()