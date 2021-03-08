/* Data fetching class */
import axios from 'axios';


class RestCountries {
    constructor() {
        this.baseURL = 'https://restcountries.eu/rest/v2';
        this.pathName = '/name/';
        this.pathAll = '/all';
        this._filters = [];
    }

    get filters() {
        return this._filters;
    }

    set filters(value) {
        console.log("Setting filter", value);
        if (Array.isArray(value)) {
            this._filters = value;
        } else {
            this._filters = [value];
        }
    }

    /**
     * Get a single country using provided name.
     * Calls Callback with response.
     * @param {String} name Countryname to search for
     * @param {Function} cb Callback
     */
    name(name, cb) {
        if (!name || !cb) return false;

        console.log("Getting: " + this.baseURL + this.pathName + encodeURIComponent(name));

        axios
            .get(this.baseURL + this.pathName + encodeURIComponent(name))
            .then(response => {
                console.log("Got response: ", response);
                return cb(response.data);
            })
            .catch(error => {
                console.log("Error getting data: ", error);
                return cb(false);
            });
    }

    /**
     * Get all countries and return a callback.
     * @param {Function} cb Callback function
     */
    all(cb) {
        const URI = "".concat(`${this.baseURL}${this.pathAll}`, 
            this.filters.length > 0 ? "?fields=" + this.filters.join(";") : "");

        console.log("Getting: " + URI);

        axios
            .get(URI)
            .then(res => {
                console.log("Got response: ", res);
                return cb(res.data);
            })
            .catch(error => {
                console.log("Error getting data: ", error);
                return cb(false);
            });
    }
}

export default RestCountries;
