
let courses = []
document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(window.ENV.API_URL + "/course")
  courses = await res.json()
  loadAllCourse()
});


async function loadAllCourse() {
  // const res = await fetch(window.ENV.API_URL + "/course")
  // const courses = await res.json()
  str1 = "", str2 = "", str3 = "", str4 = "", str5 = "", str6 = "", str7 = "", str8 = ""
  for (let course of courses) {
    if (course.Category == "Trending") {
      str1 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);"  data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}


    if (course.Category == "IT") {
      str2 += `
      <div class="course-item reveal-up">
        <div class="course-card">
          <img src="${course.Image}" class="img-fluid">
          <div class="card-content">
            <h5 style="height:60px;">${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2 w-100">View Details</a>
            <button class="btn btn-primary mt-2 w-100" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll Now</button>
          </div>
        </div>
      </div>
            `}

    if (course.Category == "Design") {
      str3 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}


    if (course.Category == "Commerce") {
      str4 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}


    if (course.Category == "Electrical") {
      str5 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}


    if (course.Category == "Mechanical") {
      str6 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}


    if (course.Category == "Civil") {
      str7 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}


    if (course.Category == "Others") {
      str8 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`}



  }
  document.querySelector("#trending").innerHTML = str1
  document.querySelector("#courseSlider").innerHTML = str2
  document.querySelector("#design").innerHTML = str3
  document.querySelector("#commerce").innerHTML = str4
  document.querySelector("#electrical").innerHTML = str5
  document.querySelector("#mechanical").innerHTML = str6
  document.querySelector("#civil").innerHTML = str7
  document.querySelector("#other").innerHTML = str8
  applyRevealAnimation()
}



const slider = document.getElementById("courseSlider");


function scrollNext() {
  const card = slider.querySelector(".course-item");
  const cardWidth = card.offsetWidth + 20; // 20 = gap

  slider.scrollBy({
    left: cardWidth,
    behavior: "smooth"
  });
}

function scrollPrev() {
  const card = slider.querySelector(".course-item");
  const cardWidth = card.offsetWidth + 20;

  slider.scrollBy({
    left: -cardWidth,
    behavior: "smooth"
  });
}


document.querySelector("#search")
  .addEventListener("input", () => {

    const value = document.querySelector("#search").value.toLowerCase();
    if(value && value.trim() !== ""){
    const filteredCourses = courses.filter(course =>
      course.Title.toLowerCase().includes(value) ||
      course.Category.toLowerCase().includes(value)
    );
    str1 = `<div class="row g-4 reveal-up">`
    
    for (let course of filteredCourses) {
      str1 += ` 
      <div class="col-md-3 reveal-up">
        <div class="course-card">
          <div class="card-img">
            <img src="${course.Image}" class="img-fluid">
          </div>
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>Duration: ${course.Duration}</span>
            <br>
            <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2" style="width:100%;background-color:var(--brand-yellow);">View
              Details</a>
            <button class="btn btn-primary mt-2"
              style="width:100%;background-color:var(--brand-blue);" data-bs-toggle="modal"
    data-bs-target="#enq">Enroll
              Now</button>
          </div>
        </div>
      </div>`
    }

    str1+=`</div>`
    document.querySelector("#searchResult").innerHTML = str1
    applyRevealAnimation()}
    else{
      document.querySelector("#searchResult").innerHTML = ""
      applyRevealAnimation()
    }
    
  });




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
applyRevealAnimation()
