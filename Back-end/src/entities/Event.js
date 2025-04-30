class Event {
    constructor(name, description, dateStart, dateEnd, value, localization, imageUrl) {
      this.id = 0;
      this.name = name;
      this.description = description;
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.value = value;
      this.localization = localization;
      this.imageUrl = imageUrl
    }
}

module.exports = Event