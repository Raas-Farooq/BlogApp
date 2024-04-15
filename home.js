const myList = document.querySelector('.list');
const myHome = document.querySelector('#home');
const newBlog = document.querySelector('#newBlog');


newBlog.addEventListener('click', e => {
    window.location.href = './blog.html';
})

myHome.addEventListener('click', e => {
    window.location.href = './index.html';
})