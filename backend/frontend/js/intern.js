// Load Events
async function loadInternship() {
    const res = await fetch(window.ENV.API_URL + "/internship")
    const data = await res.json()
    
    var str1 = ""
    for (let pro of data) {
        var tk = ""
        for (let tks of pro.Technologies) {
            tk += ` <span class="tech-badge">${tks}</span>`
        }
   

        str1 += `
            <div class="col-md-3 reveal-up">
            <div class="card course-card">

                <!-- Image -->
                <img src="${pro.Image}" class="card-img-top course-img" alt="Java Course">

                <div class="card-body">

                    <!-- Title -->
                    <h5 class="course-title">${pro.Title}</h5>

                    <!-- Description -->
                    <p class="course-desc">
                       ${pro.Description}
                    </p>

                    <!-- Technologies -->
                    <div class="mb-3">
                      ${tk}
                    </div>

                    <!-- Duration -->
                    <p class="duration">⏱ Duration: ${pro.Duration}</p>

                    <!-- Button -->
                    <div class="d-grid">
                        <button class="btn btn-brand" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll Now</button>
                    </div>

                </div>

            </div>
        </div>  
        
        `
    }

  
    document.querySelector("#intern").innerHTML = str1
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
loadInternship()
applyRevealAnimation()