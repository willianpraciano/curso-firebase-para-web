  /**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

/**
 * Referencia para o storage do firebase criando uma pasta com o nome de arquivos; 
 */
var ref = firebase.storage().ref('arquivos');

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    var arquivo = event.target.files[0]; //Força para que só seja selecionado 1 arquivo, o da posição [0]

    /**
     * .child(nome) - Acessar o caminho para inserir o arquivo.
     * .put(arquivo) - insere o arquivo
     */
    ref.child('arquivo').put(arquivo).then(snapshot => {
      console.log('snapshot', snapshot);

      /**
       * .getdownloadURL() - Retorna a url para baixar/mostrar o arquivo enviado
       */
      ref.child('arquivo').getDownloadURL().then(url => {
        console.log('String para download: ', url)
      });
    });
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {

}