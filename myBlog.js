
const addIt = document.querySelector('#add');
const returnHome = document.querySelector('.return');
const blogName = document.querySelector('#blogName');
console.log("blogName: ",blogName);
const textBox = document.querySelector('#textBox');
let storedName;
let storedDetail;

addIt.addEventListener('click', e => {
    // window.location.href = './blog.html';
    const myId = new Date().getTime().toString();
    console.log("Add CLICKED");
    console.log("Stored Name: ", storedName);
    console.log("storedDetail", storedDetail);
    if(!storedName || !storedDetail){
        alert('Blog information is Empty');
    }
    else {
        const blog = [{
            id:myId,
            name:storedName,
            detail:storedDetail
        }];
    
        fetch('http://localhost:3002/addBlog',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(blog)
        }).then(response =>response.json()).then(
            data => {
                console.log("The All Hearing: ", data);
                addingBlogs(blog);
            }
        ).catch(err => console.log("The All-Watcher : ", err));
        // addingBlogs();
        blogName.value = '';
        textBox.value = '';
        storedDetail = '';
        storedName = '';
    }
   
})


blogName.addEventListener('input', e => {
    console.log("e.target.value: ", e.target.value);
    storedName = e.target.value;
    
})


textBox.addEventListener('input', e => {
    console.log("e.target.value: ", e.target.value);
    storedDetail = e.target.value;
    
})
returnHome.addEventListener('click', e => {
    window.location.href = './index.html';
})
//blogs container from html
const blogs = document.querySelector('.blogs');


//document Event Listener
let info;
document.addEventListener('DOMContentLoaded', e => {
    
    fetch('http://localhost:3002/getAll').then
    (response => response.json()).then
    (data => {
        info = data;
        if(!info.length){
            alert("Loading")
        }
        else{
            console.log("see my DAta: ", data);
            info = data;
            addingBlogs(data);
        }
        
    }).catch
    (err => console.log("Alhamdulila for all the Blessings: ",err))
    info = '';
})

const addingBlogs = (data) => {
    // console.log("Yes Adding Blogs Have Run:")
    if(!data){
        console.log("no data Entered by You")
    }
    else{
        data.forEach(blog => {
            // console.log("blog inside Adding: ", blog);
            const div = document.createElement('div');
            div.dataset.id = blog.id;
            div.className="parent";
            

            const del = document.createElement('button');
            del.className="del";
            del.textContent = 'del';
            const edit = document.createElement('button');
            edit.className="edit";
            edit.textContent = 'edit';

            const myTitleInput = document.createElement('input'); // Create an input element
            myTitleInput.type = 'text'; // Set the input type to 'text'
            myTitleInput.value = blog.name; 
    
    
            const area = document.createElement('textarea');
            area.rows="5";
            area.cols="20";
        
            area.textContent = blog.detail;
            const text = document.createElement('p');
            text.textContent="Alhamdulila";
            // div.appendChild(text);
    
    
            const myBox = document.createElement('div');
            myBox.className="super";
            myBox.appendChild(myTitleInput);
            myBox.appendChild(area);
            myBox.appendChild(del);
            myBox.appendChild(edit);
            div.appendChild(myBox);
            
            blogs.appendChild(div);
        })
    
    }
    
   
}

// handling delete and edit buttons
blogs.addEventListener('click', e => {
    console.log("e.target.value: ", e.target);
    if(e.target.classList.contains('edit')){
        console.log("Edit: ", e.target.parentElement.parentElement.dataset.id);
        const id = e.target.parentElement.parentElement.dataset.id;
        fetch(`http://localhost:3002/getEdit?id=${id}`).then(response => response.json()).then
        (data => {
            console.log("this is the data: ", data);
            if(!data.length){
                alert("Waiting for the data")
            }else{
                window.location.href = './editBlog.html';
            }
        }).catch(err => console.log("there are always errs: ",err ));

        
    }
    else if(e.target.classList.contains('del')){
        const element = e.target.parentElement.parentElement;
        blogs.removeChild(element);
        const id = e.target.parentElement.parentElement.dataset.id;
        fetch(`http://localhost:3002/deleteBlog?id=${id}`,{
            method:"DELETE"
        }).then(response => response.json()).
        then(data => {
            console.log("Power Of Belief: ", data);
        }).catch(err => console.log("Lovely Err: ",err))
    }

    
})
// const editBtn = document.querySelector('.edit');
// console.log("edit : ", editBtn);