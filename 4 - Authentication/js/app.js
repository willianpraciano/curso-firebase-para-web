function logout() {
  /**
   * Este metodo de signOut é feito para deslogar o usuário em
   * qualquer metodo de login
   */
  firebase.auth().signOut().then(()=>{
    alert('Usuário saiu!');
  });

}