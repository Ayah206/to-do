var todos, todoitem, li, check, ul, checkbox, content, del, edit, generateId, numbr;
var num = 0;
todos = [];

// helper function to append html elements to parents
function append(node, el){
    node.appendChild(el)
}

// helper function to create element and add attributes
create= (child, props, ...children) =>{
    var output = document.createElement(child)
    for (var p in props){
        output.setAttribute(p, props[p])
    }

    //create and append child(ren) elements
    children.forEach(child => {
        if (typeof child === 'string') {
            output.innerHTML+= child
        } else {
            output.appendChild(child)
        }
    })
    return output;
}

function genId(){
    num = num + 1
    return num
}

function add(){

    //get todo from input value
    todoitem = document.getElementById("item").value

    //generate incremented index for items, store  item and index in an object
    todoitemplus = {indx : genId(), item : todoitem}

    if(todoitem != ""){
        //push todo object to array
        todos.push(todoitemplus)
        
        //clear input feild
        document.getElementById("item").value = ""

        //create <li> and append todo item to it
        li = create('li', {class : 'flexlist', id: 'list'+todoitemplus.indx} )

        spans = create('div', {class : 'spandiv'} )
        append(li, spans)

        //create checkbox for each li
        checkbox = create('input', {type : 'checkbox',id : 'check' +todoitemplus.indx, onclick :'check()'})
        append(spans, checkbox)

        //create span element for todo item (text)
        content = create('div', {class : 'lispan2', id : 'li' +todoitemplus.indx, contenteditable:'true'} )
        append(spans, content)
        content.innerHTML=todoitem;

        //create on-hover dropdown and append to each li
        dropdown = create('div', {class : 'lispan1'}, '&#xFE19', 
        create('div', {class: 'lispan1options'}, 
        create('button', {class: 'editbutton', onclick: 'edit()'}, '&#9998'),
        create('button', {class:'delbutton', onclick: 'del()'}, '&#x1F5D1')) 
        )
        append(li, dropdown)
    
        
        //append each todo item to the <ul> in the document
        ul = document.getElementById("todolist") 
        append(ul, li )

    } 
    console.log(todos)   
}

//change text decoration for all checked items to line-through
check = (id) => {
        var comfirm = document.getElementById('check' +id)
        if (comfirm.checked != false){
            document.getElementById('li'+id).style.textDecoration = 'line-through'
        }
        else {
            document.getElementById('li'+id).style.textDecoration = 'none'
        }
}

//delete an item from the array
del = (id) => {
    var child = document.getElementById('list'+id)
    ul.removeChild(child);
    let todosplus = todos.filter(items => items.indx === id) 
    todos = todosplus 
}

//make list item editable
function edit(id){
    var editcon = document.getElementById('li'+id)
    editcon.setAttribute("contenteditable", "true")
    console.log(editcon)
}

window.localStorage.setItem('mylist', JSON.stringify(todos))
var myList = JSON.parse(window.localStorage.getItem('mylist'))

// emaya
function emaya(){
   const emaya = 'emaya groups';
   console.log(emaya)
}
