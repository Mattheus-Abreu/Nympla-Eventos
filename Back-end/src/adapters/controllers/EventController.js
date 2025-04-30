const User = require("../../entities/User")
const database = require("../../frameworks/PgDatabase")
const EventService = require("../../services/EventService")
const EventRepository = require("../repositories/EventsRepository")

const eventRepository = new EventRepository(database)

async function getAllEvents(req, res){
    const service = new EventService(eventRepository);
    const responseService = await service.getAllEvents();
  
    if (responseService.error) {
      return res.status(500).json({ error: responseService.error });
    }
  
    res.status(201).json( { status: responseService})
 }

async function getEventBySearch(req, res){
    const service = new EventService(eventRepository);
    const responseService = await service.getEventBySearch(req.params.search);
  
    if (responseService.error) {
      return res.status(500).json({ error: responseService.error });
    }
  
    res.status(201).json( { status: responseService})
 }

 module.exports = { getAllEvents, getEventBySearch }