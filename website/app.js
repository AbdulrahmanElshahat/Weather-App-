/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const APIKey= '&APPID=6613ee8430ed01573cc6aea7f860f3e5&units=imperial';
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

let generateButton = document.getElementById('generator');
generateButton.addEventListener('click', generateResult);
function generateResult(){
    const ZipCode = document.getElementById('zip').value; 
    const feeling = document.getElementById('feelings').value;
    getWeather(url,ZipCode,APIKey)
    .then(function(data){
        console.log(data);
        postData('/add', {date:newDate, temp:data.main.temp, content:feeling});
        updateUI();
    });
}

const getWeather = async (url,ZipCode,APIKey)=> {
    const res = await fetch(url+ZipCode+APIKey)
    try {
        const data = await res.json();
        return data;
    }catch (error){
        console.log('error',error);
    }

}


const postData = async (url = ' ', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' :'application/json', 
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch (error){
        console.log('error',error);
    }
}


const updateUI = async ()=>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData['date']}`;
        document.getElementById('temp').innerHTML = `tempreture : ${allData['temp']}`;
        document.getElementById('content').innerHTML = `I feel : ${allData['content']}`; 
    } catch(error) {
        console.log('error',error);
        document.getElementById('date').innerHTML = `There Is an Error in requesting Date`;
        document.getElementById('temp').innerHTML = `There Is an Error in requesting Temp`;
        document.getElementById('content').innerHTML = `There Is an Error in requesting Feeling`;
    } 
}


