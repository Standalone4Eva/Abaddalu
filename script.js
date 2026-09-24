const enterBtn = document.getElementById("enterBtn");
const opening = document.getElementById("opening");
const letter = document.getElementById("letter");

const viewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCaption = document.getElementById("viewerCaption");
const closeViewer = document.getElementById("closeViewer");

const imageCaptions = {
  "family.jpg": "The future I imagined.",
  "future.jpg": "The life we kept imagining together.",
  "better-half.jpg": "My better half.",
  "pondicherry.jpg": "Pondicherry.",
  "arunachalam.jpg": "Arunachalam.",
  "anniversary.jpg": "Our first anniversary.",
  "first-salary.jpg": "The things I wanted to do with my first salary.",
  "ahmedabad.jpg": "The place I was trying to build a life in.",
  "beautiful-life.jpg": "MANA BEAUTIFUL LIFE."
};


/* =========================
   OPEN THE LETTER
========================= */

enterBtn.addEventListener("click", () => {
  opening.classList.add("hidden");

  letter.classList.add("visible");
  letter.setAttribute("aria-hidden", "false");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =========================
   MEMORY HANDLER
   Supports BOTH images and videos
========================= */

document.querySelectorAll(".memory-link").forEach(link => {

  link.addEventListener("click", () => {

    const image = link.dataset.image;
    const video = link.dataset.video;


    /* ---------- VIDEO ---------- */

    if (video) {

      viewerImage.style.display = "none";

      let videoElement = document.getElementById("memoryVideo");


      // Create video element only once
      if (!videoElement) {

        videoElement = document.createElement("video");

        videoElement.id = "memoryVideo";

        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;

        // Muted is required for autoplay in most browsers
        videoElement.muted = true;

        videoElement.style.maxWidth = "min(1000px, 80vw)";
        videoElement.style.maxHeight = "78vh";

        videoElement.style.boxShadow =
          "0 30px 100px rgba(0,0,0,.6)";

        viewer.insertBefore(
          videoElement,
          viewerCaption
        );
      }


      // Load selected video
      videoElement.src = `assets/${video}`;

      videoElement.style.display = "block";

      videoElement.currentTime = 0;

      videoElement.play().catch(() => {});

      viewerCaption.textContent = "";
    }


    /* ---------- IMAGE ---------- */

    else {

      const videoElement =
        document.getElementById("memoryVideo");


      // Stop previous video if one exists
      if (videoElement) {

        videoElement.pause();

        videoElement.style.display = "none";

        videoElement.src = "";
      }


      // Load image
      viewerImage.src = `assets/${image}`;

      viewerImage.alt =
        imageCaptions[image] || "Memory";

      viewerImage.style.display = "block";

      viewerCaption.textContent =
        imageCaptions[image] || "";
    }


    /* ---------- OPEN VIEWER ---------- */

    viewer.classList.add("open");

    viewer.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";
  });

});


/* =========================
   CLOSE IMAGE / VIDEO
========================= */

function closeImage() {

  viewer.classList.remove("open");

  viewer.setAttribute(
    "aria-hidden",
    "true"
  );

  viewerImage.src = "";


  const videoElement =
    document.getElementById("memoryVideo");


  if (videoElement) {

    videoElement.pause();

    videoElement.currentTime = 0;

    videoElement.src = "";

    videoElement.style.display = "none";
  }


  document.body.style.overflow = "";
}


/* Close button */

closeViewer.addEventListener(
  "click",
  closeImage
);


/* Click outside image/video */

viewer.addEventListener(
  "click",
  event => {

    if (event.target === viewer) {
      closeImage();
    }

  }
);


/* ESC key */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeImage();
    }

  }
);


/* =========================
   SCROLL PROGRESS
========================= */

const progress =
  document.getElementById("progress");

const sections = [
  ...document.querySelectorAll(
    ".prose > p, .final"
  )
];


window.addEventListener(
  "scroll",
  () => {

    if (!sections.length) return;

    const midpoint =
      window.innerHeight * 0.45;

    let current = 1;


    sections.forEach(
      (section, index) => {

        if (
          section.getBoundingClientRect().top
          < midpoint
        ) {
          current = index + 1;
        }

      }
    );


    const total =
      Math.max(sections.length, 7);


    progress.textContent =
      `${String(Math.min(current, total)).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }
);