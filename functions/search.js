const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

const ALGOLIA_APP_ID = "MK4FKGQT13";
const ALGOLIA_ADMIN_KEY = "ba1b94d1a04d56ce12f5195c103ef1f6";
const ALGOLIA_INDEX_NAME = "products";

exports.addFirestoreDataToAlgolia = functions.https.onRequest(
  (request, response) => {
    var arr = [];
    admin
      .firestore()
      .collection("products")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          let product = doc.data();
          product.objectID = doc.id;
          arr.push(product);
        });

        var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
        var index = client.initIndex(ALGOLIA_INDEX_NAME);

        return index
          .saveObjects(arr)
          .then((context) => {
            return response.status(200).send(context);
          })
          .catch((err) => response.status(402).send(err));
      })
      .catch((err) => {
        response.status(402).send(err);
      });
  }
);

exports.onProductCreated = functions.firestore
  .document("products/{productId}")
  .onCreate((snap, context) => {
    const product = snap.data();
    product.objectID = context.params.productId;
    var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(product);
  });

exports.onProductUpdated = functions.firestore
  .document("products/{productId}")
  .onUpdate((snap, context) => {
    const product = snap.data();
    product.objectID = context.params.productId;
    var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.partialUpdateObject(product);
  });

exports.onProductDeleted = functions.firestore
  .document("products/{productId}")
  .onDelete((snap, context) => {
    var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(context.params.productId);
  });