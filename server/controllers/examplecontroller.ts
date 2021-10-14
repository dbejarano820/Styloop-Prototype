// import { Bid } from '../models/bid';
// import { bid_data } from '../repositories/data_bid';

export class BidController {

    private static instance: BidController;
    private bid_repo: any;

    private constructor() {
        // this.log = new Logger();
        // this.bid_repo = new bid_data();
    }

    public static getInstance(): BidController {
        if (!this.instance) {
            this.instance = new BidController();
        }
        return this.instance;
    }



}

