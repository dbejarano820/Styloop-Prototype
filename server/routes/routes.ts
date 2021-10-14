import * as express from "express";
// import {bidrouter} from './bidrouter';
// import {offerrouter} from './offerrouter'

class Routes {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        // this.express.use('/bid', bidrouter);
        // this.express.use('/offer', offerrouter);
    }
}

export default new Routes().express;