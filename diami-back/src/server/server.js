const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
    }
}

module.exports = Server;