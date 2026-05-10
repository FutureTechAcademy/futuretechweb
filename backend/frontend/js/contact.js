
async function sendEnq1() {
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