angular.module('squadService', [])
.factory('squadService', squadService);

function squadService() {

    // ensure none of the methods change the reference of
    // heroes, they modify the array in place
    var numMaxHeroes = 4;

    var service = {
        heroes: [],
        getAll: getAll,
        clearAll: clearAll,
        contains: contains,
        addHero: addHero,
        removeHero: removeHero,
        getMaxHeroes: getMaxHeroes,
        setMaxHeroes: setMaxHeroes,
        isFull: isFull
    };

    /**
     * Return an array of heroes
     */
    function getAll() {
        return service.heroes;
    }

    /**
     * Clear the list of heroes
     */
    function clearAll() {
        while (service.heroes.length > 0) {
            service.heroes.splice(0, 1);
        }
    }

    /**
     * Return the index of a hero within the squad
     * 
     * @param {any} hero
     * @returns {integer} Index of hero within squad, 0+, -1 if not found
     */
    function _getHeroIndex(hero) {
        for (var i = 0; i < service.heroes.length; i++) {
            if (service.heroes[i] === hero) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Add a hero to the squad
     * 
     * @param {any} hero
     */
    function addHero(hero) {
        // make sure hero is not already in squad
        var heroIndex = _getHeroIndex(hero);
        var heroNotInSquad =  (heroIndex === -1 ? true : false);
        // also check to make sure we have not hit
        // max heroes in squad
        if (heroNotInSquad && !service.isFull()) {
            service.heroes.push(hero);
        }
    }

    /**
     * Return true if a hero exists in the squad
     * 
     * @param {Hero} hero
     * @returns {Boolean} True if hero is in squad
     */
    function contains(hero) {
        return (_getHeroIndex(hero) !== -1);
    }

    /**
     * Remove a hero from the squad
     * 
     * @param {any} hero
     */
    function removeHero(hero) {
        // find hero and remove from array
        var heroIndex = _getHeroIndex(hero);
        if (heroIndex !== -1) {
            service.heroes.splice(heroIndex, 1);
        }
    }

    /**
     * Get the maximum number of heroes in a squad
     * 
     * @returns {integer} Number of maximum heroes in a squad
     */
    function getMaxHeroes() {
        return numMaxHeroes;
    }

    /**
     * Set the maximum number of heroes
     * 
     * @param {integer} numHeroes
     */
    function setMaxHeroes(numHeroes) {
        numMaxHeroes = numHeroes;
    }

    /**
     * Return true if squad is full
     * 
     * @returns {boolean} True if squad is full, false if not
     */
    function isFull() {
        return (service.heroes.length === numMaxHeroes);
    }

    return service;
}