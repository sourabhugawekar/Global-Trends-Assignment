import app from "./app.js";


const port = process.env.PORT_NUM || 4000;




app.listen(port,() => {
    console.log(`Server is Running at ${port}`);
})