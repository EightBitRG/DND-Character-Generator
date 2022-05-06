window.addEventListener("load", onPageLoad);

function onPageLoad(){
    document.querySelector(".listButton button").onclick = function() {
        onCreateNew();
    }
    document.querySelector("#cancelBtn").onclick = function() {
        onCreateCancel();
    }
    document.querySelector("#rerollStatsBtn").onclick = function() {
        rerollStats();
    }
    //populate the list
    createCharacter("Brasstoise",14,12,18,7,8,9,11,1,0);
    createCharacter("Mario",13,16,3,9,8,15,6,6,0);
    createCharacter("Aida",15,10,12,10,12,8,13,5,1);
    createCharacter("Daggers",9,18,6,10,8,18,10,10,0);

    var characters = readAllCharacters();
    for (var i = 0; i < characters.length; i++){
        addGridRow(characters[i])
    }
    onCreateCancel();
}

function onCreateNew(){
    document.getElementById('formTitle').innerHTML = "Create New Character";
    document.getElementById('saveBtn').innerHTML = "Save";
    document.getElementById("rerollStatsBtn").style.display="initial";
    document.getElementById('characterListArea').style.display='none';
    document.getElementById('characterEditArea').style.display='initial';
    document.querySelector("#saveBtn").onclick = function() {
        onCharacterSave();
    }
}
function onCharacterSave(id = false){
    var form = document.forms['characterEditForm'];
    if (validateData()){
        if (id){
            person = updateCharacter(
                id,
                form.nameEdit.value,
                form.strength.value,
                form.dexterity.value,
                form.constitution.value,
                form.intelligence.value,
                form.wisdom.value,
                form.charisma.value,
                form.raceSelecter.value,
                form.classSelecter.value,
                form.genderRadio.value
            );
            updateGridRow(person);
        } else {
            person = createCharacter(
                form.nameEdit.value,
                form.strength.value,
                form.dexterity.value,
                form.constitution.value,
                form.intelligence.value,
                form.wisdom.value,
                form.charisma.value,
                form.raceSelecter.value,
                form.classSelecter.value,
                form.genderRadio.value
            );
            addGridRow(person);
        }
        onCreateCancel()
        
    }
}
function validateData(){
    var form = document.forms['characterEditForm'];
    validated = true;
    if (form.nameEdit.value == ''){
        document.querySelector('#nameError').innerHTML = "Name not given";
        validated = false
    } else {
        document.querySelector('#nameError').innerHTML = "";
    }
    if (document.querySelector('#strength').value==''){
        document.querySelector('#statError').innerHTML = "Stats not rolled";
        validated = false
    } else {
        document.querySelector('#statError').innerHTML = "";
    }
    if (form.raceSelecter.selectedIndex == 0){
        document.querySelector('#raceError').innerHTML = "Race not selected";
        validated = false
    } else {
        document.querySelector('#raceError').innerHTML = "";
    }
    if (form.classSelecter.selectedIndex == 0){
        document.querySelector('#classError').innerHTML = "Class not selected";
        validated = false
    } else {
        document.querySelector('#classError').innerHTML = "";
    }
    if ((form.genderRadio.value == '')){
        document.querySelector('#genderError').innerHTML = "Gender not Selected";
        validated = false
    } else {
        document.querySelector('#genderError').innerHTML = "";
    }
    return validated
}
function onCreateCancel(){
    document.getElementById('characterListArea').style.display='grid';
    document.getElementById('characterEditArea').style.display='none';

    var form = document.forms['characterEditForm'];

    form.nameEdit.value = "";
    form.strength.value = "";
    form.dexterity.value = "";
    form.constitution.value = "";
    form.intelligence.value = "";
    form.wisdom.value = "";
    form.charisma.value = "";
    form.classSelecter.value = 0;
    form.raceSelecter.value = 0;
    document.querySelector('#genderRadio0').checked = false;
    document.querySelector('#genderRadio1').checked = false;

    document.querySelector('#nameError').innerHTML = "";
    document.querySelector('#statError').innerHTML = "";
    document.querySelector('#raceError').innerHTML = "";
    document.querySelector('#classError').innerHTML = "";
    document.querySelector('#genderError').innerHTML = "";
    
}
function onDeleteCharacter(id){
    var character = readCharacter(id);
    if (character == null) {
        alert("Error: unable to find character ID " + id)
    }

    if (!confirm("Are you sure you want to delete " + character.name + "?"))
        return;

    deleteCharacter(id);
    var tr = document.querySelectorAll('.row'+character.id)
    for (i = 0; i < tr.length;i++){
        tr[i].remove();
    }
}
function onEditCharacter(id){
    document.getElementById('formTitle').innerHTML = "Edit Character";
    document.getElementById('saveBtn').innerHTML = "Update";
    document.getElementById("rerollStatsBtn").style.display="none";
    document.querySelector("#saveBtn").onclick = function() {
        onCharacterSave(id);
    }
    var form = document.forms['characterEditForm'];
    var person = readCharacter(id);
    form.nameEdit.value = person.name;
    form.strength.value = person.strength;
    form.dexterity.value = person.dexterity;
    form.constitution.value = person.constitution;
    form.intelligence.value = person.intelligence;
    form.wisdom.value = person.wisdom;
    form.charisma.value = person.charisma;
    form.classSelecter.value = person.profession;
    form.raceSelecter.value = person.race;
    form.genderRadio.value = person.gender;

    document.getElementById('characterListArea').style.display='none';
    document.getElementById('characterEditArea').style.display='initial';
}
function rerollStats(){
    statList = []
    for (i=0;i<6;i++){
        statList.push(((Math.floor(Math.random()*5)+1))+((Math.floor(Math.random()*5)+1))+((Math.floor(Math.random()*5)+1)));
    }
    document.querySelector('#strength').value=statList[0];
    document.querySelector('#dexterity').value=statList[1];
    document.querySelector('#constitution').value=statList[2];
    document.querySelector('#intelligence').value=statList[3];
    document.querySelector('#wisdom').value=statList[4];
    document.querySelector('#charisma').value=statList[5];

}
function addGridRow(person){
    var raceArray = ['Dragonborn','Dwarf','Elf','Gnome','Half-Elf','Halfling','Half-Orc','Harengon','Human','Tiefling','Tortle','Owlin','Warforged'];
    var classArray= ['Artificer','Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard'];
    var genderArray = ['Male','Female']
    var grid = document.querySelector('#characterListArea');
    rowid  = "row"+String(person.id);

    grid.insertAdjacentHTML("beforeend",'<div class="listItem '+rowid+'">'+person.name+'</div>')
    grid.insertAdjacentHTML("beforeend",'<div class="listItem '+rowid+'">'+raceArray[person.race-1]+'</div>')
    grid.insertAdjacentHTML("beforeend",'<div class="listItem '+rowid+'">'+classArray[person.profession-1]+'</div>')
    grid.insertAdjacentHTML("beforeend",'<div class="listItem '+rowid+'">'+genderArray[person.gender]+'</div>')
    grid.insertAdjacentHTML("beforeend",'<div class="characterButtons listItem '+rowid+'"></div>')
    charbuttons = document.querySelector('.characterButtons.listItem.'+rowid);
    charbuttons.insertAdjacentHTML("beforeend",'<div class="'+rowid+'"><button class=editBtn>Edit</button></div>')
    charbuttons.insertAdjacentHTML("beforeend",'<div class="'+rowid+'"><button class=deleteBtn>Delete</button></div>')
    document.querySelector('.characterButtons.'+rowid+' .editBtn').onclick = function(){
        onEditCharacter(person.id)
    }
    document.querySelector('.characterButtons.'+rowid+' .deleteBtn').onclick = function(){
        onDeleteCharacter(person.id)
    }
}
function updateGridRow(person){
    var raceArray = ['Dragonborn','Dwarf','Elf','Gnome','Half-Elf','Halfling','Half-Orc','Harengon','Human','Tiefling','Tortle','Owlin','Warforged'];
    var classArray= ['Artificer','Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard'];
    var genderArray = ['Male','Female']
    var tr = document.querySelectorAll('.row'+person.id)
    tr[0].innerHTML = person.name;
    tr[1].innerHTML = raceArray[person.race-1];
    tr[2].innerHTML = classArray[person.profession-1];
    tr[3].innerHTML = genderArray[person.gender];
}

