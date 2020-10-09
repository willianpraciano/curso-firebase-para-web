/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor( Math.random() * (NOMES.length - 1) )],
        idade: Math.floor(Math.random()* (40-18) + 18), //idade entre 18 e 40
        curtidas: 0,
    };

    /**
     * collection('colecao'): Seleciona a coleção, como se fosse um fichario, 
     *                        onde os documentos são guardados
     * doc('documento'): seleciona o documento a ser criado ou acessado
     * set(dados): Cria o documento passado como parâmetro se ele ainda não 
     *              existe, se ele já existe sobrescreve o documento
     */
    /*
    firebase.firestore().collection('cards').doc('1').set(card).then(()=>{
        console.log('Dados salvos');
        adicionaCardATela(card, 1);
    });
    */

    /**
     * .add({dados}): adiciona os dados dentro de um UID gerado automaticamente
     */
    firebase.firestore().collection('cards').add(card).then(()=>{
        console.log('Dados salvos');
        //adicionaCardATela(card);
    });



};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);

    /**
     * .delete() - Apaga o documento da coleção.
     * Obs.: Pode ser usado apenas em documentos.
     */
    firebase.firestore().collection('cards').doc(id).delete().then(()=>{
        card.remove();
    });

    /**
     * Para remover uma propriedade dp documento podemos dar .update()
     * passando como parâmetro a propriedade que será excluída e chamando
     * o método de .delete() ido de firebase.firestore.fieldValue
     */
    /*
    firebase.firestore().collection('cards').doc(id).update({curtidas: firebase.firestore.FieldValue.delete()})
        .then(()=>{
            console.log('Removido curtidas');
        });
    */

};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText; //converte para Number
    countNumber = countNumber + 1;

    /**
     * .update({dados}): Atualiza todos os dados passados no parametro. 
     * Obs.: Pode ser usado apenas em docs 
     */ 
    firebase.firestore().collection('cards').doc(id).update({curtidas: countNumber}).then(()=>{
        count.innerText = countNumber;
    });
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText; //converte para Number
    if(countNumber > 0){
        countNumber = countNumber - 1;
    }
    /**
     * .update({dados}): Atualiza todos os dados passados no parametro. 
     * Obs.: Pode ser usado apenas em docs 
     */ 
    firebase.firestore().collection('cards').doc(id).update({curtidas: countNumber}).then(()=>{
        count.innerText = countNumber;
    });
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    /**
     * .get() -  busca o resultado apenas uma vez
     */
    firebase.firestore().collection('cards').get().then(snapshot => {
        
        /**
         * snapshot.docs() - Acessa os Elementos dentro da coleção e retorna um 
         * objeto e deve se utilizar um forEach
         * 
         * snapshot.empty - É uma propriedade que retorna um booleano se o
         * snapshot estiver vazio
         *
         * snapshot.metadata - São os metadados da coleção
         *
         * snapshot.query - Retorna a query utilizada no filtro desse .get()
         *
         * snapshot.size - Retorna o número de documentos dentro dessa coleção
         *
         * snapshot.docCheges - Retorna um array com as mudanças que essa coleção
         * sofreu desde a ultima leitura
         */
            
        //console.log(snapshot);
        
        snapshot.docs.forEach(card => {
            /**
             * card.data() - Retorna os dados do meu documento
             *
             * card.id - retorna o UID do meu documento
             *
             * card.isEqual(card) - Booleano que retorna TRUE se o documento 
             * passado for igual ao documento utilizado. A chave e o ID ele NÃO 
             * compara. Serve para docs e collections
             */

            //console.log(card);
            //adicionaCardATela(card.data(), card.id);
        });
    });

    /**
     * .onSnapshot(): Observa mudanças em tempo real
     */
    
    firebase.firestore().collection('cards').onSnapshot(snapshot =>{
        snapshot.docChanges().forEach(card => {
            if(card.type == 'added'){
                adicionaCardATela(card.doc.data(), card.doc.id);
            }

            if(card.type == 'modified'){
                console.log('modified');
            }

            if(card.type == 'removed'){
                console.log('removed');
            }
        });
    });


});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}