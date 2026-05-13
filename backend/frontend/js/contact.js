
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



applyRevealAnimation()