/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];

/**
 * firabase: objeto global
 * database(): metodo para acesso ao Realtime Database
 * ref(): url em string para referencia do caminho do banco
 */
var ref = firebase.database().ref('card/');

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
     * firabase: objeto global
     * database(): metodo para acesso ao Realtime Database
     * ref(): url em string para referencia do caminho do banco
     * set(): metodo que cria dados na url passada 
     * child(): Acessa o nó filho passado por parametro
     */
    
    /*
    //Acessando o nó pelo caminho completo
    firebase.database().ref('card/'+ card.nome ).set(card).then(()=>{
       adicionaCardATela(card);
    });
    */

    /*
    //Criando um filho no nó de referencia previamente declarado
    ref.child(card.nome).set(card).then(()=>{
        adicionaCardATela(card);
    });
    */

    /**
     * push(): cria um nó com id unico e insere os dados dentro desse uid
     */
    //Usando o push() para criar um filho com id unico 
    ref.push(card).then(snapshot =>{
        adicionaCardATela(card, snapshot.key);
    });



};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);
    
    //.remove(): remove o nó selecionado, além de remover também todos os nós dentro dele
    ref.child(id).remove().then(()=>{
        //remove da tela
        card.remove();
    });

    /*
    //set(null): Ao settar um nó em nulo, exclui esse nó do firebase
    ref.child(id).set(null).then(()=>{card.remove()});
    */
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText; //o "+" Converte para um número sem precisar usar o Number()
    countNumber = countNumber + 1;

    //.set(): Pode ser pacessado diretamente o objeto que a ser atualizado settando o valor atualizado
    //ou pode se passar o objeto completo e atualiza-lo com os novos valores nos campos correspondentes
    ref.child(id + '/curtidas').set(countNumber).then(()=>{
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
    var countNumber = +count.innerText; //o "+" Converte para um número sem precisar usar o Number()
    if(countNumber>0){ //curtidas não podem ser negativas
        countNumber = countNumber - 1;

        //.update({}): recebe um objeto, e apenas um objeto, e atualiza as propriedades desse objeto
        ref.child(id).update({curtidas: countNumber}).then(()=>{
            count.innerText = countNumber;
        });
    }
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    
    /**
     * Once(): retorna os dados lidos de uma URL
     * snapshot: objeto retornado pela leitura
     */
    /*
     ref.once('value').then(snapshot => {
        console.log(snapshot.val());

        //acessa um nó filho
        console.log('child', snapshot.child('-MFzhJCagbsIfanpw9E3').val() );
        
        //checa se existe algo no snapshot
        console.log('exists()', snapshot.exists() );

        //checa se existe um filho passado na URL
        console.log('hasChild() nome', snapshot.hasChild('-MFzhJCagbsIfanpw9E3/nome'));
        console.log('hasChild() comentario', snapshot.hasChild('-MFzhJCagbsIfanpw9E3/comentario'));
        
        //Chega se existe algum filho no nó
        console.log('hasChildren()', snapshot.child('-MFzhJCagbsIfanpw9E3').hasChildren());
        
        //Retorna o número de Filhos no snapshot
        console.log('numChildren()', snapshot.numChildren());

        //Retorna a chave desse snapshot/caminho
        console.log('chave', snapshot.key);

        snapshot.forEach(value => {
            adicionaCardATela(value.val(), value.key);
        });

    });
    */
    

    //=================================//
    //======TRABALHANDO COM .on()======//
    //=================================//

    /**
     * ref.on('value', ()=>{}); : Monitora constantemente todos as mudanças e o 
     * snapshot trás SEMPRE todos os dados.
     */
    /*
    ref.on('value', snapshot =>{
        snapshot.forEach(value => {
            adicionaCardATela(value.val(), value.key);
        });
    });
    */

    /**
     * ref.on ('child_added, ()=>{}); - na primeira vez que é executado ele puxa 
     * todos os dados da refeência, porém, um nó por vez. Depois disso, é criado um
     * observável que para cada novo item inserido, que dispara e pega apenas este
     * novo ítem, assim, ele não pega todos os dados novamente.
     * 
     * Obs.: Não monitora alteração, remoção ou outros eventos. Ele apenas monitora
     * a adicção de um nó que seja FILHO IMEDIATO da referência, ou seja, ela também
     * não monitora nós dentro de nós que são adicionados
     */
    /*    
   ref.on('child_added', snapshot => {
       adicionaCardATela(snapshot.val(), snapshot.key);
   });
   */

   /**
    * ref.on('child_changed', ()=>{}); - monitoa qualquer mudança em um nó filho
    * seja adição. exclusão ou alteração de alguma propriedade.
    * 
    * Obs.: No callback, além do snapshot, é possível utilizar um 'uid' que é a 
    * chavedo nó filho da referência que está antes do nó alterado.Se não houver
    * um nó anterior ele devolve null
    */
   /*
   ref.on('child_changed', (snapshot, uid)=> {
       console.log(snapshot.key, uid);
   });
   */


   /**
    * ref.on('child_removed', ()=>{}); - Este metodo é disparado se algum nó
    * FILHO IMEDIATO da referência é removido.
    */
   /*
   ref.on('child_removed', snapshot => {
       console.log('removed', snapshot.key);
   });
   */

   
   //=================================//
   //======ORDENAÇÃO COM O .on()======//
   //=================================//

   //A ordenação deve ser feita depois da referencia e anres do metodos de leitura (.on())
   //A ordenação só funciona com o método .on()
   //ATENÇÂO!!! Só é possível usar um método de ordenação por vez

   /**
    * .orderByChild('filho') - ordena pela propriedade filho passado como parametro
    */
   /*
   ref.orderByChild('idade').on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key);
   });
   */

   /**
    * .orderByKey() - ordena pelo id, como as keys automaticas usam o datetime
    * para serem criados, os elementos no Firebase já são ordenados assim por padrão,
    * mas se você mesmo estiver criando os ids(keys) então este ordenamento terá efeito
    */
   /*
   ref.orderByKey().on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key);
    });
    */

    /**
    * .orderByValue() - ordena pelo valor de cada propriedade dentro do nó, não
    * vale para nós que tenham como filhos outros nós
    */
   /*
   ref.child('-MHcdroiHrIBSb_zSdej').orderByValue().on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key);
    });
    */


    //=================================//
    //====== FILTRANDO O RETORNO ======//
    //=================================//
    
    /**
     * .starAt(): trás todos os nós começando a partir do nó passado na query
     * .endAt():  trás valores desde o inicio da query até o valor passado com parâmetro (que vai ser o ultimo).
     * .equalTo(): trás apenas os vilhos cujos valores são iguais ao valor passado como parâmetro
     */
    //Vai trazer os filhos com idade de 25 até 35 anos
    /*
    ref.orderByChild('idade').startAt(25).endAt(35).on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key);
    });
    */
   
    //Vai trazer os filhos com idade igual a 32 anos
    ref.orderByChild('idade').equalTo(32).on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key);
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
    inner.classList.add('row');
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