var temp = 1;
async function newdata()
{
const input = document.getElementById("search").value;
const input1 = document.getElementById("page").value;
try {
  const data = await
fetch(`https://api.jikan.moe/v3/search/anime?q=${input}&page=${input1}`)
const load = await data.json()
onload(load)
Pageload()
} catch (error) {
  console.log(error);
  alert("Try With Valid Anime Name and Page")
}

function onload(data)
{
  const send = Array.from(data.results);
  window.localStorage.setItem('reuse', JSON.stringify(send));
  if (temp==1)
  {
  display(1);
  temp+=1;
  }
  else{
    getvalue();
  }
}
}
function Pageload()
{
element = document.querySelector(".pagination ul");
totalpage = 10;
let page = 1;
element.innerHTML = createPagination(totalpage, page);
}
function createPagination(totalpages, page){
  let litag = '';
  let active;
  let beforepage = page-1;
  let afterpage = page+1;
  if (page>1)
  {
    litag += `<li class="btn prev" onclick="createPagination(totalpage, ${page-1}); getvalue()"><span><i class="fas fa-angle-left"></i>Prev</span></li>`;
  }
  if (page>2)
  {
    litag += `<li class="dots"><span>...</span></li>`;
  }

if (page == totalpages)
{
  beforepage = beforepage -2;
}
else if (page == totalpages -1)
{
  beforepage = beforepage -1;
}
if (page == 1){
  afterpage = afterpage + 2;
}
else if (page == 2){
  afterpage = afterpage + 1;
}

for (var plength = beforepage; plength <= afterpage; plength++)
{
  if (plength > totalpages)
  {
    continue;
  }
  if (plength == 0){
    plength = plength + 1;
  }
  if (page == plength){
    active = "active";
  } else{
    active = "";
  }
  litag += `<li class="numb ${active}" onclick="createPagination(totalpage, ${plength}); getvalue()"><span id="numb ${active}">${plength}</span></li>`
}

if (page<totalpages-1)
{
  if (page<totalpages-2)
  {
    litag += `<li class="dots"><span>...</span></li>`
  }
  litag += `<li class="last numb" onclick="createPagination(totalpage, ${totalpages}); getvalue()"><span>${totalpages}</span></li>`
}

if (page < totalpages){
  litag += `<li class="btn next" onclick="createPagination(totalpage, ${page+1}); getvalue()"><span>Next<i class="fas fa-angle-right"</i></span></li>`
}
element.innerHTML = litag;
return litag;
}
function getvalue()
{
const enable = document.getElementById("numb active").innerText;
changedisplay(enable)
}

function changedisplay(enable)
{
  for (var i =1; i<=5; i++)
  {
  document.querySelector("#data").remove();
  }
  display(enable);
}

function display(num)
{
var data = JSON.parse(window.localStorage.getItem('reuse'));
let limit = num*5;
let start = limit - +4;
for (var i=start; i<=limit; i++)
{
let startdate = new Date(data[i-1].start_date).toLocaleDateString();
let enddate = new Date(data[i-1].end_date).toLocaleDateString();
const element = document.createElement("div")
element.id = "data";
element.innerHTML = `<p id="title"> ${data[i-1].title}</p>
<img src = "${data[i-1].image_url}" id="img" alt="Oops">
<p id="date"> ${startdate} --- ${enddate}</p>
<p id="type"> ${data[i-1].type}---${data[i-1].score}</p>`;
document.querySelector(".display").append(element);
}
}
