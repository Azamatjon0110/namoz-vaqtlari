
const region  = document.querySelector(".region");
const weekDay = document.querySelector(".week-day");
const elForm = document.querySelector(".js-form");
const elSelect = document.querySelector(".js-input-region");

const dayBtn = document.querySelector(".btn-day");
const weekBtn = document.querySelector(".btn-week");
const monthBtn = document.querySelector(".btn-month");

const timeList = document.querySelector(".time-list");
const timeTable = document.querySelector(".js-table");
const tableBody = document.querySelector(".table-body");
const listTemp = document.querySelector(".time-prayer").content;
const tableTemp = document.querySelector(".table-temp").content;
const newFrag = new DocumentFragment();

function timeTempList(arr,node){
  node.innerHTML = "";
  arr.forEach(item => {
    const temp = listTemp.cloneNode(true);
    temp.querySelector(".date").textContent = item.date.split(",")[0].split("-").reverse().join("/");
    temp.querySelector(".bomdod-time").textContent = item.times.tong_saharlik;
    temp.querySelector(".sun-rise").textContent = item.times.quyosh;
    temp.querySelector(".peshin-time").textContent = item.times.peshin;
    temp.querySelector(".asr-time").textContent = item.times.asr;
    temp.querySelector(".shom-time").textContent = item.times.shom_iftor;
    temp.querySelector(".hufton-time").textContent = item.times.hufton;
    newFrag.appendChild(temp)
  })
  node.appendChild(newFrag);
};


function timeTempListMonth(arr,node){
  node.innerHTML = "";
  arr.forEach(item => {
    const temp = tableTemp.cloneNode(true);
    // temp.querySelector(".date").textContent = item.date.split(",")[0].split("-").reverse().join("/");
    temp.querySelector(".xafta-kuni").textContent = item.weekday;
    temp.querySelector(".bomdod-oylik").textContent = item.times.tong_saharlik;
    temp.querySelector(".quyosh-chiqishi-oylik").textContent = item.times.quyosh;
    temp.querySelector(".peshin-oylik").textContent = item.times.peshin;
    temp.querySelector(".asr-oylik").textContent = item.times.asr;
    temp.querySelector(".shom-oylik").textContent = item.times.shom_iftor;
    temp.querySelector(".xufton-oylik").textContent = item.times.hufton;
    temp.querySelector(".oy-sanasi").textContent = item.date.split("T")[0].split("-").reverse().join("/");
    newFrag.appendChild(temp)
  })
  node.appendChild(newFrag);
};

async function timePrayer(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    timeTempList(data, timeList)
  } catch (error) {
    console.log(error);
  }
}

async function timePrayerMonth(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    timeTempListMonth(data, tableBody)
  } catch (error) {
    console.log(error);
  }
}

async function timePrayerDay(url){
  try {
    const res = await fetch(url);
    const data = await res.json();
    const dataArr = [data]
    console.log(data.date.split("-").reverse().join("/"));
    weekDay.textContent = data.weekday;
    timeTempList(dataArr, timeList);
  } catch (error) {
    console.log(error);
  }
}

timePrayerDay(`https://islomapi.uz/api/present/day?region=${elSelect.value}`);

dayBtn.addEventListener("click", () => {
  const dailyTime = region.textContent;
  timeTable.classList.add("d-none");
  timeTable.classList.remove("d-block")
  timePrayerDay(`https://islomapi.uz/api/present/day?region=${dailyTime}`);
})

weekBtn.addEventListener("click", () => {
  timeTable.classList.add("d-none");
  timeTable.classList.remove("d-block");
  timeList.classList.remove("d-none");
  timeList.classList.add("d-block");
  const dailyTime = region.textContent;
  timePrayer(`https://islomapi.uz/api/present/week?region=${dailyTime}`);
})

monthBtn.addEventListener("click", () => {
  timeTable.classList.remove("d-none");
  timeTable.classList.add("d-block");
  timeList.classList.remove("d-block");
  timeList.classList.add("d-none");
  const dailyTime = region.textContent;
  const date = new Date();
  console.log(date.getUTCMonth());
  timePrayerMonth(`https://islomapi.uz/api/monthly?region=${dailyTime}&month=11`);
})


elSelect.addEventListener("click", (evt) => {
  evt.preventDefault();
  const dailyTime = elSelect.value;
  region.textContent = elSelect.value;

  timePrayerDay(`https://islomapi.uz/api/present/day?region=${dailyTime}`);
})