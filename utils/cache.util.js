
class Cache {
    constructor(defaultTTL = 5 * 60 * 1000) { 
        this.defaultTTL = defaultTTL;
        this.store = new Map();
    }
    /**
     *
     * @param {string} key 
     * @param {*} value 
     * @param {number} ttl
     */
    set(key, value, ttl = this.defaultTTL) {
        const expiry = Date.now() + ttl;
        this.store.set(key, { value, expiry });
    }

    /**
     * 
     * @param {string} key 
     * @returns {* | null}
     */
    get(key) {
        const entry = this.store.get(key);

        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            this.store.delete(key); 
            return null;
        }

        return entry.value;
    }

    delete(key) {
        return this.store.delete(key);
    }
    clear() {
        this.store.clear();
    }
}

const cache = new Cache();
export default cache;
