import http from 'http';
import { subDivisionController} from './controller/index.js'


const port = 8000; 

const server = http.createServer((req,res) => {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');      

    try{
        if(req.method !== 'GET') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Not Found' }));
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const subdivisions  = subDivisionController(url);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(subdivisions))

    }catch(error){
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Something went wrong!'}));
    }
})


server.listen(port, ()=> {
    console.log(`server running on port:${port}`);
})


export default server


// Test cases 
// for req 
// Test type of parameters
// handling errors
