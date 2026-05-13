// Basic Functions
const nav = document.querySelector('.custom-nav');
const animatedNodes = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

document.getElementById("rights").innerText=new Date().getFullYear()

const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

function applyRevealAnimation() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  elements.forEach((node, idx) => {
    node.style.transitionDelay = `${Math.min(idx * 0.06, 0.35)}s`;
    revealObserver.observe(node);
  });
}



const pageName = document.body.getAttribute('data-page');
if (pageName) {
  const currentLink = document.querySelector(`.nav-link[data-page-link="${pageName}"]`);
  if (currentLink) {
    currentLink.classList.add('active');
  }
}

const navLinks = document.querySelectorAll('#mainNav .nav-link');
const navCollapseEl = document.getElementById('mainNav');
if (navCollapseEl && navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navCollapseEl.classList.contains('show') && window.bootstrap?.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        bsCollapse.hide();
      }
    });
  });
}



window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);



// Alert Box
function showAlert(msg) {
  document.getElementById("alertMessage").innerText =
    msg;

  document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

async function sendEnq() {
  var courses = document.querySelector("#courses")
  var Course = courses.options[courses.selectedIndex].text
  var Name = document.getElementById("Name").value
  var Email = document.getElementById("Email").value
  var Phone = document.getElementById("Phone").value

  if (Name == "" || Email == "" || Phone == "" || Course == "") {
    document.querySelector(".valid").style.display = "block"
  }
  else {
    document.querySelector(".valid").style.display = "none"
    var Entroll = { Name, Email, Phone, Course }
    const res = await fetch(window.ENV.API_URL + "/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Entroll)
      }
    )


    if (res.status == 200) {
      const mod = document.getElementById("enq")
      const modEl = bootstrap.Modal.getOrCreateInstance(mod)
      modEl.hide()
      showAlert("Thank you! Your enquiry has been submitted successfully")
      document.getElementById("Name").value = ""
      document.getElementById("Email").value = ""
      document.getElementById("Phone").value = ""
      courses.selectedIndex = 0
    }
    else {
      showAlert("Something went wrong. Please try again")
    }

  }




}

async function loadAllCourse() {
  const res = await fetch(window.ENV.API_URL + "/course/list")
  const data = await res.json()
  var str1 = `<option value="">Select Course Interest</option>`
  for (let cou of data) {
    str1 += `<option value =${cou.Title}>${cou.Title}</option>`
  }
  document.getElementById("courses").innerHTML = str1
  applyRevealAnimation()
}

// Footer Trending Courses Show
async function footerTrendingCourse() {
  const res = await fetch(window.ENV.API_URL + "/course")
  const data = await res.json()
  var str1 = ""
  var len = (data.length > 8) ? 8 : data.length;
  var count = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].Category == "Trending") {
      str1 += `<li><a href="/course.html?id=${data[i]._id}"><i class="bi bi-arrow-right-circle-fill"></i> ${data[i].Title}</a></li>`
      count++;
    }
    if (len == count) {
      break;
    }
  }
  document.querySelector("#footer_TrendingCourse").innerHTML = str1
  applyRevealAnimation()
}


footerTrendingCourse()
loadAllCourse()
applyRevealAnimation()

