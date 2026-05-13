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
                <img src="${pro.Image}" class="card-img-top course-img" alt="${pro.Title} Internship for college students at future tech academy tenkasi">

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


loadInternship()
applyRevealAnimation()