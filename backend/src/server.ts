import express, {Application, Request, Response } from "express";
import { Bookmark } from "./bookmark";

const app: Application = express();

// Enable JSON body parsing
app.use(express.json());

const PORT = process.env.PORT || 3000;

let bookmarks: Bookmark[] = [];
let nextId = 1;

app.get('/', (req:Request, res: Response)=>{
    res.send("Hello World!");
});

app.get('/bookmarks', (req, res)=> {
    res.status(200).json(bookmarks);
});

app.post('/bookmarks', (req,res)=> {
    const {title, url} = req.body; 

    if(!title || !url){
        return res.status(400).json({message: 'Title and url are required.'});
    }

    const payloadBookmark: Bookmark = {
        id: nextId++,
        title,
        url,
        createAt: new Date(),
    }

    bookmarks.push(payloadBookmark);

    res.status(201).json(payloadBookmark);
});

app.get('/items', async (req, res)=>{
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const search = req.query.search || '';

        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const skipIndex = (Number(page) - 1) * Number(limit);

        const results = await response.json();
        const paginatedResults = results.slice(skipIndex, skipIndex + Number(limit));

        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            total: results.length,
            data: paginatedResults,
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching items', error});
    }
});

app.listen(PORT, ()=>{
    console.log(`your server is running on http:localhost:${PORT}`);
});
