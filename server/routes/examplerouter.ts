import * as express from 'express';
import { OfferController } from '../controllers/offercontroller';

const app = express.Router();
const log = new Logger();

app.put("/create", (req, res, next) => {
    OfferController.getInstance().createOffer(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            log.error(err);
            return "";
        });
});

export { app as offerrouter }