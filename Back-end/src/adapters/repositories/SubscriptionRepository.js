class SubscriptionRepository {
    constructor(database) {
        this.database = database;
    }

    async getAllSubscriptions() {
        try {
          const query = "select * from subscriptions";
          const reply = await this.database.query(query);
    
          return reply.rows;
        } catch (error) {
          return { error: error.message };
        }
    }

    async getSubscriptionById(id) {
        try {
          const query = 'SELECT * FROM subscriptions JOIN events ON subscriptions.event_id = events.id WHERE subscriptions.user_id = $1;';

          //const query = "select * from subscriptions where user_id = $1";
          const reply = await this.database.query(query, [id]);
    
          return reply.rows
        } catch (error) {
          return { error: error.message };
        }
    }

    async createSubscription(subscription) {
        try {
          console.log(subscription)
          const data = [subscription.event_id, subscription.user_id]
          console.log(data)
          const query = "insert into subscriptions (event_id, user_id) values ($1, $2) returning *"
          
          const res = await this.database.query(query, data)
    
          return res.rows
        } catch (error) {
          return { error: error.message }      
        }
    }

    async deleteSubscription(data) {
    
        try {
          const query = "delete from subscriptions where event_id = $1 and user_id = $2 returning *"
          const res = await this.database.query(query, [data.event_id, data.user_id])
    
          return res.rows
        } catch (error) {
          return { error: error.message }      
        }
    }

    async getSubscribeEvent(id) {
        try {
          const query = "SELECT s.id, s.check_in, u.name AS user_name FROM subscriptions s JOIN users u ON s.user_id = u.id WHERE s.event_id = $1"
          const res = await this.database.query(query, [id])
    
          return res.rows
        } catch (error) {
          return { error: error.message }      
        }
    }
}

module.exports = SubscriptionRepository