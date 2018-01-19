import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import CoinStack from 'coinstack-sdk-js';

import './main.html';

var accessKey = "c7dbfacbdf1510889b38c01b8440b1";
var secretKey = "10e88e9904f29c98356fd2d12b26de";
client = new CoinStack(accessKey, secretKey, 'testchain.blocko.io', 'https');

//L5edNknQjp2n7HYpDbnw2gi1cb4dYuCyDCJ18GR4NqvSJNAMKGyV, 13pCyB8Lqu9S3A8FRcjSiiW5USRmKnyWQY
//L1DE3xtKZGcfUtn5Y6q7geP2x12T1NZ49DqQT9kC3mGd8VffXVdQ, 16sudTXF68ndNFe7hj9LHYBVkXe7EfafHZ
//KyWgeoH1BvnRGf7wZgUKVXuLoCNTDDpUECV7HMuaLbTzAGRYZDDe, 1EG8sQYWuW8JzG2nD4ZhQKEDYm6X5Evwej
//L1rz1EP7htGi52ABBu7nYg1PZviVAW4pj9GdBwFaKQdVZUBgXxDi, 1Dfay8GJdHnVdCBaSgob3GG2dhjUu96dax
//L5awbk9hHRj1aoHXTJv2hx643cDw1knyV7Pqd4EGEnsk3SPgaD5W, 1Js4QuMgFwjhw88NoisJH68s7u5YKn59gG

wallets = [
  { 'label': 'MyWallet 1', 'privatekey': 'L5edNknQjp2n7HYpDbnw2gi1cb4dYuCyDCJ18GR4NqvSJNAMKGyV' },
  { 'label': 'MyWallet 2', 'privatekey': 'L1DE3xtKZGcfUtn5Y6q7geP2x12T1NZ49DqQT9kC3mGd8VffXVdQ' },
  { 'label': 'MyWallet 3', 'privatekey': 'KyWgeoH1BvnRGf7wZgUKVXuLoCNTDDpUECV7HMuaLbTzAGRYZDDe' },
  { 'label': 'MyWallet 4', 'privatekey': 'L1rz1EP7htGi52ABBu7nYg1PZviVAW4pj9GdBwFaKQdVZUBgXxDi' },
  { 'label': 'MyWallet 5', 'privatekey': 'L5awbk9hHRj1aoHXTJv2hx643cDw1knyV7Pqd4EGEnsk3SPgaD5W' }
];

Session.set('wallets', wallets);

Template.wallets.onCreated(function helloOnCreated() {
  /*privKey = CoinStack.ECKey.createKey();
  addr = CoinStack.ECKey.deriveAddress(privKey);
  console.log(privKey);
  console.log(addr);
  */
  /*
  var txBuilder = client.createTransactionBuilder();
  txBuilder.addOutput("13pCyB8Lqu9S3A8FRcjSiiW5USRmKnyWQY", CoinStack.Math.toSatoshi("100"));
  txBuilder.setInput("");
  txBuilder.setFee(CoinStack.Math.toSatoshi("0.0001"));

  txBuilder.buildTransaction(function (err, tx) {
    tx.sign("");
    var rawSignedTx = tx.serialize();
    console.log(rawSignedTx)
    client.sendTransaction(rawSignedTx, function (err) {
      if (null != err) {
        console.log("failed to send tx");
      }
    });
  });
  */


  client.getBlockchainStatus(function (err, status) {
    console.log(status.best_block_hash, status.best_height);
  });
  client.getBalance('13pCyB8Lqu9S3A8FRcjSiiW5USRmKnyWQY',
    function (err, balance) {
      console.log(CoinStack.Math.toBitcoin(balance) + ' BTC');
    }
  );
});

Template.wallets.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  walltes() {
    return Session.get('wallets');
  }
});

Template.wallets.events({
  'click button'(event, instance) {
    //instance.counter.set(instance.counter.get() + 1);
  },
});
