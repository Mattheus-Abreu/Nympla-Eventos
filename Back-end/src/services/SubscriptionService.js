const Subscription = require("../entities/Subscription");

class SubscriptionService {
    constructor(subscriptionsRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
    }

    async getAllSubscriptions() {
        return await this.subscriptionsRepository.getAllSubscriptions();
    }    

    async getSubscriptionById(id) {        
        return await this.subscriptionsRepository.getSubscriptionById(id);
    }

    async createSubscription(subscription) {        
        return await this.subscriptionsRepository.createSubscription(subscription);
    }

    async updateSubscription(id, subscription) {        
        return await this.subscriptionsRepository.updateSubscription(id, subscription);

    }

    async deleteSubscription(data) {        
        return await this.subscriptionsRepository.deleteSubscription(data);
    }

    async getSubscribeEvent(id) {        
        return await this.subscriptionsRepository.getSubscribeEvent(id);
    }
}

module.exports = SubscriptionService