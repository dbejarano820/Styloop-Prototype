import * as express from 'express';
import { UserController } from '../controllers/usercontroller';

const app = express.Router();


app.put("/create", (req, res, next) => {                   //requerimiento de crear usuario
    UserController.getInstance().createUser(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/update", (req, res, next) => {                   //parte de requerimiento de crear usuario
    UserController.getInstance().updateUser(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/addPaymentMethod", (req, res, next) => {                   //requerimiento de crear usuario
    UserController.getInstance().addPaymentMethodUser(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/buyitem", (req, res, next) => {                   //requerimiento de crear usuario
    UserController.getInstance().buyItem(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});


export { app as userrouter }