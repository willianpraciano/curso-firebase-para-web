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
        console.log('String para download: ', url);
      });
    });
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(arquivo);
  reader.onload = function() {
    console.log(reader.result); //retorna uma string que começa com 'base64,afaffdfsdfdf'
    
    /**
     * Para pasar a string para o firebase é necessário remover o 'base64,',
     * então usa-se o split, que dividde a string em duas, 
     * sedo a posição [0] é a parte 'base64'
     * então pega-se a posição [1]
     */
    const base64 = reader.result.split('base64,')[1];

    /**
     * .putString(string, formato, metadados) - Salva uma string no firebase, onde é possível
     * colocar um formato de imagem para que automaticamente converta para um png 
     */
    ref.child('images').putString(base64, 'base64', {contentType: 'image/png'}).then(snapshot => {
      console.log('snapshot', snapshot);

      ref.child('images').getDownloadURL().then(url => {
        console.log('string para download', url);
      });
    });
  }

}