//----------- Course Page Code ----------------

async function loadCourse() {
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  const res = await fetch(window.ENV.API_URL + `/course/${id}`)
  const data = await res.json()

  document.querySelector("#title").innerText = data.Title
  document.querySelector("#subTitle").innerText = "Learn industry-relevant skills with the latest tools and technologies."
  document.querySelector("#course").innerText = data.Title
  document.querySelector("#category").innerText = data.Category + " Course"
  
  document.querySelector("#duration").innerText=data.Duration

  let parts = data.Description.split(". ");

  let para1 = parts[0] + ".";
  let para2 = parts.slice(1).join(". ");

  document.querySelector("#paragraph").innerHTML = `<p>${para1}</p>
  <p>${para2}</p>`

  document.querySelector("#courseImg").src=`${data.Image}`
  tools=""
  for(let tech of data.Technologies)
  {
     tools+=`
      <div class="col-md-6 col-lg-4 reveal-up">
          <div class="info-card card">
            <div class="card-body">
              <h5 class="card-title"><div class="icon-badge"><i class="bi bi-pc-display-horizontal"></i></div> ${tech}</h5>
            </div>
          </div>
      </div>`
  }
  
  document.querySelector("#tools").innerHTML=tools
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



loadCourse()
trendingCourse()
applyRevealAnimation()


