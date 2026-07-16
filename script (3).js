const menuButton = document.querySelector(".menu");
const navLinks = document.querySelector("#nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const siteHeader = document.querySelector(".site-header");

function updateHeaderOnScroll() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}


const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : "";

    contactForm.classList.add("is-submitting");
    formStatus.classList.remove("error");
    formStatus.textContent = "Sending your inquiry…";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("The form service returned an error.");
      }

      window.location.href = "thank-you.html";
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent =
        "Your message could not be sent. Please try again or email chrisdykstratax@gmail.com.";
    } finally {
      contactForm.classList.remove("is-submitting");

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

const knowledgeSearch=document.querySelector("#knowledge-search");
const knowledgeCards=[...document.querySelectorAll(".knowledge-card")];
const filterButtons=[...document.querySelectorAll(".filter-button")];
const knowledgeResults=document.querySelector("#knowledge-results");
if(knowledgeSearch&&knowledgeCards.length){let activeFilter="all";const update=()=>{const q=knowledgeSearch.value.trim().toLowerCase();let n=0;knowledgeCards.forEach(card=>{const show=(!q||card.dataset.search.includes(q))&&(activeFilter==="all"||card.dataset.category===activeFilter);card.hidden=!show;if(show)n++;});if(knowledgeResults)knowledgeResults.textContent=`${n} guide${n===1?"":"s"} found.`};knowledgeSearch.addEventListener("input",update);filterButtons.forEach(button=>button.addEventListener("click",()=>{activeFilter=button.dataset.filter;filterButtons.forEach(x=>x.classList.toggle("active",x===button));update()}));update();}
