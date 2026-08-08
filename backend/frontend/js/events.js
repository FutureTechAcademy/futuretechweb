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
              class="blog-image" alt="${evt.Title} At Future Tech Academy Tenkasi" />
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


loadEvents()
applyRevealAnimation()