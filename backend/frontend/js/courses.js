let courses = [];
let slider; // define globally

document.addEventListener("DOMContentLoaded", async () => {
  slider = document.getElementById("courseSlider"); // FIX

  try {
    const res = await fetch(window.ENV.API_URL + "/course");
    courses = await res.json();
    loadAllCourse();
    startAutoScroll(); // 🔥 AUTO SCROLL START
  } catch (err) {
    console.error("Error loading courses:", err);
  }
});

async function loadAllCourse() {
  let str1 = "", str2 = "", str3 = "", str4 = "", str5 = "", str6 = "", str7 = "", str8 = "";

  for (let course of courses) {

    const card = `
      <div class="course-card">
        <div class="card-img">
          <img src="${course.Image}" class="img-fluid">
        </div>
        <div class="card-content">
          <h5 style="height:60px;" >${course.Title}</h5>
          <span>Duration: ${course.Duration}</span>
          <br>
          <a href="/course.html?id=${course._id}" class="btn btn-warning mt-2 w-100">View Details</a>
          <button class="btn btn-primary mt-2 w-100" data-bs-toggle="modal" data-bs-target="#enq">Enroll Now</button>
        </div>
      </div>`;

    if (course.Category === "Trending") {
      str1 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }

    if (course.Category === "IT") {
      str2 += `<div class="course-item reveal-up">${card}</div>`;
    }

    if (course.Category === "Design") {
      str3 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }

    if (course.Category === "Commerce") {
      str4 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }

    if (course.Category === "Electrical") {
      str5 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }

    if (course.Category === "Mechanical") {
      str6 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }

    if (course.Category === "Civil") {
      str7 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }

    if (course.Category === "Others") {
      str8 += `<div class="col-md-3 reveal-up">${card}</div>`;
    }
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



function scrollNext() {
  if (!slider) return;

  const card = slider.querySelector(".course-item");
  if (!card) return;

  const cardWidth = card.offsetWidth + 20;

  slider.scrollBy({
    left: cardWidth,
    behavior: "smooth"
  });
}

function scrollPrev() {
  if (!slider) return;

  const card = slider.querySelector(".course-item");
  if (!card) return;

  const cardWidth = card.offsetWidth + 20;

  slider.scrollBy({
    left: -cardWidth,
    behavior: "smooth"
  });
}



let autoSlide;

function startAutoScroll() {
  if (!slider) return;

  autoSlide = setInterval(() => {
    const card = slider.querySelector(".course-item");
    if (!card) return;

    const cardWidth = card.offsetWidth + 20;

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, 2500); // speed
}

// Pause on hover
document.addEventListener("mouseover", (e) => {
  if (e.target.closest("#courseSlider")) {
    clearInterval(autoSlide);
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest("#courseSlider")) {
    startAutoScroll();
  }
});


document.querySelector("#search").addEventListener("input", () => {
  const value = document.querySelector("#search").value.toLowerCase().trim();

  if (value !== "") {
    let str = `<div class="row g-4">`;

    const filtered = courses.filter(course =>
      course.Title.toLowerCase().includes(value) ||
      course.Category.toLowerCase().includes(value)
    );

    for (let course of filtered) {
      str += `
      <div class="col-md-3">
        <div class="course-card">
          <img src="${course.Image}" class="img-fluid">
          <div class="card-content">
            <h5>${course.Title}</h5>
            <span>${course.Duration}</span>
          </div>
        </div>
      </div>`;
    }

    str += `</div>`;
    document.querySelector("#searchResult").innerHTML = str;
  } else {
    document.querySelector("#searchResult").innerHTML = "";
  }
});



async function trendingCourse() {
  try {
    const res = await fetch(window.ENV.API_URL + "/course");
    const data = await res.json();

    let str = "";

    data
      .filter(c => c.Category === "Trending")
      .slice(0, 8)
      .forEach(c => {
        str += `<li><a href="/course.html?id=${c._id}">${c.Title}</a></li>`;
      });

    document.querySelector("#footer_TrendingCourse").innerHTML = str;

  } catch (err) {
    console.error(err);
  }
}

trendingCourse();
applyRevealAnimation();