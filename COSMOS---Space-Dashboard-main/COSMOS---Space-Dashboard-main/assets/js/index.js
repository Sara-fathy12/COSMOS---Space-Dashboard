const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionName = link.getAttribute("data-section");

    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("hidden");
    });
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }
    navLinks.forEach((l) => {
      l.classList.remove("bg-blue-500/10", "text-blue-400");
      l.classList.add("text-slate-300");
    });
    link.classList.add("bg-blue-500/10", "text-blue-400");
    link.classList.remove("text-slate-300");
  });
});

const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
sidebarToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("sidebar-open");
});
document.addEventListener("click", (e) => {
  if (window.innerWidth < 1024) {
    if (
      sidebar.classList.contains("sidebar-open") &&
      !sidebar.contains(e.target)
    ) {
      sidebar.classList.remove("sidebar-open");
    }
  }
});

const featuredTitle = document.getElementById("featured-title");
const featuredStatus = document.getElementById("featured-status");
const featuredProvider = document.getElementById("featured-provider");
const featuredRocket = document.getElementById("featured-rocket");
const featuredCountdown = document.getElementById("featured-countdown");
const featuredDate = document.getElementById("featured-date");
const featuredTime = document.getElementById("featured-time");
const featuredLocation = document.getElementById("featured-location");
const featuredCountry = document.getElementById("featured-country");
const featuredDescription = document.getElementById("featured-description");
const featuredImage = document.getElementById("featured-image");
const imageContainer = document.getElementById("imgContainer");

fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10")
  .then((res) => res.json())
  .then((data) => {
    launchesData = data.results; // ⭐ STORE ALL DATA

    fillFeaturedLaunch(launchesData[0]);
    fillLaunchGrid(launchesData.slice(1));
  })
  .catch((err) => console.error(err));

function fillFeaturedLaunch(launch) {
  featuredTitle.textContent = launch.name;
  featuredStatus.textContent = launch.status.abbrev;
  featuredProvider.textContent = launch.launch_service_provider.name;
  featuredRocket.textContent = launch.rocket.configuration.name;
  featuredDescription.textContent =
    launch.mission?.description || "No description available.";
  console.log(launch.image.image_url);
  if (launch.image?.image_url) {
    imageContainer.innerHTML = `
      <img src="${launch.image.image_url}" 
           alt="${launch.name}" 
           class="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='https://cosmos-space-dashboard-route.vercel.app/images/launch-placeholder.png';" >
      <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
    `;
  }
}

const launchesgrid = document.getElementById("launches-grid");
  function fillLaunchGrid(launch) {
    var container = ``;
    const placeholderUrl =
      "https://cosmos-space-dashboard-route.vercel.app/images/launch-placeholder.png";

    launch.forEach((element) => {

   const launchDate = new Date(element.net);
    const formattedDate = launchDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const formattedTime = launchDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }) + ' UTC';

    const locationName = element.pad.location.name;



      const imageContent = element.image?.image_url
        ? `<img src="${element.image.image_url}" 
            class="w-full h-full object-cover" 
            alt="${element.name}" 
            onerror="this.onerror=null; this.src='${placeholderUrl}';">`
        : `<img src="${placeholderUrl}" class="w-full h-full object-cover" alt="Launch placeholder">`;
      container += `
    <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
              <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
                ${imageContent}
                <div class="absolute top-3 right-3">
                  <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                    ${element.status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    ${element.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${element.launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedTime}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${element.rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${locationName}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                    Details
                  </button>
                  <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
      `;
    });
    launchesgrid.innerHTML = container;
  }
