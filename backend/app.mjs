import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
app.use(cors);

const port = process.env.PORT || 3002;
mongoose.connect('mongodb://localhost:27017/blogDb',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Mongoose Is Connected")
}).catch((err) => {
    console.log("Something has Gone Wrong: ", err);
})

const blogSchema = new mongoose.Schema({
    id:String,
    name:String,
    detail:String
})

const blogModel = mongoose.model('blogModel', blogSchema); 

app.get('/getAll', async(req,res) => {
    try{
        const allBlogs = await blogModel.find({});
        if(allBlogs.length === 0)
        {
            res.json({message:"no blogs Yet Added"})
        }
        else
        {
            res.json(allBlogs)
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})
app.post('addBlog', async (req,res) => {
    try{
        console.log("this is the rbody: ", req.body);

        const blogs = await blogModel.find({});

    } 
    catch(err){
        res.status(500).json({err:err.message})
    } 
})


app.listen(port, () => console.log("THE MOST DESERVING OF PRAISE, WORSHIP AND FEAR ", port))