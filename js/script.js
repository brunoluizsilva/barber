const $headerTotal = document.querySelector(".header-total");

window.addEventListener("scroll", toggleHeader, false);

function toggleHeader() {
  const corFundo = $headerTotal.classList.contains('header-color') == false;
  if (window.pageYOffset > 0 &&  $headerTotal.classList.contains('header-color') == false) {
    $headerTotal.classList.add('header-color')
  } else if (window.pageYOffset <= 0 && $headerTotal.classList.contains('header-color') == true) {
    $headerTotal.classList.remove('header-color')
  }
}


/* menu mobile */

let show = true;

const menuSection = document.querySelector(".menu-section")
const menuToggle = menuSection.querySelector(".menu-toggle")

menuToggle.addEventListener("click", () => {
  document.body.style.overflow = show ? "hidden" : "initial"
  menuSection.classList.toggle("on", show)
  show = !show;
})


/* scroll suave interno */

const menuItems = document.querySelectorAll('.header-menu a[href^="#"]');

menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 129;
  scrollToPosition(to);
}

function scrollToPosition(to) {
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // });
  smoothScrollTo(0, to);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};


