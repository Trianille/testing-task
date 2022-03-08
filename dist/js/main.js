const dateDom = document.querySelector('.date');

const dateNow = new Date().toISOString().slice(0, 10);//берем текущую дату и приводим в формат как в задании
const regCurrentDate = /(\d+)\-(\d+)\-(\d+)/;
const dateNow2 = dateNow.replace(regCurrentDate, '$3.$2.$1')

const date = '15.12.2021';//'01.01.2022' это пример даты

const options = {
	weekday: 'long',
	month: 'long',
	year: "numeric",
};

const reg = /(\d+)\.(\d+)\.(\d+)/;
const date2 = dateNow2.replace(reg, '$2.$1.$3');//меняем месяц и день местами (честно, не могу сразу сказать почему, js интерпетиркет их в другом порядке)

const dateProp = new Date(date2);

function getWeekOfMonth (date) {
	let day = date.getDay()
	let dayOfWeek = day > 0 ? (day - 1) : 6;//меняем порядок дней в неделе (изначально воскресенье - 0, нужен понедельник)
	let adjustedDate = date.getDate()+ dayOfWeek;
	let prefixes = ['0', '1', '2', '3', '4', '5'];//num of week
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}

function getDayInfo (date) {
	let week = getWeekOfMonth(dateProp);
	let ans = date.toLocaleDateString('ru-RU', options) + ' ' + week;//локализуем строку даты и приписываем номер недели

	let ansU = ans.split(" ").map((word) => { 
		return word[0].toUpperCase() + word.substring(1); 
	}).join(" ");//каждое слово с большой буквы
	
	let reg = /([А-ЯЁа-яё]+)\s(\d+)\s(Г.)\s([А-ЯЁа-яё]+)\s(\d)/;
	let reg2 = /([ьй]а)\s/;
	let mod = ansU.replace(reg, '$4, $5 неделя $1а $2 года').replace(reg2, 'я ');//приводим сначала к нужному виду, потом меняем падеж у месяца
	
	return mod
}

dateDom.innerText = getDayInfo(dateProp);

/////////////////////////////////////////////////////

const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
  return document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden")
  } else {
    backToTopButton.classList.add("hidden")
  }
})

const goToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
};

backToTopButton.addEventListener("click", goToTop);