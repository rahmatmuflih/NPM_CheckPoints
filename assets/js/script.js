const chevIMG = document.createElement("img");
var loc = document.querySelector("#loc");
var time = document.querySelector("#time");
var date = document.querySelector("#date");
var chngLocButton = document.querySelector("#changeLocButton");
var applyButton = document.querySelector("#apply");
var tzSearch = document.querySelector("#tzSearch");
var clock = document.querySelector(".clock");
var loadingContainer = document.querySelector(".loading-container");
var btnSelect = document.querySelector(".btn-select");
var btnClose = document.querySelector(".modal__close");
var tz = document.querySelector(".timezone");
var list = document.querySelector(".list");
var tzChosen = "";
var tzApplied = "";
var allPara = [];
var flag = 1; // flag value: 1 (off) , value: 0 (on)

dayjs.extend(dayjs_plugin_customParseFormat);
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

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

function showTime() {
  if ((loc && time && date) === undefined) {
    loadingContainer.style.display = "flex";
    clock.style.display = "none";
  } else {
    loadingContainer.style.display = "none";
    clock.style.display = "block";
    startTime();
  }
}

function Close() {
  tz.scrollTo(0, 0);
  MicroModal.close("modal-1");
  tzSearch.value = "";
  allPara.forEach(function (element) {
    element.style.display = "none";
  });
  allPara.forEach(function (element) {
    element.style.display = "block";
  });
  btnSelect.textContent = "SELECT TIMEZONE";
  chevIMG.src = "./assets/images/chevron-down.svg";
  btnSelect.appendChild(chevIMG);
  tz.style.display = "none";
  flag = 1;
}

showTime();

Intl.supportedValuesOf("timeZone").forEach(function (e) {
  const para = document.createElement("p");
  para.innerText = e;
  list.appendChild(para);
  para.addEventListener("click", function () {
    tz.scrollTo(0, 0);
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
  allPara.forEach(function (element) {
    element.style.display =
      tzSearch.value.toLowerCase() ===
      element.innerText.slice(0, tzSearch.value.length).toLowerCase()
        ? "block"
        : "none";
  });
});

chngLocButton.addEventListener("click", function () {
  MicroModal.show("modal-1");
});

applyButton.addEventListener("click", function () {
  tzApplied = tzChosen;
  Close();
});

btnClose.addEventListener("click", Close);

btnSelect.addEventListener("click", function () {
  if (flag === 1) {
    tz.style.display = "block";
    flag = 0;
  } else {
    tz.style.display = "none";
    flag = 1;
  }
});
