/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


let APIKey= '&APPID=6613ee8430ed01573cc6aea7f860f3e5';
let url = 'http://api.openweathermap.org/data/2.5/forecast?id=';

let generateButton = document.getElementById('generator');
generateButton.addEventListener('click', generateResult);
function generateResult(){
    const ZipCode = document.getElementById('zip').value; 
    const feeling = document.getElementById('feelings').value;
    getWeather(url,ZipCode,APIKey)
    .then(function(data){
        console.log(data);
        postData('/add', {data:d, temp:data.list[0].main.temp, content:feelings});
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


const postData = async (url = '', data = {})=>{
    console.log(data);
    const response= await fetch(url, {
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
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `tempreture : ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel : ${allData[0].content}`; 
    } catch(error) {
        console.log('error',error);
    } 
}

// Create a new date instance dynamically with JS

