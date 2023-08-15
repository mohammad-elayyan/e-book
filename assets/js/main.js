// Book ID
let book_id = "STEAM_01";

// NUMBER OF PAGES IN BOOK
const totalpages = 53;
let totaldrawingis = 0;

let currentPage;
let temp;

// Select the node that will be observed for mutations
const li = Array.prototype.slice.call(document.getElementsByClassName("page"));

function getCounts() {
  let getLocalStorageData = localStorage.getItem(`${book_id}_TodoList`);

  let listArray = JSON.parse(getLocalStorageData);
  // let canvasArray = JSON.parse(getLocalStorageCanvas);

  let badge_todo = window.parent.document.getElementById("badge-todo");

  // update to-do list Notification
  if (listArray != null && listArray.length > 0) {
    badge_todo.innerHTML = listArray.length;
    badge_todo.classList.add("badge-todo");
  } else {
    badge_todo.classList.remove("badge-todo");
    badge_todo.innerHTML = null;
  }
}

// update Drawing list Notification

function draw_badge() {
  // console.log("draw bage is called");
  let badge_draw = document.getElementById("badge-draw");
  // console.log(badge_draw);
  totaldrawingis = 0;
  // console.log("reset total drawings to 0");
  // console.log(totaldrawingis);

  for (let index = 1; index <= totalpages; index++) {
    // console.log(localStorage.getItem(`${book_id}_canvas${index}`));

    if (localStorage.getItem(`${book_id}_canvas${index}`) != null) {
      // GetaActliS();
      // console.log(currentPage);

      totaldrawingis += 1;
      // console.log("total is   :" + totaldrawingis);
      badge_draw.innerHTML = totaldrawingis;
      badge_draw.classList.add("badge-draw");
    }
  }
  if (totaldrawingis === 0) {
    badge_draw.classList.remove("badge-draw");
    badge_draw.innerHTML = null;
  }
}

// else{
//   //  badge_draw.classList.remove("badge-draw");
//    badge_draw.innerHTML=null;

//  }

getCounts();
draw_badge();

const asyncLocalStorage = {
  setItem: async function (key, value) {
    return localStorage.setItem(`${book_id}_${key}`, JSON.stringify(value));
  },
  getItem: async function (key) {
    return JSON.parse(localStorage.getItem(`${book_id}_${key}`));
  },
};
const savHandler = (isSave) => {
  // let c = 0;
  let arr = [];
  li.forEach(async (el) => {
    if (isSave) {
      arr.push(el.querySelector(".page-scale-wrap").innerHTML);

      asyncLocalStorage.setItem("new", arr);
    } else {
      await asyncLocalStorage.getItem("new").then((r) => {
        window.onload = () => {
          for (let i = 0; i < r.length; i++) {
            li[i].querySelector(".page-scale-wrap").innerHTML = r[i];
          }
        };
      });
    }
  });
};
const closeDiv = () => {};

const savedVersion = asyncLocalStorage.getItem("new").then((r) => {
  if (r) {
    savHandler(false);
  }
});

let btn = document.querySelector(".edit-tools").querySelectorAll(".nav-link");
let ls = document.querySelectorAll(".link");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

function setTitle() {
  const navs = document.querySelector("nav");
  for (let i = 0; i < btn.length; i++) {
    let t = [
      "إزالة التمييز",
      "تمييز",
      "إضافة ملاحظة",
      "بحث في جوجل",
      "بحث في ويكيبيديا",
      "الصفحات المميزة",
      "الفهرس",
    ];
    btn[i].setAttribute("title", t[i]);
  }
}
window.onload = setTitle;
window.onresize = setTitle;

let selRange = null;
let sel = null;
let h = false;
let g = false;
let w = false;
let isHl = false;
let timer = null;
const editTools = document.querySelector(".edit-tools");
const cont = document.getElementById("container-wrap");
let CP;

li.forEach((l) => {
  nextBtn.addEventListener("click", () => {
    CP = currentPage;
  });
  backBtn.addEventListener("click", () => {
    CP = currentPage;
  });
  l.addEventListener("click", () => {
    CP = l.dataset.name;
  });
  l.ontouchstart = () => {
    CP = l.dataset.name;
  };
});

const select = (e) => {
  sel = window.getSelection();
  selRange = sel.toString().trim();
  // timer = setInterval(selRange, 1050);
  if (selRange) {
    e.preventDefault();
    let rect = sel.getRangeAt(0).getBoundingClientRect();
    let editToolsDetails = editTools.getBoundingClientRect();

    editTools.style.transform = "scale(1)";
    if (
      e.type == "touchstart" ||
      e.type == "touchmove" ||
      e.type == "touchend" ||
      e.type == "touchcancel"
    ) {
      var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      var touch = evt.touches[0] || evt.changedTouches[0];
      editTools.style.top = `${touch.pageY + 20}px`;
      if (touch.pageX - 90 < 0) {
        editTools.style.left = 0;
      } else if (touch.pageX - 90 + 209 > window.innerWidth) {
        editTools.style.left = `${window.innerWidth - 209}px`;
      } else {
        editTools.style.left = `${touch.pageX - 90}px`;
      }
    } else {
      editTools.style.top = `calc(${rect.top}px + ${rect.height}px)`;
      if (rect.left + rect.width / 2 - 130 < 0) {
        editTools.style.left = 0;
      } else if (rect.left + rect.width / 2 - 130 > window.innerWidth) {
        editTools.style.left = `${window.innerWidth}px`;
      } else {
        editTools.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 130px)`;
      }
    }
  } else {
    editTools.style.position = "absolute";
    editTools.style.top = "-100%";
    editTools.style.left = "-100%";
    editTools.style.transform = "scale(0)";
    const c = document.getElementsByTagName("html")[0];
    // savHandler(true);

    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.remove("active");
    }
    activateBookMarking(false);
    document.getElementsByTagName("html")[0].classList.remove("cursor");
  }
};
cont.addEventListener("click", (e) => {
  select(e);
  // console.log(sel.anchorNode.parentNode);
});
cont.addEventListener("touchend", (e) => {
  select(e);
});
let hl = function () {
  for (let i = 0; i < btn.length; i++) {
    if (i != 1) {
      g = false;
      w = false;
      activateBookMarking(false);
    }
  }
  h = true;

  if (h) {
    document.designMode = "on";
    sel = window.getSelection();
    selRange = sel.toString().trim();
    document.execCommand("BackColor", false, "#ffba53");
    document.designMode = "off";
    editTools.style.top = "-100%";
    editTools.style.left = "-100%";
    editTools.style.transform = "scale(0)";
    const c = document.getElementsByTagName("html")[0];
    savHandler(true);
  }
  // clearInterval(timer);
  sel.removeAllRanges();
  h = false;
};

const hlBtn = document.getElementById("hl");
const delHlBtn = document.getElementById("delHl");

hlBtn.addEventListener("click", hl, false);
hlBtn.addEventListener("touchend", hl, false);

const delHl = () => {
  document.designMode = "on";
  document.execCommand("BackColor", false, "transparent");
  document.designMode = "off";
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
  const c = document.getElementsByTagName("html")[0];
  savHandler(true);
  sel.removeAllRanges();
};

delHlBtn.addEventListener("click", delHl, false);
delHlBtn.addEventListener("touchend", delHl, false);

const closeModal = () => {
  const bookMark = document.querySelector(".bookmarks-div");

  const accitms = document.querySelectorAll(".accordion-item");
  bookMark.classList.remove("show");
  // btn[5].classList.remove("active");
};

//! *********************************** Comment  Start**********************************

const addCommentButton = document.getElementById("add-comment");

const comments = JSON.parse(localStorage.getItem(`${book_id}_comments`)) || {};
let counter = JSON.parse(localStorage.getItem(`${book_id}_counter`)) || 0;
const commentIconsCoordinate =
  JSON.parse(localStorage.getItem(`${book_id}_coordinate`)) || {};
let targetId = "";

const textArea = document.querySelector("textarea");
const saveComment = document.getElementById("save");

const isSetCommentAllowed = () => {
  for (let i = 0; i < btn.length; i++) {
    if (i != 2) {
      btn[i].classList.remove("active");
      h = false;
      g = false;
      w = false;
    }
  }

  btn[2].classList.toggle("active");
  document.getElementsByTagName("html")[0].classList.toggle("cursor");
};
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

saveComment.addEventListener("click", () => {
  if (textArea.value && !comments[targetId]) {
    comments[`btn-${counter}`] = [textArea.value, CP, x, y];
    textArea.value = "";
    commentBlockVisability({ isVisable: false });
    btn[2].classList.remove("active");
    const c = document.getElementsByTagName("html")[0];
    asyncLocalStorage.setItem("comments", comments);
  } else {
    comments[targetId] = [textArea.value, CP, x, y];

    textArea.value = "";
    asyncLocalStorage.setItem("comments", comments);
  }
  counter++;
  asyncLocalStorage.setItem("counter", counter);
  commentBlockVisability({ isVisable: false });
  btn[2].classList.remove("active");
});

const closeComments = () => {
  const div = document.getElementById("comment-block");
  div.style.display = "none";
  btn[2].classList.remove("active");
  comments[targetId] = [textArea.value, CP, x, y];
  textArea.value = "";
  hideTools();
  if (comments[targetId][0] == "") {
    document.getElementById(`btn-${counter}`).remove();
  }
  const c = document.getElementsByTagName("html")[0];
};

// ************************ Comment Icon Create Function ***********************
let x;
let y;
const createCommentIcon = (e, page) => {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.className = "comment";

  if (typeof e == "string") {
    div.style.left = `${comments[e][2]}px`;
    div.style.top = `${comments[e][3]}px`;
    div.id = e;
  } else {
    div.id = `btn-` + counter;
    if (
      e.type == "touchstart" ||
      e.type == "touchmove" ||
      e.type == "touchend" ||
      e.type == "touchcancel"
    ) {
      var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      var touch = evt.touches[0] || evt.changedTouches[0];
      x =
        touch.pageX -
        page.getBoundingClientRect().left -
        getComputedStyle(div).width.slice(0, -2 - 6);
      y =
        touch.pageY -
        page.getBoundingClientRect().top -
        getComputedStyle(div).width.slice(0, -2);
    } else if (
      e.type == "mousedown" ||
      e.type == "mouseup" ||
      e.type == "click"
    ) {
      x =
        e.pageX -
        page.getBoundingClientRect().left -
        getComputedStyle(div).width.slice(0, -2 - 6);
      y =
        e.pageY -
        page.getBoundingClientRect().top -
        getComputedStyle(div).width.slice(0, -2);
    }
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    commentBlockVisability({ isVisable: true, commentIcon: div });
  }
  page.append(div);
  targetId = div.id;

  commentButtoListener(div);
  btn[2].classList.remove("active");
};

const commentBlockVisability = ({ isVisable, commentIcon }) => {
  hideTools();
  document.getElementsByTagName("html")[0].classList.remove("cursor");
  const div = document.getElementById("comment-block");
  const cancelComment = document.getElementById("delete-comment");
  div.style.display = isVisable ? "flex" : "none";
  cancelComment.addEventListener("click", () => {
    textArea.value = "";
    div.style.display = "none";

    if (commentIcon && commentIcon.id == targetId) {
      commentIcon.remove();
      delete comments[targetId];
      asyncLocalStorage.setItem("comments", comments);
    }
  });
};

function commentButtoListener(div) {
  if (div) {
    div.onclick = () => {
      const id = div.id;
      textArea.value = comments[id][0];
      targetId = id;
      commentBlockVisability({ isVisable: true, commentIcon: div });
    };
  }
  return;
}

//! *********************************** Comment  End**********************************
const searchInGoogle = () => {
  for (let i = 0; i < btn.length; i++) {
    if (i != 3) {
      btn[i].classList.remove("active");
      h = false;
      w = false;
      activateBookMarking(false);
    }
  }
  g = true;

  if (g && selRange) {
    window.open("https://www.google.com/search?q=" + selRange, "_blank");
  }
  g = false;
};
const searchInWiki = () => {
  for (let i = 0; i < btn.length; i++) {
    if (i != 4) {
      btn[i].classList.remove("active");
      h = false;
      g = false;
      activateBookMarking(false);
    }
  }
  w = true;

  if (w && selRange) {
    window.open("https://ar.wikipedia.org/wiki/" + selRange, "_blank");
  }
  w = false;
};

const bookingPages =
  JSON.parse(localStorage.getItem(`${book_id}_bookingPages`)) || {};
const createButton = ({ id, text }) => {
  return $(`<button id =${id}> ${text} </button>`)[0];
};

// const createCheckBox = ({ id, onchange }) => {
//   return $(
//     `   <img id=${
//       "radio-" + id
//     }  src=${"assets/png/disabledBookMark.png"} alt="1"  class=${"checkbox"} />
//     `
//   )[0];
// };

//! ***********************************functions******************************************
const checkboxWhenClick = (e, checkbox, index) => {
  if (!bookingPages[e.target.id]) {
    bookingPages[e.target.id] = index + 1;

    checkbox.src = "assets/png/activBookMark.png";
  } else {
    delete bookingPages[e.target.id];

    showBookmark();
    checkbox.src = "assets/png/disabledBookMark.png";
  }

  asyncLocalStorage.setItem("bookingPages", bookingPages);
};
// ************************ CheckBoxes Create Function ***********************
const addCheckMarkToPages = () => {
  const pages = Array.prototype.slice.call(
    document.getElementsByClassName("page")
  );
  addCommentsToScreen(pages);
  printPage(pages);
  // pages.forEach((page, index) => {
  //   const checkbox = createCheckBox({ id: index + 1 });
  //   if (index % 2 === 0 && window.innerWidth >= 746) {
  //     checkbox.style.right = "15px";
  //   } else {
  //     checkbox.style.left = "15px";
  //   }
  //   checkbox.onclick = (e) => {
  //     console.log(checkbox);
  //     console.log("created");
  //     checkboxWhenClick(e, checkbox, index);
  //   };
  //   checkbox.ontouchend = (e) => {
  //     checkboxWhenClick(e, checkbox, index);
  //   };

  //   page.append(checkbox);
  //   activateBookMarking(true);
  // });
};
// ************************ Comments Create Function ***********************
const addCommentsToScreen = (pages) => {
  pages.forEach((page, index) => {
    page.style.position = "relative";
    if (Object.keys(comments).length !== 0) {
      for (const key in comments) {
        if (page.dataset.name == comments[key][1]) {
          createCommentIcon(key, page);
        }
      }
    }

    page.addEventListener("touchend", (e) => {
      if (btn[2].classList.contains("active")) {
        createCommentIcon(e, page);
      }
    });

    page.addEventListener("mouseup", (e) => {
      if (btn[2].classList.contains("active")) {
        createCommentIcon(e, page);
      }
    });
  });
};

const printPage = (pages) => {
  pages.forEach((page, index) => {
    const print = document.getElementById("print");
    if (window.innerWidth >= 768) {
      print.onclick = (e) => {
        hideTools();
        window.moveTo(0, 0);
        window.resizeTo(640, 480);
        window.print();
      };
    } else {
      print.ontouchend = (e) => {
        hideTools();
        window.moveTo(0, 0);
        window.resizeTo(640, 480);
        window.print();
      };
    }
  });
};
const activateBookMarking = (isActivate) => {
  const checkBoxes = Array.prototype.slice.call(
    document.getElementsByClassName("checkbox")
  );
  checkBoxes.forEach((checkbox) => {
    if (bookingPages[checkbox.id]) {
      checkbox.src = "assets/png/activBookMark.png";
    } else {
      checkbox.src = "assets/png/disabledBookMark.png";
    }
    if (isActivate) {
      checkbox.style.display = "block";
    } else {
      const img = document.createElement("img");
      img.src = "assets/png/disabledBookMark.png";
    }
  });
};

const bookmarkContainer = () => {
  const bookMark = document.querySelector(".bookmarks-div");

  showBookmark();
  bookMark.classList.toggle("show");
};

const modalClose = document.getElementById("close-interactive");

const interactive = (title, content, isModal, isImg, isIndex) => {
  console.log("interactive");
  const modalParent = document.querySelector(".bookmarks-div");
  const modalBox = document.getElementsByClassName("modal-content")[1];
  const modalContent = document.getElementsByClassName("modal-body")[1];
  const modalTitle = document.getElementsByClassName("modal-title")[1];
  // console.log(modalTitle);
  modalContent.innerHTML = "";
  let iframe = $(
    `<iframe width="100%" height="100%" src="${content}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  );
  if (isModal) {
    modalTitle.innerText = title;
    if (isImg) {
      iframe = $(`<img class="modal-img" src="${content}">`);
    }
    if (isIndex) {
      iframe = $(`<span>${content}</span>`);
      const accor = document.getElementsByClassName("accordion")[1];

      if (!accor.children.length) {
        fillIndex();
      }
    }
    modalContent.append(iframe[0]);
    modalBox.style.backgroundColor = "transparent";
    modalTitle.style.color = "#fff";
    modalClose.classList.add("close");
    modalContent.style.width = "100vw";
    modalContent.style.height = "100vh";
    modalParent.classList.add("show");
  } else {
    modalContent.remove();
    const modalBody = document.createElement("div");
    const acc = document.createElement("div");
    modalBody.className = "modal-body";
    acc.className = "accordion";
    acc.id = "accordionExample";
    modalBox.append(modalBody);
    document.getElementsByClassName("modal-body")[1].append(acc);
    modalBox.style.backgroundColor = "#fff";
    // modalBox.style.border = "2px solid #E9A954";
    modalTitle.style.color = "#000";
    modalClose.classList.remove("close");
  }
};

modalClose.addEventListener("click", () => {
  interactive(null, null, false, false, false);
});

const showBookmark = () => {
  const checkListDiv = document.getElementsByClassName("modal-body")[1];
  const modalTitle = document.getElementsByClassName("modal-title")[1];
  modalTitle.innerText = "الصفحات المميزة";
  checkListDiv.innerHTML = "";
  for (const key in bookingPages) {
    const parent = $(`<div class="parent"></div>`)[0];
    const btn = $(`<button> صفحة ${bookingPages[key]}</button>`)[0];
    const delBtn = $(
      `<div><img style="width:100%;max-width:20px;" title="إزالة" src="./assets/png/delete.png"></div>`
    )[0];
    btn.addEventListener("click", () => {
      closeDiv();
      window.top.nav.to(bookingPages[key]);
      closeModal();
      removeMark();
    });
    delBtn.addEventListener("click", () => {
      delete bookingPages[key];
      showBookmark();
      asyncLocalStorage.setItem("bookingPages", bookingPages);
      document.getElementById(key).src = "assets/png/disabledBookMark.png";
      // if (!bookMarkButton.classList.contains("active")) {
      //   document.getElementById(key).style.display = "none";
      // }
    });
    parent.append(btn, delBtn);
    checkListDiv.append(parent, $("<hr/>")[0]);
  }
};

const bookmark = () => {
  bookMarkButton.classList.add("active");
  activateBookMarking(true);
};

//! *********************************** Execute Functions******************************************

addCheckMarkToPages();

const index = ({ id1, id2, arrow, num, title, isUse, arr }) => {
  hideTools();
  const accordion = document.getElementById("accordionExample");
  const acItem = $(`<div class="accordion-item"></div>`)[0];
  if (id1 === "headingOne") {
    const accHeader = document.createElement("div");
    accHeader.className = "accordion-item acc-header";
    const accHeaderContent = $(
      `<div class="acc-row p-2"><div class="acc-col">الصفحة</div><div class="acc-col">العنوان</div></div>`
    )[0];
    accHeader.append(accHeaderContent);
    accordion.append(accHeader);
  }
  const accContent = $(`<h2 class="accordion-header" id=${id1}>
<button class="accordion-button collapsed ${arrow}" type="button" data-bs-toggle="collapse" data-bs-target="#${id2}" aria-expanded="true" aria-controls="${id2}">
    <span class="num">${num}</span>
    <div class='title'>
    <span>${title}</span>
    </div>
  </button>
</h2>`)[0];

  accContent.onclick = () => {
    closeDiv();
    removeMark();
    window.top.nav.to(num);
    if (arr.length === 0) {
      closeModal();
      interactive(null, null, false, false, false);
    }
  };
  accordion.append(acItem);
  acItem.append(accContent);

  const addDiv =
    $(`<div id="${id2}" class="accordion-collapse collapse" aria-labelledby=${id1} data-bs-parent="#accordionExample">
<div class="accordion-body">
<ul class="lists index-lists">
  
</ul>
</div>
</div>`)[0];
  if (arr.length !== 0) {
    arr.forEach((ele, index) => {
      const addLi =
        $(`<li class="acc-list" style="z-index:3;padding:8px 0;list-style:none;">
     
      <span class="num">${ele.num}</span>
      <span>${ele.title}</span>
      
      </li>
   `)[0];
      acItem.append(addDiv);
      Array.prototype.slice
        .call(document.getElementsByClassName("index-lists"))
        .forEach((el) => {
          el.append(addLi);
        });
      // addDiv.append(addLi);

      addLi.onclick = () => {
        closeModal();
        interactive(null, null, false, false, false);
        window.top.nav.to(ele.num);
      };
    });
  }
};

const fillIndex = () => {
  index({
    id1: "headingOne",
    id2: "collapseOne",
    arrow: "arrow",
    num: 7,
    title: "شكر وتقدير",
    isUse: false,
    arr: [],
  });
  index({
    id1: "headingTwo",
    id2: "collapseTwo",
    arrow: "arrow",
    num: 8,
    title: "مقدمة إلى أدلة المنهج الوطني",
    isUse: false,
    arr: [],
  });
  index({
    id1: "headingThree",
    id2: "collapseThree",
    arrow: "arrow",
    num: 12,
    title: "القسم الأول: <br>مدخل إلى معيار نهج التعلم",
    isUse: false,
    arr: [],
  });
  index({
    id1: "headingFour",
    id2: "collapseFour",
    arrow: "arrow",
    num: 18,
    title:
      "القسم الثاني: <br>دليل المعلمة في التخطيط وتطبيق الممارسات التربوية الداعمة لمعيار نهج التعلم -دعم معيار نهج التعلم من الولادة وحتى 6 سنوات)",
    isUse: false,
    arr: [],
  });

  index({
    id1: "headingFive",
    id2: "collapseFive",
    arrow: "",
    num: 21,
    title: "فئة الأطفال الرضًّع الصغار (من الميلاد إلى 9أشهر)",
    isUse: false,
    arr: [
      {
        num: 21,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 26,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 32,
        title:
          "الممارسة الثالثة: تطبيق المعلمات المهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 39,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر.",
      },
    ],
  });
  index({
    id1: "headingSix",
    id2: "collapseSix",
    arrow: "",
    num: 42,
    title: "فئة الرضّع الدارجين (من 9إلى 18 شهرا)",
    isUse: false,
    arr: [
      {
        num: 42,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 50,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 54,
        title:
          "الممارسة الثالثة: تطبيق المعلمات المهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 61,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر.",
      },
    ],
  });
  index({
    id1: "headingSeven",
    id2: "collapseSeven",
    arrow: "",
    num: 65,
    title: "فئة الأطفال الفطم (من 15-36 شهرا)",
    isUse: false,
    arr: [
      {
        num: 65,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات لمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 71,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 75,
        title:
          "الممارسة الثالثة: تطبيق المعلمات الممهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 85,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر",
      },
    ],
  });
  index({
    id1: "headingEight",
    id2: "collapseEight",
    arrow: "",
    num: 86,
    title: "فئة أطفال الروضة (3-4) سنوات",
    isUse: false,
    arr: [
      {
        num: 86,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 94,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 98,
        title:
          "الممارسة الثالثة: تطبيق المعلمات الممهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 109,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر",
      },
    ],
  });
  index({
    id1: "headingNine",
    id2: "collapseNine",
    arrow: "",
    num: 105,
    title: "فئة أطفال الروضة (4-6) سنوات",
    isUse: true,
    arr: [
      {
        num: 112,
        title:
          "الممارسة الأولى: وعي المعلمات المهنيات بمبادئ النمو والتطور لدى الطفل، والطريقة التي يمكن من خلالها دعم تعلّمه",
      },
      {
        num: 119,
        title:
          "الممارسة الثانية: توظيف المعلمات المهنيات لمعارفهنّ حول تطور الطفل والبناء على هذه المعارف",
      },
      {
        num: 124,
        title:
          "الممارسة الثالثة: تطبيق المعلمات المهنيات لخبرات التعلم القائمة على الاستقصاء العلمي",
      },
      {
        num: 140,
        title:
          "الممارسة الرابعة: حرص المعلمات المهنيات على التطور المهني والتعلُم المستمر.",
      },
    ],
  });
  index({
    id1: "headingTen",
    id2: "collapseTen",
    arrow: "arrow",
    num: 142,
    title: "المراجع",
    isUse: false,
    arr: [],
  });
};

if (!savedVersion) {
  fillIndex();
} else {
  for (let i = 0; i < btn.length; i++) {
    btn[i].classList.remove("active");
    activateBookMarking(false);
  }
  const accItem = Array.prototype.slice.call(
    document.getElementsByClassName("accordion-header")
  );
  const list = Array.prototype.slice.call(
    document.getElementsByClassName("acc-list")
  );
  accItem.forEach((item, index) => {
    item.onclick = () => {
      const num = item.innerText[0] + item.innerText[1] + item.innerText[2];
      window.top.nav.to(num);
    };
  });
  list.forEach((list, index) => {
    list.onclick = () => {
      const l = list.innerText[0] + list.innerText[1] + list.innerText[2];
      window.top.nav.to(l);
    };
  });
}

const navBar = document.querySelector(".index");
const menuBtns = document.getElementById("index");
const openMenu = () => {
  navBar.classList.add("open");
};
const closeMenu = () => {
  navBar.classList.remove("open");
  // this.style.zIndex = 2;
};

nextBtn.addEventListener("click", () => {
  if (selRange) {
    sel.removeAllRanges();
  }
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
  activateBookMarking(false);
});
backBtn.addEventListener("click", () => {
  if (selRange) {
    sel.removeAllRanges();
  }
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
  activateBookMarking(false);
});

const todo = document.getElementsByClassName("todo")[0];
const students = document.getElementsByClassName("students")[0];

todo.onclick = () => {
  let title = "قائمة المهام";
  let content = "./assets/todo1/index.html";
  interactive(title, content, true, false, false);
};
students.onclick = () => {
  // let title = "قائمة الأطفال";
  // let content = "./assets/students/index.html";
  // interactive(title, content, true, false, false);
};
function interactiveCall(li) {
  let title = "";
  let content = null;
  if (li.className === "video") {
    title = "فيديو تفاعلي";
    content =
      "./assets/interactive/case02/story_content/video_5kMbnTilyUm_18_160_1920x1080.mp4";

    interactive(title, content, true, false, false);
  } else if (li.className === "message") {
    title = "حالة تدريبية";
    content = "./assets/interactive/case02/index.html";
    interactive(title, content, true, false, false);
  } else if (li.className === "teacher-tools") {
    title = "أداة الملاحظة ١٩ - ٢٠";
    content = "./assets/survey";
    interactive(title, content, true, false, false);
  }
}

// setTimeout(() => {
//   const ineractive1 = document
//   .getElementsByClassName("ineractive-1")[0]
//   .querySelectorAll("li");
//   ineractive1.forEach((li) => {
//     li.addEventListener("click", (e) => {
//       interactiveCall(li);
//     });
//     li.addEventListener("touchend", (e) => {
//       interactiveCall(li);
//     });
//   });

// }, 1000);
function handleSearch() {
  hideTools();
  const offcanvas = document.getElementsByClassName("offcanvas")[0];
  const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
  const ul = document.getElementsByClassName("search-elements")[0];
  /*********** li => search resault  ************************* */
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }
  const searchTxt = document.getElementById("search").value;

  const liParent = document.getElementsByTagName("li");
  let arr = [];
  let targetId = "";

  for (let i = 0; i < liParent.length; i++) {
    if (liParent[i].dataset.name) {
      const p = liParent[i].innerText;
      let index = p.indexOf(searchTxt);

      if (searchTxt.length > 0 && index >= 0) {
        targetId = liParent[i].dataset.name;

        const li = $(
          `<li class="search-list" data-bs-dismiss="offcanvas">صفحة ${targetId}</li>`
        );
        ul.append(li[0]);

        arr = [{ id: targetId, li: li[0] }];
        arr.forEach((e) => {
          li[0].onclick = () => {
            closeDiv();
            // setTimeout(() => {

            // }, 100);
            removeSearch(liParent[i], searchTxt, true);
            window.top.nav.to(e.id);
            document.getElementById("search").value = "";
            while (ul.firstChild) {
              ul.removeChild(ul.lastChild);
            }
          };
          removeSearch(liParent[i], "", false);
        });
      }
    }
  }
}
function removeMark() {
  for (let f = 0; f < pVal.length; f++) {
    // console.log(n.dataset.name);
    pVal[f].p.innerHTML = pVal[f].inner;
  }
}

nextBtn.addEventListener("click", () => {
  removeMark();
});
backBtn.addEventListener("click", () => {
  removeMark();
});
nextBtn.addEventListener("touchend", () => {
  removeMark();
});
backBtn.addEventListener("touchend", () => {
  removeMark();
});

let pVal = [];
function removeSearch(n, searchTxt, status) {
  let newP = n.getElementsByTagName("p");
  let newli = n.getElementsByTagName("li");

  for (let j = 0; j < newP.length; j++) {
    newP[j].innerText
      ? pVal.push({
          p: newP[j],
          val: newP[j].innerText,
          inner: newP[j].outerHTML,
        })
      : "";
  }
  for (let l = 0; l < newli.length; l++) {
    pVal.push({
      p: newli[l],
      val: newli[l].innerText,
      inner: newli[l].outerHTML,
    });
  }

  const c = document.getElementsByTagName("html")[0];

  pVal.forEach((e) => {
    if (status) {
      e.p.innerText = e.val;
      if (e.val.indexOf(searchTxt) != -1) {
        let l = searchTxt.length;
        while (l) {
          let word = `<mark style="background:yellow;">${e.val.slice(
            e.val.indexOf(searchTxt),
            e.val.indexOf(searchTxt) + searchTxt.length
          )}</mark>`;
          // console.log(e.inner);
          e.p.innerHTML = e.inner.replaceAll(searchTxt, word);
          l--;
        }
      }
    } else {
      // console.log("h1");
      for (let f = 0; f < pVal.length; f++) {
        // console.log(n.dataset.name);
        pVal[f].p.innerHTML = pVal[f].inner;
      }
      pVal = [];
    }
  });
}

function hideTools() {
  editTools.position = "absolute";
  editTools.style.top = "-100%";
  editTools.style.left = "-100%";
  editTools.style.transform = "scale(0)";
}

// *************** Draw  *******************

var tools = document.getElementById("drawtools");
var drawBtn = document.getElementById("drawbtn");
var allli = document.getElementsByClassName("page");
// var tempLi = getactiveli() + 1;

function colorchang() {
  var ele = document.getElementsByName("co");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      break;
    }
  }

  return ele[i].value;
}

function sizechang() {
  var ele = document.getElementsByName("we");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      break;
    }
  }

  return ele[i].value;
}

function stopDrawOnOthers() {
  const allDrwClases = Array.from(document.getElementsByClassName("canstyle"));
  for (var i = 0; i < allDrwClases.length; i++) {
    // allDrwClases[i].classList.remove("signatureBox");
    // allDrwClases[i].classList.add("nonsignatureBox");
    // allDrwClases[i].style.visibility = "hidden";
    allDrwClases[i].remove();
  }
}

function openDraw() {
  drawBtn.classList.add("active");
  tools.style.visibility = "visible";
  // drawBtn.innerText = "إيقاف الرسم";
  StartDraw();
  draw_badge();
}

document.getElementById("drawbtn").addEventListener("click", function () {
  if (this.classList.contains("active")) {
  } else {
    // StartDraw();
    openDraw();
  }
});

function checkifCanvas(increment) {
  var Cindex = parseInt(currentPage) + increment;
  var theCanvas = document.getElementById("CursorLayer" + Cindex);

  if (theCanvas) return true;
  else return false;
}

function creatNewCanvas(i) {
  if (!localStorage.getItem(`${book_id}_canvas` + i)) {
    var canvas = document.createElement("canvas");
    canvas.id = "CursorLayer" + i;
    canvas.className = "canstyle";
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;
    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;
    return canvas;
  } else {
    return getCanvasFromLocal(i);
  }
}

function getCanvasFromLocal(ind) {
  const dataURL = localStorage.getItem(`${book_id}_canvas` + ind);
  const img = new Image();
  var canvas = document.createElement("canvas");
  canvas.id = "CursorLayer" + ind;
  canvas.className = "canstyle";
  const canvasOffsetX = canvas.offsetLeft;
  const canvasOffsetY = canvas.offsetTop;
  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight - canvasOffsetY;
  const ctx = canvas.getContext("2d");
  canvas.style.visibility = "visible";
  img.src = dataURL;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  return canvas;
}

function setCanvasToLocal(pageNo, canvas) {
  localStorage.setItem(`${book_id}_canvas` + pageNo, canvas.toDataURL());
}
function StartDraw() {
  var increment = 0;
  var ActiveLIs = GetaActliS();
  let isPainting = false;
  let lineWidth = 5;
  let enabledDraw = true;
  var ctx = false;

  var IsCanvas = localStorage.getItem(`${book_id}_canvas` + currentPage);
  // get active pages 1 or tow views ?
  ActiveLIs.forEach((l) => {
    l.classList.add("cursor-pen");
  });

  for (let i = 0; i < ActiveLIs.length; i++) {
    increment = parseInt(currentPage) + i;
    var newCanvas = creatNewCanvas(increment);
    ActiveLIs[i].appendChild(newCanvas);
    newCanvas.style.visibility = "visible";

    var ctx = document
      .getElementById("CursorLayer" + increment)
      .getContext("2d");
    ctx = document.getElementById("CursorLayer" + increment).getContext("2d");
    drawIt(newCanvas, isPainting, lineWidth, enabledDraw, ctx, increment);
  }
}

function drawIt(canvas, isPainting, lineWidth, enabledDraw, ctx, pageNo) {
  // console.log(pageNo);
  const draw = (e) => {
    if (!isPainting) {
      return;
    }
    if (sizechang() == "normal") {
      ctx.lineWidth = 5;
    }
    if (sizechang() == "xl") {
      ctx.lineWidth = 10;
    }
    if (sizechang() == "xxl") {
      ctx.lineWidth = 15;
    }
    ctx.lineCap = "round";
  };
  // ******************************************************************
  canvas.addEventListener("mousedown", (e) => {
    if (enabledDraw) {
      isPainting = true;
    }
  });
  canvas.addEventListener("touchstart", (e) => {
    if (enabledDraw) {
      isPainting = true;
    }
  });
  // ******************************************************************

  canvas.addEventListener("mouseup", (e) => {
    isPainting = false;
    setCanvasToLocal(pageNo, canvas);
    ctx.stroke();
    ctx.beginPath();
  });

  canvas.addEventListener("touchend", (e) => {
    isPainting = false;
    setCanvasToLocal(pageNo, canvas);
    ctx.stroke();
    ctx.beginPath();
  });
  // ******************************************************************

  $("#clearbtn").click(function () {
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    let i = parseInt(currentPage) + 1;
    if (currentPage == 1) {
      localStorage.removeItem(`${book_id}_canvas` + currentPage);
      draw_badge();
    } else {
      localStorage.removeItem(`${book_id}_canvas` + currentPage);
      localStorage.removeItem(`${book_id}_canvas` + i);
      draw_badge();
    }
  });

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("mousemove", (e) => {
    if (isPainting) {
      ctx.lineTo(
        e.pageX - canvas.getBoundingClientRect().left,
        e.pageY - canvas.getBoundingClientRect().top
      );
      ctx.strokeStyle = colorchang();
      ctx.stroke();
    }
  });
  canvas.addEventListener("touchmove", (e) => {
    if (isPainting) {
      e.preventDefault();
      var touch = e.touches[0];
      var clientX = touch.clientX;
      var clientY = touch.clientY;
      var rect = canvas.getBoundingClientRect();
      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.strokeStyle = colorchang();
      ctx.stroke();
    }
  });
}

function GetaActliS() {
  const liComponents = Array.prototype.slice.call(
    document.getElementsByClassName("activePage")
  );
  // console.log(liComponents[0]);
  //  liComponents.forEach((c) => {
  currentPage = liComponents[0].getAttribute("data-name");
  // console.log("current page is:  " + currentPage);

  // });
  return liComponents;
}

const fc1 = document.getElementsByClassName("fc-1")[0];
const fc2 = document.getElementsByClassName("fc-2")[0];
const fc3 = document.getElementsByClassName("fc-3")[0];
const fw1 = document.getElementsByClassName("fw-1")[0];
const fw2 = document.getElementsByClassName("fw-2")[0];
const fw3 = document.getElementsByClassName("fw-3")[0];

// window.jsPDF = window.jspdf.jsPDF;

function setLocal() {
  // alert('selected2');

  //    let comments = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

  //     localStorage.setItem("comment2",JSON.stringify(comments));

  var selected1 = JSON.parse(
    window.localStorage.getItem(`${book_id}_comments`)
  );
  var selected2 = JSON.parse(
    window.localStorage.getItem(`${book_id}_bookingPages`)
  );

  generatePDF(selected1, selected2);

  // var selected2=localStorage.getItem("comment2");
  // alert(selected2);
}

// SCRIPT FOR NEW INDEX

var mbtn = document.getElementsByClassName("menu-toggler");
var overlay = document.getElementsByClassName("moverlay");
var menu1 = document.getElementsByClassName("menu");

var menu_items = Array.prototype.slice.call(
  document.getElementsByClassName("menu-item")
);
var fa_items = Array.prototype.slice.call(
  document.getElementsByClassName("fa")
);

// listen to menu items clicks
menu_items.forEach((item, i) => {
  item.addEventListener("click", () => {
    getmenuItem(i);
  });
});

// show the menu items and styles motion
function menu() {
  if (mbtn[0].checked) {
    mbtn[0].checked = false;
    overlay[0].style.visibility = "hidden";
    menu1[0].style.visibility = "hidden";

    menu_items.forEach((element, i) => {
      // console.log(("first" + i));
      var f = document.getElementById("first" + i);
      if (f != null) {
        f.classList.remove("filled-sub-item");
        // console.log(f);
      }
    });
  } else {
    mbtn[0].checked = true;
    overlay[0].style.visibility = "visible";
    menu1[0].style.visibility = "visible";
  }
}

function sub_menu() {
  menu_items.forEach((element, i) => {
    // console.log(("first" + i));
    var f = document.getElementById("first" + i);
    if (f != null) {
      f.classList.remove("filled-sub-item");
      // console.log(f);
    }
  });
}

// click on each li ( menu item)

function getmenuItem(i) {
  menu_items.forEach((element, i) => {
    // console.log(("first" + i));
    var f = document.getElementById("first" + i);
    if (f != null) {
      f.classList.remove("filled-sub-item");
      // console.log(f);
    }
    if (element.classList.contains("mactive"))
      element.classList.remove("mactive");
  });
  menu_items[i].classList.add("mactive");
  document.getElementById("first" + i).classList.add("filled-sub-item");
}

function go8(i) {
  window.top.nav.to(i);
}

// ************** new index **************

function openIndexModal() {
  document.getElementById("index-dialog").classList.remove("move");

  $("#index-modal").modal("show");
  document.getElementById("index-dialog").classList.add("move");
}

const closeindexModal = () => {
  $("#index-modal").modal("hide");
};
