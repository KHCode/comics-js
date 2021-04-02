const CharacterDTO = class {
    id;
    name;
    description;
    imgUrl;
    events = [];
    series = [];
    constructor(id, name, description, imgUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

export default CharacterDTO;