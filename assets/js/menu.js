const menu_btns = document.querySelectorAll(".menuBtn");
const nav1 = document.getElementById("nav1");
const nav2 = document.getElementById("nav2");
const new_menu = document.getElementById("menu");
const navbar = document.querySelector(".navbar");
const circle = document.querySelector(".circle");
const burger = document.querySelector(".burger");
const parent = document.getElementById("parent");
const bars = document.querySelectorAll(".bar");
const subNav = nav2.querySelectorAll(".row");
function barsRotate(d1, x1, y1, o, d2, x2, y2, w) {
  bars[0].style.transform = `rotate(${d1}deg) translate(${x1}px, ${y1}px)`;
  bars[1].style.opacity = `${o}`;
  bars[2].style.transform = `rotate(${d2}deg) translate(${x2}px, ${y2}px)`;
  bars[0].style.width = `${w}px`;
  bars[2].style.width = `${w}px`;
}

function reset() {
  barsRotate(0, 0, 0, 1, 0, 0, 0, 23);
  parent.classList.remove("h-100");
  navbar.classList.remove("bg-dark");
  navbar.classList.add("bg-success");
  circle.classList.remove("circle2");
  burger.classList.remove("bg-dark");
  burger.classList.remove("border");
}

new_menu.onclick = () => {
  nav1.classList.toggle("show");
  nav2.classList.contains("show") && nav2.classList.toggle("show");
  if (nav1.classList.contains("show")) {
    barsRotate(-45, -10, -10, 0, 45, 10.2, -10, 40);
    parent.classList.add("h-100");
    navbar.classList.add("bg-dark");
    navbar.classList.remove("bg-success");
    circle.classList.add("circle2");
    burger.classList.add("bg-dark");
    burger.classList.add("border");
  } else {
    reset();
  }
};

function setDefImgSrc(btn, idx) {
  if (idx == 0) {
    btn.src = "./assets/menu_icons/terms normal.svg";
  } else if (idx == 1) {
    btn.src = "./assets/menu_icons/intro normal.svg";
  } else if (idx == 2) {
    btn.src = "./assets/menu_icons/الفهرس.svg";
  } else if (idx == 3) {
    btn.src = "./assets/menu_icons/p1 normal.svg";
  } else if (idx == 4) {
    btn.src = "./assets/menu_icons/p2 normal.svg";
  }
}

function setHoverImgSrc(btn, idx) {
  if (idx == 0) {
    btn.src = "./assets/menu_icons/terms hover.svg";
  } else if (idx == 1) {
    btn.src = "./assets/menu_icons/intro hover.svg";
  } else if (idx == 3) {
    btn.src = "./assets/menu_icons/p1 hover.svg";
  } else if (idx == 4) {
    btn.src = "./assets/menu_icons/p2 hover.svg";
  }
}
function setSelectedImgSrc(btn, idx) {
  if (idx == 0) {
    // setDefImgSrc(btn, idx);
    btn.src = "./assets/menu_icons/terms selected.svg";
  } else if (idx == 1) {
    // setDefImgSrc(btn, idx);
    btn.src = "./assets/menu_icons/intro selected.svg";
  } else if (idx == 3) {
    // setDefImgSrc(btn, idx);
    btn.src = "./assets/menu_icons/p1 selected.svg";
  } else if (idx == 4) {
    // setDefImgSrc(btn, idx);
    btn.src = "./assets/menu_icons/p2 selected.svg";
  }
}
function removeSelected() {
  for (let i = 0; i < menu_btns.length; i++) {
    if (i == 0) {
      menu_btns[i].src = "./assets/menu_icons/terms normal.svg";
    } else if (i == 1) {
      menu_btns[i].src = "./assets/menu_icons/intro normal.svg";
    } else if (i == 3) {
      menu_btns[i].src = "./assets/menu_icons/p1 normal.svg";
    } else if (i == 4) {
      menu_btns[i].src = "./assets/menu_icons/p2 normal.svg";
    }
  }
}

menu_btns.forEach((btn, idx) => {
  setDefImgSrc(btn, idx);
  btn.onmouseover = () => {
    !btn.src.includes("selected") && setHoverImgSrc(btn, idx);
  };
  btn.onmouseout = () => {
    !btn.src.includes("selected") && setDefImgSrc(btn, idx);
  };
  if (idx == 3 || idx == 4) {
    btn.onclick = (e) => {
      !nav2.classList.contains("show") && nav2.classList.add("show");
      let title = "";
      let contentP1 = "";
      let contentP2 = "";
      let pages = [];
      if (idx == 3) {
        title = "./assets/menu_icons/مواضيع القسم الأول/القسم الأول.svg";
        pages = [9, 11, 12, 14, 32, 32, 33, 34, 34, 35];
        contentP1 = `<img
          src="./assets/menu_icons/مواضيع القسم الأول/9 normal.svg"
          alt="">
        <img
          src="./assets/menu_icons/مواضيع القسم الأول/11 normal.svg"
          alt="">
        <img src="./assets/menu_icons/مواضيع القسم الأول/12 normal.svg" alt="">
        <img src="./assets/menu_icons/مواضيع القسم الأول/14 normal.svg" alt="">
        <img src="./assets/menu_icons/مواضيع القسم الأول/32 normal.svg" alt="">`;
        contentP2 = `<img src="./assets/menu_icons/مواضيع القسم الأول/32-2 normal.svg" alt="">
          <img src="./assets/menu_icons/مواضيع القسم الأول/33 normal.svg"
            alt="">
          <img src="./assets/menu_icons/مواضيع القسم الأول/34 normal.svg"
            alt="">
          <img src="./assets/menu_icons/مواضيع القسم الأول/34-2 normal.svg"
            alt="">
          <img src="./assets/menu_icons/مواضيع القسم الأول/35 normal.svg"
            alt="">`;
      } else if (idx == 4) {
        title = "./assets/menu_icons/مواضيع القسم الثاني/القسم الثاني.svg";
        pages = [47, 48, 49, 49];
        contentP1 = `<img src="./assets/menu_icons/مواضيع القسم الثاني/47 normal.svg" alt="47">
          <img src="./assets/menu_icons/مواضيع القسم الثاني/48 normal.svg" alt="">`;
        contentP2 = `<img src="./assets/menu_icons/مواضيع القسم الثاني/49 normal.svg" alt="">
          <img src="./assets/menu_icons/مواضيع القسم الثاني/54 normal.svg" alt="">`;
      }
      subNav[0].children[0].children[0].src = title;
      !btn.src.includes("selected") &&
        (subNav[1].children[0].innerHTML = contentP1);
      !btn.src.includes("selected") &&
        (subNav[1].children[1].innerHTML = contentP2);

      removeSelected();
      setSelectedImgSrc(btn, idx);
      controlHoverForInnerImgs(pages);
    };
  } else {
    btn.onclick = () => {
      removeSelected();
      setSelectedImgSrc(btn, idx);
      if (idx == 0) {
        move(5);
        nav1.classList.remove("show");
        nav2.classList.remove("show");
        barsRotate(0, 0, 0, 1, 0, 0, 0, 23);
      } else if (idx == 1) {
        move(7);
        nav1.classList.remove("show");
        nav2.classList.remove("show");
        barsRotate(0, 0, 0, 1, 0, 0, 0, 23);
      }
    };
  }
});

function controlHoverForInnerImgs(pages) {
  const imgs = subNav[1].querySelectorAll("img");
  imgs.forEach((img, indx) => {
    img.addEventListener("mouseover", () => {
      if (!img.src.includes("selected")) {
        removeHoverImgs();
        img.src = img.src.replace("normal", "hover");
      }
    });
    img.addEventListener("mouseleave", () => {
      !img.src.includes("selected") && removeHoverImgs();
      // img.src = img.src.replace("hover", "normal");
    });
    img.addEventListener("click", (e) => {
      move(pages[indx]);
      removeSelectedImgs(img, indx);
      img.src = img.src.replace("hover", "selected");
    });
  });
}

function move(page) {
  window.top.nav.to(page);
  nav1.classList.remove("show");
  nav2.classList.remove("show");
  reset();
}

function removeHoverImgs() {
  const imgs = subNav[1].querySelectorAll("img");
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].src.includes("hover")) {
      imgs[i].src = imgs[i].src.replace("hover", "normal");
    }
  }
}

function removeSelectedImgs(img, indx) {
  const imgs = subNav[1].querySelectorAll("img");
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].src.includes("selected") && i !== indx) {
      imgs[i].src = imgs[i].src.replace("selected", "normal");
    }
  }
}
