
 console.log("I have Run Bro");

// Blog Page


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
    console.log("Add CLICKED", storedDetail);

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
        }
    ).catch(err => console.log("The All-Watcher : ", err));
    blogName.value = '';
    textBox.value = '';
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

