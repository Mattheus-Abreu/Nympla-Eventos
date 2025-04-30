class EventService{
    constructor(eventRepository){
        this.eventRepository = eventRepository
    }

    async getAllEvents(){
        return await this.eventRepository.getAllEvents()
    }
    
    async getEventBySearch(search){
        return await this.eventRepository.getEventBySearch(search)
    }
}

module.exports = EventService