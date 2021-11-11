import * as mongoose from 'mongoose';


class Db {
    public conn: any;

    constructor() {
        mongoose
            .connect('mongodb://localhost:27017/styloop')
            .catch(e => {
                console.error('Connection error', e.message)
            })
        this.conn = mongoose.connection
    }

}


export default new Db().conn

