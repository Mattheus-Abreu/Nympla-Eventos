class subscription {
    constructor(userId, eventId, checked) {
        this.userId = userId;
        this.eventId = eventId;
        this.checked = "pending";        
    }
}

module.exports = subscription