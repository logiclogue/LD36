function EntityManager() {
    this.entities = [];
}

EntityManager.prototype = {
    /*
     * Adds passed entity to the array of entities.
     */
    add: function (entity) {
        this.entities.push(entity);
    },

    /*
     * For each entity callback.
     */
    forEach: function (callback) {
        this.entities.forEach(function (entity, i) {
            callback(entity, i);
        });
    }
};

module.exports = EntityManager;
