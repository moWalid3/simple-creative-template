// here it's change background image but not random take look because names of variables are not correct
//
let setting = document.querySelector(".setting");
let elementsColor = document.querySelectorAll(".colors .color");
let backgroundImageDuration = 10000;
let controlSetInterval;

window.onload = () => {
  checkLocalStorage();
};

// check local storage
function checkLocalStorage() {
  if (localStorage.getItem("color") != undefined) {
    elementsColor.forEach((ele) => {
      if (ele.dataset.color == localStorage.getItem("color")) {
        ele.classList.add("active");
      } else {
        ele.classList.remove("active");
      }
    });
    document.documentElement.style.setProperty(
      "--main-color",
      localStorage.getItem("color")
    );
  }
  if (localStorage.getItem("showBullets") != undefined) {
    let yesBtn = document.querySelector(".Show-bullets .yes");
    if (localStorage.getItem("showBullets") === "yes") {
      yesBtn.classList.add("active");
      yesBtn.nextElementSibling.classList.remove("active");
      document.querySelector(".side-nav").style.right = "20px";
    } else {
      yesBtn.classList.remove("active");
      yesBtn.nextElementSibling.classList.add("active");
      document.querySelector(".side-nav").style.right = "-20px";
    }
  }
  if (localStorage.getItem("randomBackground") != undefined) {
    let yesBtn = document.querySelector(".random-background .yes");
    if (localStorage.getItem("randomBackground") === "yes") {
      yesBtn.classList.add("active");
      yesBtn.nextElementSibling.classList.remove("active");
    } else {
      clearInterval(controlSetInterval);
      yesBtn.classList.remove("active");
      yesBtn.nextElementSibling.classList.add("active");
    }
  }
}

// control setting
document.querySelector(".setting .icon-box").addEventListener("click", () => {
  setting.classList.toggle("show");
});

// setting main-color of web-site
elementsColor.forEach((ele) => {
  ele.addEventListener("click", () => {
    elementsColor.forEach((ele) => ele.classList.remove("active"));
    ele.classList.add("active");
    localStorage.setItem("color", ele.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      ele.dataset.color
    );
  });
});

// setting does he need random background
document.querySelectorAll(".random-background button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.classList.add("active");
    if (e.target.classList.contains("yes")) {
      changeBackground();
      e.target.nextElementSibling.classList.remove("active");
      localStorage.setItem("randomBackground", "yes");
    } else {
      clearInterval(controlSetInterval);
      e.target.previousElementSibling.classList.remove("active");
      localStorage.setItem("randomBackground", "no");
    }
  });
});

// setting show bullets
document.querySelectorAll(".Show-bullets button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.classList.add("active");
    if (e.target.classList.contains("yes")) {
      document.querySelector(".side-nav").style.right = "20px";
      e.target.nextElementSibling.classList.remove("active");
      localStorage.setItem("showBullets", "yes");
    } else {
      document.querySelector(".side-nav").style.right = "-20px";
      e.target.previousElementSibling.classList.remove("active");
      localStorage.setItem("showBullets", "no");
    }
  });
});

// reset setting
document.querySelector(".setting .reset").onclick = () => {
  localStorage.clear();
  location.reload();
};

// change background imgs
changeBackground();
function changeBackground() {
  controlSetInterval = "";
  fetch("../json/background.json")
    .then((response) => response.json())
    .then((data) => {
      let landing = document.querySelector(".landing");
      let pointer = 2;
      controlSetInterval = setInterval(() => {
        landing.style.backgroundImage = `url("${data[pointer]}")`;
        pointer++;
        if (pointer == 7) {
          pointer = 1;
        }
      }, backgroundImageDuration);
    });
}

// show header nav when click at menu icon
document.querySelector(".main-nav i").addEventListener("click", () => {
  document.querySelector(".main-nav ul").classList.toggle("show");
});
document.querySelector(".landing").addEventListener("click", (e) => {
  if (e.target != document.querySelector(".main-nav i")) {
    document.querySelector(".main-nav ul").classList.remove("show");
  }
});

// progress skills + scroll top
window.onscroll = () => {
  if (scrollY >= document.querySelector(".skills").offsetTop - 100) {
    document.querySelectorAll(".fill span").forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
  if (scrollY >= document.querySelector(".about").offsetTop - 300) {
    document.querySelector(".scroll-top").style.right = "50px";
  } else {
    document.querySelector(".scroll-top").style.right = "-50px";
  }
};
document.querySelector(".scroll-top").addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

// gallery show images
document.querySelectorAll(".gallery img").forEach((img, index) => {
  img.addEventListener("click", () => {
    img.parentElement.parentElement.classList.add("show");
    document.documentElement.style.setProperty(
      "--content-before-box-img",
      `"#${index + 1}"`
    );
    img.parentElement.parentElement.addEventListener("click", (e) => {
      if (e.target != img)
        img.parentElement.parentElement.classList.remove("show");
    });
  });
  img.previousElementSibling.addEventListener("click", () => {
    img.parentElement.parentElement.classList.remove("show");
  });
});
