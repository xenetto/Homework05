document.getElementById("date").innerHTML=  `${moment().format("dddd, MMMM Do ")}`;   //insert current date at the header of the page

pageLoad();       //start point

function pageLoad(){
    setColor();   //make current hour red, last hours light gray, next hours green

    var workListArr = fetchFromLocalStorage(moment().format("YYYY-MM-DD"));  //fetched array from local storage

//showing array info(saved work list) in related text boxes
    document.getElementById('txt_9').value = workListArr[6].split("|")[1]; 
    document.getElementById('txt_10').value = workListArr[7].split("|")[1];
    document.getElementById('txt_11').value = workListArr[8].split("|")[1];
    document.getElementById('txt_0').value = workListArr[0].split("|")[1];
    document.getElementById('txt_1').value = workListArr[1].split("|")[1];
    document.getElementById('txt_2').value = workListArr[2].split("|")[1];
    document.getElementById('txt_3').value = workListArr[3].split("|")[1];
    document.getElementById('txt_4').value = workListArr[4].split("|")[1];
    document.getElementById('txt_5').value = workListArr[5].split("|")[1];

//defining click event of save buttons
    document.getElementById('btn_9').addEventListener('click',saveBtn);
    document.getElementById('btn_10').addEventListener('click',saveBtn);
    document.getElementById('btn_11').addEventListener('click',saveBtn);
    document.getElementById('btn_0').addEventListener('click',saveBtn);
    document.getElementById('btn_1').addEventListener('click',saveBtn);
    document.getElementById('btn_2').addEventListener('click',saveBtn);
    document.getElementById('btn_3').addEventListener('click',saveBtn);
    document.getElementById('btn_4').addEventListener('click',saveBtn);
    document.getElementById('btn_5').addEventListener('click',saveBtn);
}

//saving entered work list
function saveBtn(event){
    addToLocalStorage( moment().format("YYYY-MM-DD"),  (event.currentTarget.id).substring(4), document.getElementById(`txt_${(event.currentTarget.id).substring(4)}`).value );
}

//adding entered work list to local storage
function addToLocalStorage(name, key, value) {

    var existing = localStorage.getItem(name);   // Get the existing data

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : { "9": "", "10": "", "11": "", "0": "", "1": "", "2": "", "3": "", "4": "", "5": "" };

    existing[key] = value;     // Add new data to localStorage Array
    
    localStorage.setItem(name, JSON.stringify(existing));    // Save back to localStorage
}

//fetching entered work list from local storage
function fetchFromLocalStorage(name, key = "") {
    
    var existing = localStorage.getItem(name);   // Get the existing data

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : { "9": "", "10": "", "11": "", "0": "", "1": "", "2": "", "3": "", "4": "", "5": "" };

    let myArrList = [];

    for (key in existing) {
        var infoJSON = existing[key];
        myArrList.push(key + "|" + infoJSON);
    }
    return myArrList;
}

//setting each row color according to current hour
function setColor(){
    var hour = moment().format("h");   
    var AMPM = moment().format("A");

//between 9AM to 5PM
    if((hour>=9 && hour<12 && AMPM=="AM") || ((hour ==12 || hour>=1 && hour<=5) && AMPM=="PM")){
        document.getElementById(`txt_${moment().format("h")%12}`).style.backgroundColor="red";
        for(i=9; i<moment().format("H");i++){
            document.getElementById(`txt_${i%12}`).style.backgroundColor="lightgray";
            document.getElementById(`txt_${i%12}`).readOnly=true;
            document.getElementById(`btn_${i%12}`).disabled=true;
        }
        
        for(i=Number(moment().format("H"))+1; i<=17; i++){
            document.getElementById(`txt_${i%12}`).style.backgroundColor="green";
        }

    }
//before 9AM and after 5PM    
    else{
        var x;
        x = document.querySelectorAll(".textBx");
        for (i = 0; i < x.length; i++) {
          x[i].style.backgroundColor = "lightgray";
          x[i].readOnly= true;
          document.getElementById(`btn_${x[i].id.substring(4)}`).disabled=true;
        }
    }
}
