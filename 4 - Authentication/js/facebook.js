function loginFacebook() {

  //Cria uma nova instancia do provedor de login do facebook
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(resposta => {
    console.log('Usuário: ', resposta.user);
    console.log('Token: ', resposta.credential.accessToken);
  }).catch(erro => {
    console.log('Erro login com facebook: ', erro);
  });
}

/**
 * O Facebook só aceita logar na aplicação se ela estiver rodando em um 
 * servidor https, para isso é necessário:
 * 0 - Instalar o mkcert (https://github.com/FiloSottile/mkcert)
 * Dentro da pasta do index.html:
 * 1 - instalar os certificados com os comandos: mkcert -install && mkcert localhost
 * 2 - instalar o pacote npm http-server globalmente: npm i -g http-server
 * 3 - Rodar o comando: http-server -S -C ./localhost.pem -K ./localhost-key.pem
 */
