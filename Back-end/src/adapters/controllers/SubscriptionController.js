const SubscriptionService = require('../../services/SubscriptionService')
const SubscriptionRepository = require('../repositories/SubscriptionRepository')
const database = require('../../frameworks/PgDatabase')

const subscriptionsRepository = new SubscriptionRepository(database)

async function getAllSubscriptions(req, res) {
    const service = new SubscriptionService(subscriptionsRepository);
    const responseService = await service.getAllSubscriptions();

    if (responseService.error) {      
      return res.status(500).json({ error: responseService.error });
    }

    res.status(201).json( { status: responseService})
}

async function getSubscriptionById(req, res) {
  console.log(req.params.id)
  const service = new SubscriptionService(subscriptionsRepository);
  const responseService = await service.getSubscriptionById(req.params.id);
  

  if (responseService.error) {
    return res.status(500).json({ error: responseService.error });
  }

  res.status(201).json( { status: responseService})
}

async function createSubscription(req, res) {  
  const service = new SubscriptionService(subscriptionsRepository);
  const responseService = await service.createSubscription(req.body);

  if (responseService.error) {    
    return res.status(500).json({ error: responseService.error });
  }  

  res.status(201).json( { status: responseService})
}   

async function updateSubscription(req, res) {
  const service = new SubscriptionService(subscriptionsRepository);
  const responseService = await service.updateSubscription(req.params.id, req.body);    

  if (responseService.error) {
    return res.status(500).json({ error: responseService.error });
  }

  res.status(201).json( { status: responseService})
}

async function deleteSubscription(req, res) {
  const data = req.body
  const service = new SubscriptionService(subscriptionsRepository);
  const responseService = await service.deleteSubscription(data);    

  if (responseService.error) {
    return res.status(500).json({ error: responseService.error });
  }

  res.status(201).json( { status: responseService})
}

async function getSubscribeEvent(req, res) {
  const data = req.params.id
  const service = new SubscriptionService(subscriptionsRepository);
  const responseService = await service.getSubscribeEvent(data);

  if (responseService.error) {
    return res.status(500).json({ error: responseService.error });
  }

  res.status(201).json( { status: responseService})
}



module.exports = { getAllSubscriptions, getSubscriptionById, createSubscription, updateSubscription, deleteSubscription, getSubscribeEvent }