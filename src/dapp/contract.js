import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';

export default class Contract {
    constructor(network, callback) {

        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.initialize(callback);
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
        this.airlineName = ['BCNDFS1','BCNDFS2','BCNDFS3','BCNDFS4','BCNDFS5'];
        this.passengersName = ['INPA1','INPA2','INPA3','INPA4','INPA5'];
        this.flights = {
            'BCNDFS1':['AB1','AB2','AB3'],
            'BCNDFS2':['CD1','CD2','CD3'],
            'BCNDFS3':['EF1','EF2','EF3'],
            'BCNDFS4':['GH1','GH2','GH3'],
            'BCNDFS5':['IJ1','IJ2','IJ3']
        }
    }

    initialize(callback) {
        this.web3.eth.getAccounts((error, accts) => {
           
            this.owner = accts[0];

            let counter = 1;
            
            while(this.airlines.length < 5) {
                this.airlines.push(accts[counter++]);
            }

            while(this.passengers.length < 5) {
                this.passengers.push(accts[counter++]);
            }

            callback();
        });
    }

    isOperational(callback) {
       let self = this;
       self.flightSuretyApp.methods
            .isOperational()
            .call({ from: self.owner}, callback);
    }

    fetchFlightStatus(flight, callback) {
        let self = this;
        let payload = {
            airline: self.airlines[0],
            flight: flight,
            timestamp: Math.floor(Date.now() / 1000)
        } 
        self.flightSuretyApp.methods
            .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
            .send({ from: self.owner}, (error, result) => {
                callback(error, payload);
            });
    }
    registerAirline(fromairline,airlinetoregister,callback){
        let self = this;

        self.flightSuretyApp.methods.registerAirline(airlinetoregister.toString()).send({
            from: fromairline, gas: 1000000
        }, (error, result)=>{
            callback(error, result);
        });
    }
    sendFunds(airline,funds,callback){
        let self = this;
        const fundstosend = self.web3.utils.toWei(funds, 'ether');
        console.log(fundstosend);

        self.flightSuretyApp.methods.AirlineFunding().send({
            from: airline.toString(), value: fundstosend
        },(error, result)=>{
            callback(error, result);
        });
    }
    purchaseInsurance(airline, flight, passenger, amount, timestamp, callback){
        let self = this;

        const insuranceAmnt = self.web3.utils.toWei(amount, 'ether');
        console.log(insuranceAmnt);

        ts = timestamp;
        self.flightSuretyApp.methods.registerFlight(airline.toString(), flight.toString(), ts).send({
            from: passenger.toString(), value: insuranceAmnt, gas: 1000000
        }, (error, result)=>{
            callback(error, result);
        });
    }
    withdraw(passenger, wAmnt, callback){
        let self = this;
        const withdrawAmnt = self.web3.utils.toWei(wAmnt,'ether');

        self.flightSuretyApp.methods.withdrawFunds(withdrawAmnt).send({
            from: passenger.toString()
        }, (error, result)=> {
            callback(error, result);
        });
    }
    getBalance(passenger, callback){
        let self = this;

        self.flightSuretyApp.methods.getBalance().call({
            form: passenger
        }, (error,result)=>{
            callback(error, result);
        });
    }
}