console.log("Client side JS loaded!");

const weather=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#msg-1')
const messageTwo=document.querySelector('#msg-2')



weather.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    messageOne.textContent="Loading..."
    messageTwo.textContent=""

    const location=search.value;
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return messageOne.textContent=data.error;
            }
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        })
    })
})
