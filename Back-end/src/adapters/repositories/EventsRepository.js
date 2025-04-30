class EventsRepository {
    constructor(database) {
        this.database = database;
    }

    async getAllEvents(){
        try {
          const query = "select * from events"
          const res = await this.database.query(query)
    
          return res.rows
        } catch (error) {
          return { error: error.message }
        }
    }

    async getEventBySearch(search){
        try {
          const query = "select * from events where nome ilike $1"
          const res = await this.database.query(query, [`%${search}%`])
    
          return res.rows
        } catch (error) {
          return { error: error.message }
        }
    }
}

module.exports = EventsRepository