/* The SAMĀ Festival — interactions */
(function () {
  "use strict";

  /* -----------------------------------------------------------------
     Password gate — CASUAL protection only.
     To change the password: replace PASS_HASH below with the SHA-256
     hex of your new password, e.g. in a terminal:
       node -e "crypto.subtle.digest('SHA-256',new TextEncoder().encode('YOURPASS')).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))"
     (Default password is shared separately.)
  ----------------------------------------------------------------- */
  const PASS_HASH =
    "dec1ddb277d5de8483fa783f1b680d2e6c4caea6175d927aadbb44de77175444";
  const gateForm = document.getElementById("gateForm");
  if (gateForm) {
    const pass = document.getElementById("gatePass");
    const err = document.getElementById("gateErr");
    const sha256hex = async (str) => {
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(str)
      );
      return [...new Uint8Array(buf)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };
    const unlock = () => {
      try {
        sessionStorage.setItem("sama_ok", "1");
      } catch (e) {}
      document.documentElement.classList.add("unlocked");
    };
    if (document.documentElement.classList.contains("unlocked")) {
      // already unlocked this session
    } else {
      setTimeout(() => pass && pass.focus(), 300);
    }
    gateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ok = (await sha256hex(pass.value)) === PASS_HASH;
      if (ok) {
        unlock();
      } else {
        err.hidden = false;
        pass.value = "";
        pass.focus();
      }
    });
  }

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menuToggle");

  /* --- sticky header state --- */
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- mobile menu (with position-preserving scroll lock) --- */
  let savedScroll = 0;
  const isOpen = () => nav.classList.contains("open");

  const openMenu = () => {
    savedScroll = window.scrollY || window.pageYOffset || 0;
    nav.classList.add("open");
    document.body.classList.add("menu-open");
    document.body.style.top = `-${savedScroll}px`;
    toggle.setAttribute("aria-expanded", "true");
  };

  // restore=true returns the reader to where they were (X / scrim / Esc);
  // restore=false unlocks without forcing scroll, so an anchor jump can take over.
  const closeMenu = (restore = true) => {
    if (!isOpen() && !document.body.classList.contains("menu-open")) return;
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    document.body.style.top = "";
    if (restore) window.scrollTo(0, savedScroll);
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // nav links: close without restoring, then let the in-page anchor scroll run
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => closeMenu(false))
  );

  // tap anywhere outside the panel (incl. the scrim) closes it
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });

  // Escape closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // if the viewport grows past the mobile breakpoint, drop the menu state cleanly
  const mq = window.matchMedia("(min-width:861px)");
  const onMq = (e) => {
    if (e.matches) closeMenu(false);
  };
  mq.addEventListener ? mq.addEventListener("change", onMq) : mq.addListener(onMq);

  /* --- reveal on scroll --- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* --- attach video sources when the card nears the viewport ---
     preload="none" means no bytes are fetched until the user hits play,
     so wiring src early simply makes the play button work instantly. --- */
  const videos = document.querySelectorAll(".video-card video");
  const wire = (video) => {
    if (video.dataset.wired) return;
    video.dataset.wired = "1";
    video.querySelectorAll("source[data-src]").forEach((s) => {
      s.src = s.getAttribute("data-src");
    });
    video.load();
  };
  if ("IntersectionObserver" in window) {
    const vio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            wire(e.target);
            vio.unobserve(e.target);
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    videos.forEach((v) => vio.observe(v));
  } else {
    videos.forEach(wire);
  }

  /* --- current year --- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
