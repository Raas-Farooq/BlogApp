const returnHome = document.querySelector('.return');
returnHome.addEventListener('click', e => {
    window.location.href = './index.html';
})

let blogData;
document.addEventListener('DOMContentLoaded', e => {
    console.log("Event Listener of edit Running");
    fetch(`http://localhost:3002/editBlogResult`).then(response => response.json()).then
        (data => {
            console.log("this is the data: ", data);
            if(!data.length){
                alert("Waiting for the data")
            }else{
                blogData = data;
                attachBlog(data);
            }
        }).catch(err => console.log("there are always errs: ",err ))

        
})
const editingBlog = document.querySelector('.blogToEdit');
function attachBlog(info){
    const div = document.createElement('div');
    div.dataset.id = info[0].id;
    console.log("info.id: ",info[0].id);
    div.className="parent";
    

    const del = document.createElement('button');
    del.className="del";
    del.textContent = 'del';
    const edit = document.createElement('button');
    edit.className = "btn btn-warning";
    edit.id = "editBlog";
    edit.textContent = 'edit';

    const myTitleInput = document.createElement('input'); // Create an input element
    myTitleInput.type = 'text'; // Set the input type to 'text'
    myTitleInput.value = info[0].name; 
    console.log("info.name: ",info[0].name);
    del.style.position='absolute';
    del.style.left="10px";
    del.style.top="11.5em";
    const area = document.createElement('textarea');
    area.rows="5";
    area.cols="5";

    area.textContent = info[0].detail;
    const text = document.createElement('p');
    text.textContent="Alhamdulila";

    div.appendChild(myTitleInput);
    div.appendChild(area);
    div.appendChild(del);
    div.appendChild(edit);
    // div.appendChild(myBox);
    editingBlog.appendChild(div);
}


const addNew = document.querySelector('#add');
addNew.addEventListener('click', e => {
    window.location.href = './blog.html';
})

const editBlog = document.querySelector('.blogToEdit');
const message = document.querySelector('#txt');
editBlog.addEventListener('click', e => {
    
    console.log("id", e.target.parentElement);
    
    if(e.target.id === 'editBlog'){
        const parent = e.target.parentElement;
        const input = parent.querySelector("input");
        const textarea = parent.querySelector("textarea");
        const id = e.target.parentElement.dataset.id;
        const item = [{
            id:id,
            name:input.value,
            detail:textarea.value
        }]
        // console.log("input: ",id);
        // if(e.target === input){
        //     console.log("Input is being changing")
        // }
        // console.log("input: ",input.value);
        // console.log("textarea: ",textarea.value);
        fetch(`http://localhost:3002/editingBlog/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(item)
        }).then(response => response.json()).
        then(data => {
            console.log("THis is the data", data);
            // attachBlog(data);
            // console.log("e.target.parentElement: ", e.target.parentElement);
            // console.log("data[0].name", data[0].name);
            input.value = data[0].name;
            textarea.value = data[0].detail;
        }).
        catch(err => console.log("learn From Al-Aadil ", err));
        message.textContent = 'Successfully Edited. You Can Go Back To Home'
        setTimeout(() => {
            message.textContent = ''
        }, 4000)
    }
    
})
