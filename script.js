var btn = document.querySelector("button");
var price = document.querySelector("#price");
// input with name currency will pass in the value in the array called option
var option = document.querySelectorAll("input[name='currency']");
var checkbox = document.querySelector("input[type='checkbox']");
var timer = document.querySelector("#timer");
var currency;



function setup() {
    var xhr =  new XMLHttpRequest();
    currency = document.querySelector('input[name = "currency"]:checked').value
    xhr.onreadystatechange = ()=>{
        if(xhr.status == 200 && xhr.readyState == 4){
                    // parse the json data into object, retrieve it
                    var data = JSON.parse(xhr.responseText).bpi[currency].rate;
                    // convert the data from string to float(number) , remove the comma in the data, and round to 2 decimal
                    var numberedData = parseFloat(data.replace(/,/g,"")).toFixed(2);
                    // convert back the data into string, and add back comma as thousand seperator
                    var finalData = numberedData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    console.log(data);
                    price.innerText = finalData + " " + currency;
        }
    }
    xhr.open("GET","https://api.coindesk.com/v1/bpi/currentprice.json");
    xhr.send();
}

function autoRefresh (){
    var delay = 3;
    var countDown = setInterval(()=>{
        if(checkbox.checked){
            if (delay === 0) {
                setup();
                clearTimeout(countDown);
                timer.innerText = "";
                autoRefresh();
            } else {
               timer.textContent =  delay--;
            }
        }  else {
            clearTimeout(countDown);
            timer.innerText="";
        }
    },1000);
}

option.forEach((el)=>{
    el.addEventListener("click", setup);
});

checkbox.addEventListener("click", ()=>{
	if(checkbox.checked == true){
		autoRefresh();
	}
})

window.onload = setup();
autoRefresh();