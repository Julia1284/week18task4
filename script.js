//Получает кнопку, заметки и список  и получаем текущую дату
let addNote = document.querySelector('.new_note');
let addButton = document.querySelector('.add');
let notes = document.querySelector('.note');
let newDate = new Date();
let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}
let now = newDate.toLocaleString('ru', options)
console.log(now)

let noteList = [] // массив, где будут храниться все наши заметки

// добавляем событие на кнопку
addButton.addEventListener('click', function () {

    const newNote = generateNote (now, addNote.value);
    notes.appendChild(newNote);

    addNoteToLocalStorage(now, addNote.value);
    addNote.value = ''//очищаем textarea

})

//Функция создания заметки
function generateNote (date, note) {

    let noteLi = document.createElement('li');
    let noteDate = document.createElement('span');
    let noteP = document.createElement('p');
    noteLi.appendChild(noteDate);
    noteLi.appendChild(noteP);
    noteLi.innerHTML = `${date}:   ${note}`
    return noteLi;
}

//Сохраняем в Local Storage

// Добавляем заметку в хранилище

const addNoteToLocalStorage = (date,note) =>{
    noteList.push ([date, note]);//добавляем в массив
    setNoteToLocalStorage(); //выполянем функцию добавления в хранилище
}

const setNoteToLocalStorage = ()=>{
    localStorage.setItem ('notecollection', JSON.stringify (noteList))
}

const getNoteFromLocalStorage = ()=>{
    let array = JSON.parse (localStorage.getItem ('notecollection'));
    if (array){
        noteList = array;
    }
}

//Получаем данные из хранилища и выводим из при загрузке страницы

document.addEventListener ('DOMContentLoaded', function (){
    getNotes();
})

function  getNotes (){
    getNoteFromLocalStorage ();
    for (i=0; i<noteList.length; i++){
        const newNote =  generateNote(noteList[i][0], noteList[i][1]);
        notes.appendChild(newNote)
    }  
}


//localStorage.clear()