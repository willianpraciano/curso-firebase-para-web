  /**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

/**
 * Referencia para o storage do firebase criando uma pasta com o nome de arquivos; 
 */
var ref = firebase.storage().ref('arquivos');
var tarefaDeUpload;

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    var arquivo = event.target.files[0]; //Força para que só seja selecionado 1 arquivo, o da posição [0]
    var uid = firebase.database().ref().push().key; //Esse metodo faz com que ele crie uma chave para você sem inserir nada no realtime
    /**
     * .child(nome) - Acessar o caminho para inserir o arquivo.
     * .put(arquivo) - insere o arquivo
     */
    /*
    ref.child(uid).put(arquivo, {
      customMetadata: {
        nome: 'Curriculo'
      }
    }).then(snapshot => {
      console.log('snapshot', snapshot);

      // .getdownloadURL() - Retorna a url para baixar/mostrar o arquivo enviado
      ref.child(uid).getDownloadURL().then(url => {
        console.log('String para download: ', url);
      });

      ref.child(uid).getMetadata().then(metadata => {
        console.log('metadados: ',metadata);
      });
    });
    */
    
    //METADADOS
    //Inserindo metadados
    /*
    ref.child('arquivo').put(arquivo, {
      customMetadata: {
        nome: 'Curriculo',
        descricao: 'Curriculo atualizado',
      }
    });
    */

    /**
     * Buscando metadados
     * getMetadata: retorna os metadados do arquivo inserido
     */
    /*
    ref.child('arquivo').getMetadata().then(metadata => {
      console.log(metadata);
    });
    */

    //Atribui a tarefa de upload à variável e executa essa tarefa ao executar o .put()
    tarefaDeUpload = ref.child(uid).put(arquivo);

    /**
     * .on('state_changed, observavel_upload(), error(), completou() );
     */
    tarefaDeUpload.on('state_changed', upload =>{
      console.log('Mudou o estado', upload);

      //.state retorna o estado do upload, pode ser 'running', 'paused' ou 'sucess'
      if(upload.state == 'running'){
        //.bytesTransfered são os bytes transferidos até o momento
        //.totalBytes são os bytes
        var progresso = Math.round((upload.bytesTransferred/upload.totalBytes)*100);
        console.log(`${progresso}%`);
      }

    }, error =>{
      console.log('Ocorreu um erro', error);
    }, () => {
      console.log('Completou a tarefa');
      ref.child(uid).getDownloadURL().then(url => {
        console.log(url);
      });
    });

    /*
    tarefaDeUpload.then(snapshot => {
      console.log('Snapshot: ', snapshot);
    }).catch(error => {
      //Pega o erro, que no caso é gerado pelo cancelamento da tarefa
      console.log('Error: ', error);
    });
    */


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

//deleta um arquivo
function deletar(){
  ref.child('-MJl-ZnBqIV7-amKpMoA').delete().then(()=>{
    console.log('Deletou com sucesso!');
  }).catch(error => {
    console.log('Erro: ', error);
  });
}

//pausa a tarefa de upload  
pausar = function() {
  tarefaDeUpload.pause();
  console.log('Pausou tarefa');
}

//continua a tarefa de upload  
continuar = function() {
  tarefaDeUpload.resume();
  console.log('Continuou tarefa');
}

//cancela a tarefa de upload  
cancelar = function() {
  tarefaDeUpload.cancel();
  console.log('Cancelou tarefa');
}