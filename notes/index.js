

let useServiceWorker = true;
if ('serviceWorker' in navigator && useServiceWorker) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            registration.addEventListener('updatefound', () => { 
                showUpdateServiceWorker();
            });

            console.log("ServiceWorker registration succeeded.", registration);
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });

    navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration.active) {
            console.log('We have active', registration.active);
        }

        if (registration.waiting) {
            showUpdateServiceWorker();
            console.log('We have waiting', registration.waiting);
        }
    });
}

function showUpdateServiceWorker() {
    let element = document.getElementById('install-new-version');
    element.classList.remove('hidden');
}

function updateServiceWorker() {
    navigator.serviceWorker.getRegistration().then(reg => {
        let waiting = reg.waiting;
        if (!waiting) return;
        waiting.postMessage('skip-waiting');
    });
}

function getTemplate(templateId) {
    let template = document.getElementById(templateId);
    return document.importNode(template.content, true);
}

function append(parentId, child){
    let parent = document.getElementById(parentId);
    parent.appendChild(child);
}

function remove(elementId){
    let element = document.getElementById(elementId);
    element.remove();
}

function openNewNoteDialog(){
    let newNoteDialog = getTemplate('new-note-dialog-template');
    append('new-note-dialog-host', newNoteDialog);
}

function closeNewNoteDialog(){
    remove('new-note-dialog');
}

function onKeyDownSearch(event){
    if(event.keyCode == 13 || event.code == 'Enter'){
        search();
    }
}

function search() {
    let tags = document.getElementById('search-input').value;

    if (tags) {
        tags = tags.split(' ');
    } else {
        tags = [];
    }

    if (tags.length <= 0){
        getAllNotes().then((notes) => {
            clearNotes();
            renderNotes(notes);
        });
        return;
    }

    getNotesByTags(tags).then((notes) => {
        clearNotes();
        renderNotes(notes);
    });
}

function onClickSaveButton() {
    let title = document.getElementById('title-input').value;
    let description = document.getElementById('description-input').value;
    let tags = document.getElementById('tags-input').value;

    if (tags) {
        tags = tags.split(' ');
    } else {
        tags = [];
    }

    let note = saveNote(title, description, tags);
    closeNewNoteDialog();
    update();
}

function renderNotes(notes) {
    notes.forEach(element => {
        renderNote(element);
    });
}

function renderNote(note) {
    let element = document.getElementById('notes');

    let noteElement = document.createElement('div');
    noteElement.classList.add('card');

    let titleElement = document.createElement('h3');
    titleElement.textContent = note.title;
    noteElement.appendChild(titleElement);

    let descriptionElement = document.createElement('p');
    descriptionElement.textContent = note.description;
    noteElement.appendChild(descriptionElement);

    if (note.tags) {
        let tagsElement = document.createElement('div');
        noteElement.appendChild(tagsElement);

        note.tags.forEach((tag) => {
            let tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            tagsElement.appendChild(tagElement);
        });
    }

    element.appendChild(noteElement);
}

function clearNotes() {
    var myNode = document.getElementById("notes");
    
    if(!myNode) return;

    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

var db = new Dexie("FriendDatabase");
db.version(1).stores({
    notes: "++id,title,description,dateCreated,dateModified,*tags"
});

function getAllNotes() {
    return db.notes
        .orderBy('dateCreated')
        .reverse()
        .toArray();
}

function getNotesByTags(tags) {
    return db.notes
        .where('tags').anyOfIgnoreCase(tags)
        .distinct()
        .toArray();
}

function saveNote(title, description, tags) {
    let note = {
        title: title,
        description: description,
        tags: tags,
        dateCreated: new Date(),
        dateModified: new Date()
    };

    db.notes.add(note);
    return note;
}

function update(){
    clearNotes();
    getAllNotes().then((notes) => {
        notes.forEach(element => {
            renderNote(element);
        });
    });
}

update();


