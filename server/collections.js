import { Mongo } from 'meteor/mongo';
//import CoinStack from 'coinstack-sdk-js';

Wallets = new Mongo.Collection('wallets');

var accessKey = "";
var secretKey = "";
client = new CoinStack(accessKey, secretKey, 'testchain.blocko.io', 'https');

Meteor.publish('wallets', function () {
    return Wallets.find({
        user: this.userId
    });
});

Meteor.methods({
    'addAddress'(walletAttributes) {
        var user = Meteor.user();
        if (!user)
            throw new Meteor.Error('NOT_LOGGED_IN', "needs to be logged in");

        if (!walletAttributes.name) {
            throw new Meteor.Error('NAME_EMPTY', "name empty");
        }

        var userId = Meteor.userId();
        walletAttributes._id = walletAttributes.address;
        walletAttributes.user = userId;
        walletAttributes.createAt = new Date();

        Wallets.insert(walletAttributes);

        return true;
    },
    'checkBalance'(address) {
        console.log('checkBalance');
        console.log(address);

        walletAttributes = {};
        walletAttributes._id = address;
        walletAttributes.user = Meteor.userId();

        client.getBalance(address, function (err, balance) {
            console.log(balance);
            walletAttributes.balance = balance;

            Wallets.update({
                _id: walletAttributes._id,
                user: walletAttributes.user
            }, {
                $set: {
                    balance: walletAttributes.balance
                }
            });
        });
    }
});