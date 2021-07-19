var field = document.querySelector('#today');
var date = new Date();
field.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
document.querySelector('#today').setAttribute("max",`${field.value}`);
var datas;
 fetch(`https://api.exchangerate.host/latest`, {
  method: "GET"
})
  .then((data) => {
    return data.json();
  })

  .then((data)=> 
  {
    datas = data;
  const value = data.rates;
  const display = (Object.entries(value));
display.forEach((data)=>{
  var newentry = document.createElement("option");
  newentry.setAttribute("value",`${data[0]}`);
  newentry.innerText = `${data[0]}`;
  document.getElementById("choice").append(newentry);
});
display.forEach((data)=>{
  var covertfrom = document.createElement("option");
  covertfrom.setAttribute("value",`${data[0]}`);
  covertfrom.innerText = `${data[0]}`;
  document.getElementById("covertfrom").append(covertfrom);
});
display.forEach((data)=>{
  var covertto = document.createElement("option");
  covertto.setAttribute("value",`${data[0]}`);
  covertto.innerText = `${data[0]}`;
  document.getElementById("covertto").append(covertto);
});
})
var temp = +1;
function getvalue()
{
var currency_selected = document.getElementById("choice").value;
if (temp===1 && currency_selected != "Select Currency")
{
var newvalue = document.createElement("div");
newvalue.className = "newvalue";
newvalue.id = "update"
var currency_rates = datas.rates;
var currency_value = (currency_rates[currency_selected]); 
newvalue.innerHTML =`<p class="displayvalue"> 1 EUR is ${currency_value} ${currency_selected}</p>`;
document.querySelector(".wrapper").append(newvalue);
temp+=1;
}
else if (currency_selected != "Select Currency")
{
document.getElementById("update").remove();
var newvalue = document.createElement("div");
newvalue.className = "newvalue";
newvalue.id = "update";
var currency_rates = datas.rates;
var currency_value = (currency_rates[currency_selected]); 
newvalue.innerHTML =`<p class="displayvalue"> 1 EUR is ${currency_value} ${currency_selected}</p>`;
document.querySelector(".wrapper").append(newvalue);
}
else 
{
  alert("Select a Currency Value");
}
}
var temp1= +1;
function datedata()
{
var request_date = document.querySelector('#today').value;
fetch(`https://api.exchangerate.host/${request_date}`, {
  method: "GET"
})
  .then((data) => {
    return data.json();
  })
  .then((data)=> 
  {
var currency_selected = document.getElementById("choice").value;
if (temp1===1 && currency_selected != "Select Currency")
{
var datevalue = document.createElement("div");
datevalue.className = "datevalue";
datevalue.id = "updatedatevalue";
var currency_rates = data.rates;
var currency_value = (currency_rates[currency_selected]); 
datevalue.innerHTML =`<p class="datevalue"> 1 EUR is ${currency_value} ${currency_selected}</p>`;
document.querySelector(".datedata").append(datevalue);
temp1+=1;
}
else if (currency_selected != "Select Currency")
{
  document.getElementById("updatedatevalue").remove();
  var datevalue = document.createElement("div");
  datevalue.className = "datevalue";
  datevalue.id = "updatedatevalue";
  var currency_rates = data.rates;
  var currency_value = (currency_rates[currency_selected]); 
  datevalue.innerHTML =`<p class="datevalue"> 1 EUR is ${currency_value} ${currency_selected}</p>`;
  document.querySelector(".datedata").append(datevalue);
}
});
}
var temp2 = +1;
function coversionrate()
{
  var convertfrom = document.getElementById("covertto").value;
  var convertto = document.getElementById("covertfrom").value;
  if (convertfrom != "Select Currency" && convertto != "Select Currency")
  {
  fetch(`https://api.exchangerate.host/convert?from=${convertfrom}&to=${convertto}`, {
  method: "GET"
})
  .then((data) => {
    return data.json();
  })
  .then((data)=> 
  {
  if (temp2===1)
  {
  var conversion_rate = document.createElement("div");
  conversion_rate.className = "conversion_rate";
  conversion_rate.id = "conversion_rate";
  conversion_rate.innerHTML =`<p class="conversion_rate"> Conversion as on date: ${data.result} </p>`;
  document.querySelector(".conversiondata").append(conversion_rate);
  temp2+=1;
  }
  else
  {
    document.getElementById("conversion_rate").remove();
    var conversion_rate = document.createElement("div");
    conversion_rate.className = "conversion_rate";
    conversion_rate.id = "conversion_rate";
    conversion_rate.innerHTML =`<p class="conversion_rate"> Conversion as on date: ${data.result} </p>`;
    document.querySelector(".conversiondata").append(conversion_rate);
  }
});
}
else
{
  alert("Select a Currency Value for conversion");
}
}
