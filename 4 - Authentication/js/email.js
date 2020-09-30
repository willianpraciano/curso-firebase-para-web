
var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  //Criando um usuário com Email e Senha
  firebase.auth().createUserWithEmailAndPassword(email, senha).then(user =>{
    console.log('Usuario: ', user);
    alert('Usuario criado e logado');
  }).catch(err=>{
    console.log('[Erro]', error);
  });
}

/**
 * Função para login
 */
function loginEmail() {
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  //Faaz Login e autentica o usuário com email e senha
  firebase.auth().signInWithEmailAndPassword(email, senha).then(()=>{
    alert('Usuário logado!!!');
  });

}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {

  //observa se há um usuário e mudanças na autenticação (login e logout)
  firebase.auth().onAuthStateChanged((usuario)=>{
    if(usuario){
      console.log('Usuário: ', usuario);
      currentUser = usuario;

    }else{
      console.log('Não há usuario logado!');
    }
  });

  //Pega os dados do usuario atual
  currentUser = firebase.auth().currentUser;

  if(currentUser){ //Não vai entrar aqui por problemas de concorrencia (quando chega aqui ainda está testando se há usuários)
    console.log('currentUser: ', currentUser);
    
    /**
     * Metodos para atualizar dados de usuario criados no auth()
     */
    currentUser.updateProfdile({
      displayName: "Willian Praciano",
      phtoURL: ''
    });

    currentUser.updateEmail('willianspraciano@gmail.com');
    currentUser.updatePassword('87654321');
    currentUser.updatePhoneNumber('+5588996304042');

  }

});

/**
 * Deleta um usuário
 */
function deletaUsuario(){
  if(currentUser){
    currentUser.delete().then(()=>{
      alert('Usuário excluido');
    });
  }
}