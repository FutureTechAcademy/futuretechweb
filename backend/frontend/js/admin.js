const API = window.ENV.API_URL


// Loading Enquiry Data
function loadEnq() {
    const tab_en = document.getElementById("tab_en")
    fetch(API + "/user",
        {
            method: "GET",
            headers: { authorization: localStorage.getItem("token") }
        }
    )
        .then((res) => res.json())
        .then((data) => {

            if (data.message == "Token required") {
                window.location.href = "login.html"
            }
            else {
                let si = 1
                let rows = ``

                for (dt of data) {
                    rows += ` 
                <tr>
                        <td>${si++}</td>
                        <td>${dt.Name}</td>
                        <td>${dt.Email}</td>
                        <td>${dt.Phone}</td>
                        <td>${dt.Course}</td>
                        <td><a  href="tel:${dt.Phone}" class="btn btn-success">Call</a></td>
                </tr>`

                }
                console.log(rows)
                tab_en.innerHTML = rows
            }

        })
        .catch((err) => {
            if (err) window.location.href = "login.html"
        })

}


//Remove All Enquiry
function rm_Enq() {
    let check = confirm("Are you sure you want to remove all enquiries?")
    if (check) {
        fetch(API + "/user",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadEnq() })

    }

}



// Loading Courses Data

function loadCourse() {
    const tab_co = document.getElementById("tab_co")
    fetch(API + "/course").then((res) => res.json())
        .then((data) => {
            let si = 1
            let rows = ``
            for (dt of data) {
                let technologies = dt.Technologies.map((tech) => `<span class="badge bg-secondary">${tech}</span>`).join(" ")
                rows += ` <tr>
                    <td>${si++}</td>
                    <td>
                        <img src="${dt.Image}" class="img-fluid rounded" width="80">
                    </td>
                    <td>${dt.Title}</td>
                    <td><span class="badge bg-primary">${dt.Category}</span></td>
                    <td>
                        ${technologies}
                    </td>
                    <td>${dt.Duration}</td>
                    <td><a onClick="delCourse('${dt._id}')" class="btn btn-danger">Delete</a></td>
                </tr>
`
            }
            tab_co.innerHTML = rows
        })
}

//Remove Single Course 
function delCourse(id) {
    let check = confirm("Are you sure you want to remove course?")
    if (check) {
        fetch(API + `/course/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(() => { loadCourse() })

    }

}

// Remove All Course
function rm_Cou() {
    let check = confirm("Are you sure you want to remove all courses?")
    if (check) {
        fetch(API + "/course",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadCourse() })

    }

}

// Logout 
function logout() {
    let check = confirm("Are you sure you want to logout?")
    if (check) {
        localStorage.removeItem("token")
        window.location.href = "login.html"
    }

}

// Load trainer
function loadTra() {
    const tab_tra = document.getElementById("tab_tra")
    fetch(API + "/trainer").then((res) => res.json())
        .then((data) => {
            console.log(data)
            let si = 1
            let rows = ``
            for (dt of data) {
                let skills = dt.Skills.map((skill) => `<span class="badge bg-secondary">${skill}</span>`).join(" ")
                rows += ` <tr>
                    <td>${si++}</td>
                    <td><span class="badge bg-primary">${dt.Name}</span></td>
                    <td>
                        ${dt.Role}
                    </td>
                    <td>${skills}</td>
                    <td>${dt.Experience}</td>
                    <td>
                        <img src="${dt.Photo}" class="img-fluid rounded" width="60" >
                    </td>
                    <td><a onClick="delTrainer('${dt._id}')" class="btn btn-danger">Delete</a></td>
                </tr>
`
            }
            tab_tra.innerHTML = rows
        })
}

// Delete Single Trainer
function delTrainer(id) {
    let check = confirm("Are you sure you want to remove trainer?")
    if (check) {
        fetch(API + `/trainer/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(() => { loadTra() })

    }

}


// Remove All Trainer
function rm_Tra() {
    let check = confirm("Are you sure you want to remove all trainer?")
    if (check) {
        fetch(API + "/trainer",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadTra() })

    }

}


// Load Project

function loadPro() {
    const tab_pro = document.getElementById("tab_pro")
    fetch(API + "/project").then((res) => res.json())
        .then((data) => {
            console.log(data)
            let si = 1
            let rows = ``
            for (dt of data) {
                let technologies = dt.Technologies.map((tech) => `<span class="badge bg-secondary">${tech}</span>`).join(" ")
                rows += ` <tr>
                    <td>${si++}</td>
                    <td><span class="badge bg-primary">${dt.Title}</span></td>
                    <td>
                        ${technologies}
                    </td>
                    <td>
                        <img src="${dt.Image}" class="img-fluid rounded" width="60" >
                    </td>
                    <td><a onClick="delProject('${dt._id}')" class="btn btn-danger">Delete</a></td>
                </tr>
`
            }
            tab_pro.innerHTML = rows
        })
}

// Delete Single Project
function delProject(id) {
    let check = confirm("Are you sure you want to remove project?")
    if (check) {
        fetch(API + `/project/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(() => { loadPro() })
    }
}

// Remove All Project

function rm_Pro() {
    let check = confirm("Are you sure you want to remove all project?")
    if (check) {
        fetch(API + "/project",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadPro() })

    }

}


// Load Post

function loadPost() {
    const tab_post = document.getElementById("tab_post")
    fetch(API + "/post").then((res) => res.json())
        .then((data) => {
            console.log(data)
            let si = 1
            let rows = ``
            for (dt of data) {
                rows += ` <tr>
                    <td>${si++}</td>
                      <td>${dt.createdAt.split("T")[0]}</td>
                    <td><span class="badge bg-primary">${dt.Title}</span></td>
                    <td>
                        ${dt.Description}
                    </td>
                    <td>
                        <img src="${dt.Image}" class="img-fluid rounded" width="60" >
                    </td>
                    <td><a onClick="delPost('${dt._id}')" class="btn btn-danger">Delete</a></td>
                </tr>
`
            }
            tab_post.innerHTML = rows
        })
}


// Delete Single Post
function delPost(id) {
    let check = confirm("Are you sure you want to remove post?")
    if (check) {
        fetch(API + `/post/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(() => { loadPost() })
    }
}

// Remove All Post

function rm_Post() {
    let check = confirm("Are you sure you want to remove all post?")
    if (check) {
        fetch(API + "/post",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadPost() })

    }

}



// Load Slide

function loadSlide() {
    const tab_slide = document.getElementById("tab_slide")
    fetch(API + "/slide").then((res) => res.json())
        .then((data) => {
            console.log(data)
            let si = 1
            let rows = ``
            for (dt of data) {
                rows += ` <tr>
                    <td>${si++}</td>
                    <td><span class="badge bg-primary">${dt.Title}</span></td>
                    <td>
                        ${dt.Description}
                    </td>
                    <td>
                        <img src="${dt.Image}" class="img-fluid rounded" width="60" >
                    </td>
                    <td><a onClick="delSlide('${dt._id}')" class="btn btn-danger">Delete</a></td>
                </tr>
`
            }
            tab_slide.innerHTML = rows
        })
}



// Delete Single Slide
function delSlide(id) {
    let check = confirm("Are you sure you want to remove slide?")
    if (check) {
        fetch(API + `/slide/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(() => { loadSlide() })
    }
}



// Remove All Slide

function rm_Slide() {
    let check = confirm("Are you sure you want to remove all slide?")
    if (check) {
        fetch(API + "/slide",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadSlide() })
    }

}




// Load Intern

function loadIntern() {
    const tab_intern = document.getElementById("tab_intern")
    fetch(API + "/internship").then((res) => res.json())
        .then((data) => {
            console.log(data)
            let si = 1
            let rows = ``
            for (dt of data) {
                let technologies = dt.Technologies.map((tech) => `<span class="badge bg-secondary">${tech}</span>`).join(" ")
                rows += ` <tr>
                    <td>${si++}</td>
                    <td><span class="badge bg-primary">${dt.Title}</span></td>
                    <td>
                        ${technologies}
                    </td>
                    <td>${dt.Duration}</td>
                    <td>
                        <img src="${dt.Image}" class="img-fluid rounded" width="60" >
                    </td>
                    <td><a onClick="delIntern('${dt._id}')" class="btn btn-danger">Delete</a></td>
                </tr>
`
            }
            tab_intern.innerHTML = rows
        })
}


// Delete Single Internship
function delIntern(id) {
    let check = confirm("Are you sure you want to remove internship?")
    if (check) {
        fetch(API + `/internship/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(() => { loadIntern() })
    }
}



// Remove All Internship

function rm_Intern() {
    let check = confirm("Are you sure you want to remove all internship?")
    if (check) {
        fetch(API + "/internship",
            {
                method: "DELETE",
                headers: { authorization: localStorage.getItem("token") }
            }
        )
            .then(() => { loadIntern() })
    }

}




loadEnq()
loadCourse()
loadTra()
loadPro()
loadPost()
loadSlide()
loadIntern()