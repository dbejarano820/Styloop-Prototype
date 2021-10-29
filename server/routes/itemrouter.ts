import * as express from 'express';
import { ItemController } from '../controllers/itemcontroller';

const app = express.Router();


app.put("/create", (req, res, next) => {                   //requerimiento de cargar prenda
    ItemController.getInstance().createItem(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});


app.get("/list", (req, res, next) => {                   //no es un requerimiento filtar prendas
    ItemController.getInstance().listItems(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.get("/info", (req, res, next) => {                   //ver informacion de una prenda
    ItemController.getInstance().infoItem(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/writereview", (req, res, next) => {                   //escribir resaña
    ItemController.getInstance().writeReview(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

export { app as itemrouter }