function loginGithub() {
  //Cria uma nova instancia do provedor de login do facebook
  var provider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithPopup(provider).then(resposta => {
    console.log('Usuário: ', resposta.user);
    console.log('Token: ', resposta.credential.accessToken);
  }).catch(erro => {
    console.log('Erro login com Google: ', erro);
  });
}