import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
app.use(cors());

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


let storeEdit;

app.get('/getAll', async (req,res) => {
    try{
        await blogModel.deleteMany({
            $or:[
                {name:null},
                {detail:null}
            ]
        });
        const blogs = await blogModel.find({});
        console.log("MY Blogs: ", blogs)
        if(!blogs.length){
            res.json({message:"No Blogs Are Added"})
        }
        else{
            res.json(blogs)
        }
    }catch(err){
        res.status(500).json({err:err.message})
    }
})

app.put('/editingBlog/:special', async (req,res) => {
    try{
        // ANOTHER METHOD directly accessing id
        // const id = req.params.special;
        // const editBlog = await blogModel.findOne({id});
        const myId = req.params.special;
        
        const {name, detail} = req.body[0];
        console.log("detail: ",detail);
        const editBlog = await blogModel.findOne({id:myId});
        // console.log("EditBloc received: ", editBlog);
        if(!editBlog){
            res.json({message:"No Blog Like This"})
        }else{
            
            const myResult = await blogModel.updateOne({id:myId}, req.body[0]); // you can also assign req.body object to any variable like myValues = req.body[0] then pass myValues here instead of req.body[0]
            // await blogModel.updateOne({ id },{$set: { name, detail}}); // second method
            console.log("myResult: modified ",myResult);
            storeEdit = req.body;
            res.json(storeEdit)
            
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})









app.get('/getEdit', async (req,res) => {
    try{
        // console.log("id inside GetEdit: ", req.query.id);
        const id = req.query.id;
        // console.log("this is the id: ", req.body[0].id);
        const myBlog = await blogModel.findOne({id});
        if(myBlog){
            storeEdit = [myBlog];
            // console.log("StoreEdit: ", storeEdit);
            res.json(storeEdit)
        }else{
            console.log("no Blog is  there");
            res.json({message:"Blog doesnt Exist"})
        }
    
        
    } 
    catch(err){
        res.status(500).json({err:err.message})
    } 
})

app.get('/editBlogResult', async (req,res) => {
    try{
        res.json(storeEdit)
    } 
    catch(err){
        res.status(500).json({err:err.message})
    } 
})
app.delete('/deleteBlog', async (req,res) => {
    try{
        console.log("this is the body: ", req.query.id);
        const id = req.query.id;
        // console.log("this is the id: ", req.body[0].id);
        
        // await blogModel.create(body);
        const blog = await blogModel.findOne({id});
        if(blog){
            console.log('blog: ', blog);
            await blogModel.deleteOne({id})
            res.json({message:"YOU HAVE Achieved first Milestone"});
        }
        else{
            res.json({message:"Be sTrong With Weaknesses "})
        }
    
        
    } 
    catch(err){
        res.status(500).json({err:err.message})
    } 
})

app.post('/addBlog', async(req,res) => {
    try{
        const blog = req.body;
        console.log("blog: ", blog);
        await blogModel.create(blog);
        
        res.json({message:"Success"});
        // console.log("added: ", added);
        // ** Adding console.log after res.json responding with errs
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})



app.listen(port, () => console.log("THE MOST DESERVING OF PRAISE, WORSHIP AND FEAR ", port))