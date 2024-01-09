const chevIMG = document.createElement("img");
var loc = document.querySelector("#loc");
var time = document.querySelector("#time");
var date = document.querySelector("#date");
var tzSearch = document.querySelector("#tzSearch");
var chngLocButton = document.querySelector("#changeLocButton");
var applyButton = document.querySelector("#apply");
var btnSelect = document.querySelector(".btn-select");
var btnClose = document.querySelector(".modal__close");
var tz = document.querySelector(".timezone");
var list = document.querySelector(".list");
var tzChosen = "";
var tzApplied = "";
var allPara = [];
var flag = 1; // flag value: 1 (off) , value: 0 (on)

// dayjs.extend(dayjs_plugin_utc);
// dayjs.extend(dayjs_plugin_timezone);

function startTime() {
  loc.textContent = tzApplied === "" ? dayjs.tz.guess() : tzApplied;
  time.textContent =
    tzApplied === ""
      ? dayjs().format("HH:mm:ss")
      : dayjs().tz(tzApplied).format("HH:mm:ss");
  date.textContent =
    tzApplied === ""
      ? dayjs().format("dddd, DD MMMM YYYY")
      : dayjs().tz(tzApplied).format("dddd, DD MMMM YYYY");
  setTimeout(startTime, 1000);
}

startTime();

Intl.supportedValuesOf("timeZone").forEach(function (e) {
  const para = document.createElement("p");
  para.innerText = e;
  list.appendChild(para);
  para.addEventListener("click", function () {
    btnSelect.textContent = e;
    tzChosen = e;
    chevIMG.src = "./assets/images/chevron-down.svg";
    btnSelect.appendChild(chevIMG);
    tz.style.display = "none";
    flag = 1;
  });
  allPara.push(para);
});

tzSearch.addEventListener("input", function () {
  if (tzSearch.value === "") {
    for (let i = 0; i < allPara.length; i++) {
      allPara[i].style.display = "none";
    }
    for (let i = 0; i < allPara.length; i++) {
      allPara[i].style.display = "block";
      allPara[i].style.marginTop = "-10px";
    }
    allPara[0].style.marginTop = "10px";
  } else {
    for (let i = 0; i < allPara.length; i++) {
      allPara[i].style.display =
        allPara[i].innerText === tzSearch.value ||
        allPara[i].innerText.toLowerCase() === tzSearch.value.toLowerCase() ||
        allPara[i].innerText.toUpperCase() === tzSearch.value.toUpperCase()
          ? "block"
          : "none";
      allPara[i].style.marginTop =
        allPara[i].innerText === tzSearch.value ||
        allPara[i].innerText.toLowerCase() === tzSearch.value.toLowerCase() ||
        allPara[i].innerText.toUpperCase() === tzSearch.value.toUpperCase()
          ? "10px"
          : "0px";
    }
  }
});

chngLocButton.addEventListener("click", function () {
  MicroModal.show("modal-1");
});

applyButton.addEventListener("click", function () {
  tzApplied = tzChosen;
  console.log(tzApplied);
  console.log(dayjs(dayjs.tz(dayjs().format(), tzApplied)).format("HH:mm:ss"));
  MicroModal.close("modal-1");
  btnSelect.textContent = "SELECT TIMEZONE";
  chevIMG.src = "./assets/images/chevron-down.svg";
  btnSelect.appendChild(chevIMG);
  tz.style.display = "none";
  flag = 1;
});

btnClose.addEventListener("click", function () {
  tz.scrollTo(0, 0);
  MicroModal.close("modal-1");
  btnSelect.textContent = "SELECT TIMEZONE";
  chevIMG.src = "./assets/images/chevron-down.svg";
  btnSelect.appendChild(chevIMG);
  tz.style.display = "none";
  flag = 1;
});

btnSelect.addEventListener("click", function () {
  if (flag === 1) {
    tz.style.display = "block";
    flag = 0;
  } else {
    tz.style.display = "none";
    flag = 1;
  }
});
