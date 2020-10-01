function logout() {
  /**
   * Este metodo de signOut é feito para deslogar o usuário em
   * qualquer metodo de login
   */
  firebase.auth().signOut().then(()=>{
    alert('Usuário saiu!');
  });

}


/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
  //nova instancia do firebaseui
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Configurações do firebaseui
  var config = {
    callbacks : {
      signInSuccessWithAuthResult: function(authResult){
        console.log('authResult', authResult);
        return false;
      }
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup'
  };

  // Inicializa o firebaseui
  ui.start('#firebaseui-auth', config); // Só é executado depois de a DOM estar carregada
});