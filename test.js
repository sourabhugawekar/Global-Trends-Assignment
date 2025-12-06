const data = []


fetch("http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=81ac3c1d3cb4fdf7bbaefdd7ffddc194")
.then(response => response.json())
.then(res => console.log("The Data is ",res));



