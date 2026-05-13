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
            <img src="${pro.Image}" class="project-image" alt="${pro.Title} for College Students at Future Tech Academy" />
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



loadProjects()
applyRevealAnimation()