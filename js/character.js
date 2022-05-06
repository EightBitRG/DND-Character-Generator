////////////////////////////////////////////////////////////////////////////////
///   M o d e l
////////////////////////////////////////////////////////////////////////////////

// This is an array to keep track of all the constacts that have been entered.
var characterList = [];

// This is an internal ID that we give each new contact object.  This will make each
// record easier to edit (in a later assignment).
var nextContactId = 1000;

/************************************************/
function Character(name, strength, dexterity, constitution, intelligence, wisdom,charisma,race,profession,gender) {
    this.id = nextContactId++;
    this.name = name;
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.race = race;
    this.profession = profession;
    this.gender = gender;
}

/************************************************/
function createCharacter(name, strength, dexterity, constitution, intelligence, wisdom, charisma, race, profession, gender) {
    var newCharacter = new Character(
        name,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        race,
        profession,
        gender);

    // Add the new Contact object to the model.
    characterList.push(newCharacter);

    // Return the new contact
    return newCharacter;
}

/************************************************/
function readAllCharacters() {
    return characterList;
}

/************************************************/
function readCharacter(id) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            return characterList[x];
        }
    }

    return null;
}

/************************************************/
function updateCharacter(id, name, strength, dexterity, constitution, intelligence, wisdom, charisma, race, profession, gender) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            characterList[x].name = name;
            characterList[x].strength = strength;
            characterList[x].dexterity = dexterity;
            characterList[x].constitution = constitution;
            characterList[x].intelligence = intelligence;
            characterList[x].wisdom = wisdom;
            characterList[x].charisma = charisma;
            characterList[x].race = race;
            characterList[x].profession = profession;
            characterList[x].gender = gender;

            return characterList[x];
        }
    }

    return null;
}

/************************************************/
function deleteCharacter(id) {
    for (x in characterList) {
        if (characterList[x].id === id) {
            characterList.splice(x, 1);
        }
    }
}
