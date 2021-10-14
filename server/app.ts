import * as express from "express";
import Routes from './routes/routes';
import * as mongoose from 'mongoose';
import * as database from "./db"
import path = require("path");

class App {

    public app: express.Application;
    public db: any;

    constructor() {
        this.db = database.default;
        this.app = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.app.use('/api', Routes);

        this.app.use('*', (req, res) => {
            res.send("Request invalido");
        });
    }
}

export default new App().app;