const chevIMG = document.createElement("img");
var loc = document.querySelector("#loc");
var time = document.querySelector("#time");
var date = document.querySelector("#date");
// var tzSearch = document.querySelector("#tzSearch");
var chngLocButton = document.querySelector("#changeLocButton");
var applyButton = document.querySelector("#apply");
var btnSelect = document.querySelector(".btn-select");
var btnClose = document.querySelector(".modal__close");
var tz = document.querySelector(".timezone");
var list = document.querySelector(".list");
var tzChosen = "";
var tzApplied = "";
var flag = 1;

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

function startTime() {
  loc.textContent = tzApplied === "" ? dayjs.tz.guess() : tzApplied;
  time.textContent =
    tzApplied === ""
      ? dayjs().format("HH:mm:ss")
      : dayjs(dayjs.tz(dayjs().format(), tzApplied)).format("HH:mm:ss");
  date.textContent =
    tzApplied === ""
      ? dayjs().format("dddd, DD MMMM,YYYY")
      : dayjs(dayjs.tz(dayjs().format(), tzApplied)).format(
          "dddd, DD MMMM,YYYY"
        );
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
});

chngLocButton.addEventListener("click", function () {
  MicroModal.show("modal-1");
});

applyButton.addEventListener("click", function () {
  tzApplied = tzChosen;
  MicroModal.close("modal-1");
  btnSelect.textContent = "SELECT TIMEZONE";
  chevIMG.src = "./assets/images/chevron-down.svg";
  btnSelect.appendChild(chevIMG);
  tz.style.display = "none";
  flag = 1;
});

btnClose.addEventListener("click", function () {
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
