var input = null;
function getdata()
{
input = document.getElementById("num").value;
 fetch(`https://api-thirukkural.vercel.app/api?num=${input}`, {
  method: "GET"
})
  .then((data) => {
    return data.json();
  })
  .then((data)=> loaddata(data))
  .catch((data) =>
  {
const containers = document.createElement("div");
containers.className = "containers";
  const datadisplayy = document.createElement("div");
  datadisplayy.className = "datadisplay";
  datadisplayy.innerText = "Please Enter Between 1-1330";
  containers.append(datadisplayy);
  document.querySelector(".wrapper").append(containers);
  alert("Error Catched");
})
}
const containers = document.createElement("div");
containers.className = "containers";
function loaddata(data) {
  const datadisplay = document.createElement("div");
  datadisplay.className = "datadisplay";
    datadisplay.innerHTML = `   
    <div>
      <h2 class="kural"> குறள்: <br>${data.line1} <br> ${data.line2} </h2>
      </div>
      <div>
      <p class="tamilexplanation">பொருள்: <br>${data.tam_exp}</p>
      <p class="englishexplanation">English Explanation: <br> ${data.eng_exp}</p>      
    </div>`;
  containers.append(datadisplay);
}
document.querySelector(".wrapper").append(containers);
function newdata()
{
  if (input==null)
  {
  getdata();
  }
  else{
document.querySelector(".datadisplay").remove();
getdata();
  }
}
