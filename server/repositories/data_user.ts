import { AnyKeys } from 'mongoose';
import { User, UserModel } from '../models/user';

export class user_data {
    public constructor() {

    }
    public create(data: any) {
        const newUser = new UserModel(data);
        return newUser.save();
    }

    public update(user: any, data: any) {
        return UserModel.updateOne(user, data)
    }

    public addPaymentMethod(user:any, data:any) {
        return UserModel.updateOne(user, {"$push" : {"paymentmethods" : data}})
    }

    public buyItem(user:any, data:any) {
        return UserModel.updateOne(user, {"$push" : {"purchases" : data}})
    }

}

