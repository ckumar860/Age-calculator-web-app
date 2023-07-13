const noOfDays = [31,28,31,30,31,30,31,31,30,31,30,31];
currDate = new Date;

const inputYear = document.querySelector("#year-input");
const inputMonth = document.querySelector("#month-input");
const inputDate = document.querySelector("#day-input");
let birthDate,birthMonth,birthYear;

function isLeapbirthYear(){
    return (birthYear % 4 == 0 && (birthYear % 100 == 0 && birthYear % 400 == 0)) ? true : false;
}

// function birthYearValidityChk(){
//     if(birthYear > currDate.getFullYear()){
//         return false;
//     }
//     else if(birthYear === currDate.getFullYear()){
//         if(birthMonth > currDate.getMonth()+1){
//             return false;
//         }
//         else if(birthMonth === currDate.getMonth()+1 && birthDate > currDate.getDate()){    
//             return false;
//         }
//         else{
//             return true;
//         }
//     }
//     else {
//         return true;
//     }
// }

const yearError = document.querySelector("#year-error");
const monthError = document.querySelector("#month-error");
const dayError = document.querySelector("#date-error");
const resultantYear = document.querySelector(".resultant-year");
const resultantMonth = document.querySelector(".resultant-months");
const resultantDays = document.querySelector(".resultant-days");
function calculateAge(){
    let y = currDate.getFullYear() - birthYear;
    let m = currDate.getMonth() - birthMonth + 1;
    if (m < 0){
        y--;
        m += 12;
    }
    let d = currDate.getDate() - birthDate;
    if(d < 0){
        m--;
        (currDate.getMonth() == 2 && isLeapbirthYear()) ? d += 29 : d += noOfDays[(currDate.getMonth()+11)%12];
        if(m < 0){
            y--;
            m += 12;
        } 
    }
    resultantYear.innerHTML = y;
    resultantMonth.innerHTML = m;
    resultantDays.innerHTML = d;
}

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () => {
    if(inputDate.value == "" || inputMonth.value == "" || inputYear.value == ""){
        if(inputDate.value == ""){
            dayError.innerHTML = "This field is required";
        }
        if(inputMonth.value == ""){
            monthError.innerHTML = "This field is required";
        }
        if(inputYear.value == ""){
            yearError.innerHTML = "This field is required";
        }
        Error();
        return;
    }
    
    birthDate = parseInt(inputDate.value,10);
    birthMonth = parseInt(inputMonth.value,10);
    birthYear = parseInt(inputYear.value,10);

    if((birthMonth == 2 && birthDate > 29 && isLeapbirthYear()) || (birthMonth == 2 && birthDate > 28 && !isLeapbirthYear())) {
        dayError.innerHTML = "Must be a valid day";
        Error();
    }
    else if(birthDate < 1 || birthDate > noOfDays[birthMonth-1]){
        dayError.innerHTML = "Must be a valid day";
        Error();
    }
    else{
        dayError.innerHTML = "";
        calculateAge();
    }
});

function Error(){
    const paragraphs = document.querySelectorAll('p');
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = "hsl(0, 100%, 67%)";
    }
    const inputEle = document.querySelectorAll('.text-input');
    for (let i = 0; i < inputEle.length; i++) {
        inputEle[i].style.border = "1px solid hsl(0, 100%, 67%)";
    }
}

inputYear.addEventListener("input", () => {
    birthYear = parseInt(inputYear.value,10);
    if(birthYear > currDate.getFullYear()){
        yearError.innerHTML = "Must be in the past";
    }
    else{
        yearError.innerHTML = "";
    }
});

inputDate.addEventListener("input", () => {
    birthDate = parseInt(inputDate.value,10);
    if(birthDate < 1 && birthDate > 31){
        dayError.innerHTML = "Must be a valid day";
    }
    else{
        dayError.innerHTML = "";
    }
});

inputMonth.addEventListener("input", () => {
    if(inputMonth.value <= 0 || inputMonth.value > 12){
        monthError.innerHTML = "Must be a valid month";
    }
    else{
        monthError.innerHTML = "";
    }
})
