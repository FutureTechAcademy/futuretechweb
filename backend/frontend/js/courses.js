
let courses = [];
let slider;
let autoSlide;

document.addEventListener("DOMContentLoaded", async () => {
  slider = document.getElementById("courseSlider");

  try {
    const res = await fetch(window.ENV.API_URL + "/course");
    courses = await res.json();
    loadAllCourse();
    startAutoScroll();
  } catch (err) {
    console.error(err);
  }

  setupSearch(); // 🔥 FIX (safe)
});

/* LOAD COURSES */
function loadAllCourse() {
  let str1="", str2="", str3="", str4="", str5="", str6="", str7="", str8="";

  for (let course of courses) {

    const card = `
    <div class="course-card">
      <div class="card-img">
        <img src="${course.Image}" alt="${course.Title} at Future Tech Academy Tenkasi">
      </div>

      <div class="card-content">
        <h5 class="course-title">${course.Title}</h5>

        <span class="mt-auto">Duration: ${course.Duration}</span>

        <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2 w-100">View Details</a>
        <button class="btn btn-primary mt-2 w-100" data-bs-toggle="modal" data-bs-target="#enq">
          Enroll Now
        </button>
      </div>
    </div>`;

    if (course.Category === "Trending") str1 += `<div class="col-md-3">${card}</div>`;
    if (course.Category === "IT") str2 += `<div class="course-item">${card}</div>`;
    if (course.Category === "Design") str3 += `<div class="col-md-3">${card}</div>`;
    if (course.Category === "Commerce") str4 += `<div class="col-md-3">${card}</div>`;
    if (course.Category === "Electrical") str5 += `<div class="col-md-3">${card}</div>`;
    if (course.Category === "Mechanical") str6 += `<div class="col-md-3">${card}</div>`;
    if (course.Category === "Civil") str7 += `<div class="col-md-3">${card}</div>`;
    if (course.Category === "Others") str8 += `<div class="col-md-3">${card}</div>`;
  }

  document.querySelector("#trending").innerHTML = str1;
  document.querySelector("#courseSlider").innerHTML = str2;
  document.querySelector("#design").innerHTML = str3;
  document.querySelector("#commerce").innerHTML = str4;
  document.querySelector("#electrical").innerHTML = str5;
  document.querySelector("#mechanical").innerHTML = str6;
  document.querySelector("#civil").innerHTML = str7;
  document.querySelector("#other").innerHTML = str8;

  applyRevealAnimation();
}

/* SCROLL */
function scrollNext() {
  const card = slider?.querySelector(".course-item");
  if (!card) return;

  slider.scrollBy({ left: card.offsetWidth + 20, behavior: "smooth" });
}

function scrollPrev() {
  const card = slider?.querySelector(".course-item");
  if (!card) return;

  slider.scrollBy({ left: -(card.offsetWidth + 20), behavior: "smooth" });
}

/* AUTO SCROLL */
function startAutoScroll() {
  if (!slider) return;

  autoSlide = setInterval(() => {
    const card = slider.querySelector(".course-item");
    if (!card) return;

    const step = card.offsetWidth + 20;

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: step, behavior: "smooth" });
    }
  }, 2500);
}

/* PAUSE ON HOVER */
slider?.addEventListener("mouseenter", () => clearInterval(autoSlide));
slider?.addEventListener("mouseleave", startAutoScroll);

/* SEARCH */
function setupSearch() {
  const search = document.querySelector("#search");
  if (!search) return;

  search.addEventListener("input", () => {
    const value = search.value.toLowerCase().trim();

    if (!value) {
      document.querySelector("#searchResult").innerHTML = "";
      return;
    }

    let str = `<div class="row g-4">`;

    const filtered = courses.filter(c =>
      c.Title.toLowerCase().includes(value) ||
      c.Category.toLowerCase().includes(value)
    );

    for (let c of filtered) {
      str += `
      <div class="col-md-3">
        <div class="course-card">
          <div class="card-img">
            <img src="${c.Image}" alt="${c.Title} at Future Tech Academy Tenkasi">
          </div>
          <div class="card-content">
            <h5 class="course-title">${c.Title}</h5>
            <span>${c.Duration}</span>
             <a href="/course.html?id=${c._id}" class="btn btn-warning mt-2 w-100">View Details</a>
        <button class="btn btn-primary mt-2 w-100" data-bs-toggle="modal" data-bs-target="#enq">
          Enroll Now
        </button>
          </div>
        </div>
      </div>`;
    }

    str += `</div>`;
    document.querySelector("#searchResult").innerHTML = str;
  });
}




applyRevealAnimation();