let records = JSON.parse(localStorage.getItem("records")) || [];
let currentRecord = null;

const outTime = document.getElementById("outTime");
const inTime = document.getElementById("inTime");

const calcBtn = document.getElementById("calc");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");

const duration = document.getElementById("duration");
const total = document.getElementById("total");
const tableBody = document.getElementById("tableBody");

function timeToMinutes(time){

    let t = time.split(":");

    return Number(t[0]) * 60 + Number(t[1]);

}

function formatTime(minutes){

    let h = Math.floor(minutes / 60);

    let m = minutes % 60;

    return String(h).padStart(2,"0") + ":" + String(m).padStart(2,"0");

}

function calculate(){

    if(outTime.value=="" || inTime.value==""){

        alert("أدخل الوقتين");

        return;

    }

    let diff = timeToMinutes(inTime.value) - timeToMinutes(outTime.value);

    if(diff < 0){

        diff += 24 * 60;

    }

    duration.innerHTML = formatTime(diff);

    currentRecord = {

        date:new Date().toLocaleDateString("ar-EG"),

        out:outTime.value,

        inn:inTime.value,

        minutes:diff

    };

}

calcBtn.onclick = calculate;
function saveData(){

    if(currentRecord==null){

        alert("احسب الوقت أولاً");

        return;

    }

    records.push(currentRecord);

    localStorage.setItem("records",JSON.stringify(records));

    currentRecord=null;

    duration.innerHTML="00:00";

    outTime.value="";
    inTime.value="";

    drawTable();

}

saveBtn.onclick=saveData;

function drawTable(){

    tableBody.innerHTML="";

    let totalMinutes=0;

    records.forEach((item,index)=>{

        totalMinutes+=item.minutes;

        tableBody.innerHTML+=`

        <tr>

            <td>${item.date}</td>

            <td>${format12Hour(item.out)}</td>
            <td>${format12Hour(item.inn)}</td>

            <td>${formatTime(item.minutes)}</td>

            <td>

                <button onclick="deleteRecord(${index})">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

    total.innerHTML=formatTime(totalMinutes);

}
function deleteRecord(index){

    records.splice(index,1);

    localStorage.setItem("records",JSON.stringify(records));

    drawTable();

}

clearBtn.onclick=function(){

    if(confirm("هل تريد مسح كل السجل؟")){

        records = [];

        localStorage.removeItem("records");

        drawTable(  );

    }

}

// تشغيل الجدول عند فتح الصفحة
drawTable();

function format12Hour(timeStr){

    let [h,m] = timeStr.split(":").map(Number);

    let period = h >= 12 ? "PM" : "AM";

    h = h % 12;

    if(h === 0) h = 12;

    return `${h}:${String(m).padStart(2,"0")} ${period}`;
}