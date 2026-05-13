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
          <img src="${tra.Photo}" class="trainer-img" alt="${tra.Name} Trainer At Future Tech Academy Tenkasi">

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



loadTrainer()
applyRevealAnimation()