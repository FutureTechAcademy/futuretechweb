

async function loadTrainer() {
    const res = await fetch(window.ENV.API_URL + "/trainer")
    const data = await res.json()

    var str1 = ""

    for (let tra of data) {
        var sk = ""
        for (let skill of tra.Skills) {
            sk += `<span class="skill-badge">${skill}</span>`
        }
     

        str1 += `<div class="col-md-4 reveal-up">
             <div class="trainer-card ">

          <!-- Photo -->
          <img src="${tra.Photo}" class="trainer-img" alt="Trainer">

          <div class="trainer-body">

            <!-- Name -->
            <div class="trainer-name">${tra.Name}</div>

            <!-- Role -->
            <div class="trainer-role">${tra.Role}</div>

            <!-- Skills -->
            <div class="skills">
    ${sk}
            </div>

            <!-- Experience -->
            <div class="experience">
    ${tra.Experience}+ Years Experience
            </div>

          </div>

        </div>
        </div>`


    }
    document.querySelector("#traBox").innerHTML=str1
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
loadTrainer()
applyRevealAnimation()