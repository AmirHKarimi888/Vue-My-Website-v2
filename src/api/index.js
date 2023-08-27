import axios from "axios";

export const url = "https://64b3e8910efb99d8626884f1.mockapi.io/my-website/v2/";

const Actions = class {
    constructor() {

    }

    async get(url, data) {
        await axios.get(url).then(data);
    }

    async post(url, data) {
        await axios.post(url, data);
    }

    async put(url, data) {
        await axios.put(url, data);
    }

    async delete(url) {
        await axios.delete(url);
    }

}

export const Action = new Actions();