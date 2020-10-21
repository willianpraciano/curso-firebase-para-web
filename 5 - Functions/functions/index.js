const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    apiKey: "AIzaSyDmFOEcBFfrnB7Os4Vmm4C-TGr4H5eSgAI",
    authDomain: "cursofirebase-73142.firebaseapp.com",
    databaseURL: "https://cursofirebase-73142.firebaseio.com",
    projectId: "cursofirebase-73142",
    storageBucket: "cursofirebase-73142.appspot.com",
    messagingSenderId: "1068246595275",
    appId: "1:1068246595275:web:f2997fe5a11a52f7794d4e",
    measurementId: "G-PP6B0GTL2L"
});

/**
 * Para excluir alguma função basta dar um deploy sem esta função no index.js 
 */
 exports.addCard = functions.https.onRequest((request, response) => {
   let card = JSON.parse(request.body);

   admin.database().ref('card').push(card).then(()=>{
     response.status(200).send('Gravação realizada com sucesso');
   }, error => {
     response.status(500).send(error);
   });
 });

 /**
  * É possível criar observaveis em certos ecentos do banco e em rotas no Realtime Database
  * utilizando alguns métodos:
  * .onCreate - ao criar um novo dado no nó
  * .onUpdate - ao atualizar um dado em um nó
  * .onDelete - ao excluir um dado em um nó
  * .onWrite - ao executar qualquer uma das funções anteriores
  */

  exports.updateCount = functions.database.ref('/card/{pushId}').onCreate((snapshot, context)=>{
    // .onCreate((snapshot, context)): snapshot é o dado atual / contexto é da chamada
    admin.database().ref('card').once('value').then(snap =>{
      admin.database().ref('contagem').set(snap.numChildren()).then(()=>{
        //é preciso retornar um dado ou uma promessa
        return snap.numChildren();
      });
    });
  });


/**
 * Passando o nome de usuário para MAIUSCULO nos documentos do Firestore
 */

 exports.updateName = functions.firestore.document('/cards/{userId}').onCreate((snapshot, context) => {
   let nome = snapshot.data().nome;
   nome = nome.toUpperCase();

   admin.firestore().collection('cards').doc(snapshot.id).update({nome}).then(()=>{
     return nome;
     
   });
 });