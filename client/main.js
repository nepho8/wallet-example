import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import CoinStack from 'coinstack-sdk-js';

import './main.html';

Wallets = new Mongo.Collection('wallets');

var accessKey = "";
var secretKey = "";
//client = new CoinStack(accessKey, secretKey, 'testchain.blocko.io', 'https');

//L5edNknQjp2n7HYpDbnw2gi1cb4dYuCyDCJ18GR4NqvSJNAMKGyV, 13pCyB8Lqu9S3A8FRcjSiiW5USRmKnyWQY
//L1DE3xtKZGcfUtn5Y6q7geP2x12T1NZ49DqQT9kC3mGd8VffXVdQ, 16sudTXF68ndNFe7hj9LHYBVkXe7EfafHZ
//KyWgeoH1BvnRGf7wZgUKVXuLoCNTDDpUECV7HMuaLbTzAGRYZDDe, 1EG8sQYWuW8JzG2nD4ZhQKEDYm6X5Evwej
//L1rz1EP7htGi52ABBu7nYg1PZviVAW4pj9GdBwFaKQdVZUBgXxDi, 1Dfay8GJdHnVdCBaSgob3GG2dhjUu96dax
//L5awbk9hHRj1aoHXTJv2hx643cDw1knyV7Pqd4EGEnsk3SPgaD5W, 1Js4QuMgFwjhw88NoisJH68s7u5YKn59gG
/*
wallets = [
  { 'label': 'MyWallet 1', 'privatekey': 'L5edNknQjp2n7HYpDbnw2gi1cb4dYuCyDCJ18GR4NqvSJNAMKGyV' },
  { 'label': 'MyWallet 2', 'privatekey': 'L1DE3xtKZGcfUtn5Y6q7geP2x12T1NZ49DqQT9kC3mGd8VffXVdQ' },
  { 'label': 'MyWallet 3', 'privatekey': 'KyWgeoH1BvnRGf7wZgUKVXuLoCNTDDpUECV7HMuaLbTzAGRYZDDe' },
  { 'label': 'MyWallet 4', 'privatekey': 'L1rz1EP7htGi52ABBu7nYg1PZviVAW4pj9GdBwFaKQdVZUBgXxDi' },
  { 'label': 'MyWallet 5', 'privatekey': 'L5awbk9hHRj1aoHXTJv2hx643cDw1knyV7Pqd4EGEnsk3SPgaD5W' }
];

Session.set('wallets', wallets);
*/

Template.wallets.onCreated(function helloOnCreated() {
  Meteor.subscribe('wallets');
});

Template.wallets.onRendered(function () {
  
});

Template.wallets.helpers({
  wallets() {
    return Wallets.find({});
  },
  wallet() {
    if (Session.get('viewAddress')) {
      return Wallets.findOne({ _id: Session.get('viewAddress') });
    } else {
      return false;
    }
  },
  bitcoinAddress() {
    console.log(Session.get('viewAddress'));
    return Session.get('viewAddress');
  }
});

Template.wallets.events({
  'click #addAddress'(event, instance) {
    var walletName = window.prompt('Input Wallet Label!', 'Wallet Name');
    var key = CoinStack.ECKey.createKey();
    var address = CoinStack.ECKey.deriveAddress(key);

    wallet = {
      name: walletName,
      address: address,
      key: key
    };

    Meteor.call('addAddress', wallet, function (e, r) {
      if (e) {
        console.log(e);
        alert('error !');
      } else {
        alert('success !');
      }
    });

    console.log(Meteor.userId());
    console.log(wallet);
  },
  "click a[name='checkBalance']"(event, instance) {
    console.log('checkBalance');
    console.log($(event.currentTarget).attr('value'));

    var address = $(event.currentTarget).attr('value');
    Session.set('viewAddress', address);

    Meteor.call('checkBalance', address, function (e, r) {
      if (e) {
        console.log(e);
        console.log('error !');
      } else {
        console.log('success !');
      }
    });

    $('#qrcode').empty();
    $('#qrcode').qrcode({
      size: 150,
      text: 'bitcoin:' + address
    });
  }
});