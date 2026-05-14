// Load Internship Data
async function loadInternship() {
    try {
        const res = await fetch(window.ENV.API_URL + "/internship");

        // Check API response
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        let str1 = "";

        // If no data
        if (!data || data.length === 0) {
            document.querySelector("#intern").innerHTML =
                "<p class='text-center'>No internships available</p>";
            return;
        }

        for (let pro of data) {

            // Technologies badges
            let tk = "";
            if (pro.Technologies && pro.Technologies.length > 0) {
                for (let tks of pro.Technologies) {
                    tk += `<span class="tech-badge">${tks}</span>`;
                }
            }

            str1 += `
                <div class="col-md-3 reveal-up">
                    <div class="card course-card">

                        <!-- Image -->
                        <img src="${pro.Image}" 
                             class="card-img-top course-img"
                             alt="${pro.Title} Internship for college students at Future Tech Academy Tenkasi">

                        <div class="card-body">

                            <!-- Title -->
                            <h5 class="course-title">${pro.Title}</h5>

                            <!-- Description -->
                            <p class="course-desc">
                                ${pro.Description || "No description available"}
                            </p>

                            <!-- Technologies -->
                            <div class="mb-3">
                                ${tk}
                            </div>

                            <!-- Duration -->
                            <p class="duration">
                                ⏱ Duration: ${pro.Duration || "N/A"}
                            </p>

                            <!-- Button (BOTTOM FIX) -->
                            <div class="d-grid mt-auto">
                                <button class="btn btn-brand"
                                    data-bs-toggle="modal"
                                    data-bs-target="#enq">
                                    Enroll Now
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        }

        // Render data
        document.querySelector("#intern").innerHTML = str1;

        // Apply animation after render
        applyRevealAnimation();

    } catch (error) {
        console.error("Error loading internships:", error);

        document.querySelector("#intern").innerHTML =
            "<p class='text-danger text-center'>Failed to load internships</p>";
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    loadInternship();
});