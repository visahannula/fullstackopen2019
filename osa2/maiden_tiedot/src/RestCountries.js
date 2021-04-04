import axios from 'axios';

/**
 * Data fetching class for restcountries.eu
 * */
export class RestCountries {
    baseURL = 'https://restcountries.eu/rest/v2';
    paths = {
        name: '/name/',
        alpha3: '/alpha/',
        all: '/all'
    }
    axiosConfig = {
        responseType: 'json',
        headers: { "Accept": "application/json" },
        timeout: 5000
    }
    _filters = []; // for example ["name", "nativeName", "alpha3Code"]

    get filters() {
        return this._filters;
    }

    set filters(fields) {
        console.log("Setting filters: ", fields);
        if (Array.isArray(fields)) {
            this._filters = fields.map(field => encodeURIComponent(field));
        } else {
            this._filters = [encodeURIComponent(fields)];
        }
        return this.filters;
    }

    createFilterFieldsURIParams() {
        return this.filters.length > 0 ? "fields=" + this.filters.join(";") : "";
    }

    createEndpointURL(path, param = "", filters) {
        if (!(path in this.paths)) {
            throw new Error('Endpoint not found!');
        }

        let URL = this.baseURL + this.paths[path] + encodeURIComponent(param);
        if (this.filters.length > 0) URL += "?" + this.createFilterFieldsURIParams();
        
        return URL;
    }

    async getEndpoint(URL, callback) {
        console.info("Going to GET: " + URL);
        try {
            const response = await axios
                .get(URL, this.axiosConfig);
            return this._successHandler({ response, callback });
        } catch (error) {
            return this._errorHandler({ error, callback, endpoint: URL });
        }
    }

    _errorHandler({ error, endpoint, callback }) {
        console.log(`Error getting data from endpoint "${endpoint}": `, error);
        return callback(false);
    }

    _successHandler({ response, callback }) {
        console.log("Got response: ", response.data);
        return callback(response.data);
    }
    /**
    * Get a single country using provided name.
    * Calls Callback with response.
    * @param {string} countryName Countryname to search for
    * @param {function} callback Callback
    */
    name(countryName, callback) {
        if (!countryName || !callback) throw new Error("Error. Cannot get data. No countryName or callback given.");

        const endpoint = this.createEndpointURL('name', countryName);
        return this.getEndpoint(endpoint, callback);
    }

    /**
     * Get countries
     * @param {string} code 3 character Country Code
     * @param {function} callback Function to call with response
     * @returns 
     */
    alpha3code(code, callback) {
        if (!code || !callback) throw new Error("Error. Cannot get data. No countryCode or callback given.");

        const endpoint = this.createEndpointURL('alpha3', code);
        return this.getEndpoint(endpoint, callback);
    }

    /**
     * Get all countries and return a callback.
     * @param {function} cb Callback function
     */
    all(callback) {
        if (!callback) throw new Error("Error. Will not get data. No callback given.");

        const endpoint = this.createEndpointURL('all');
        return this.getEndpoint(endpoint, callback);
    }
}

export default RestCountries;
