// VERSÃO 16 JUNHO 2023

/* AQUI vamos fazer os controles, as regras de negócios
variaveis e função, atributos e metodos (pq dentro da classe)
objeto representante da classe - instancia
CONSTRUCTOR: nome dado ao método construtor
PARÂMETROS: informações que a função precisa para que o construtor funcione
ENCAPSULAMENTO: processo que controla o acesso a um atributo
ENCAPSULAMENTO: public[todos acessm], protected[atributos e métodos da mesma classe e classe Pai]
ENCAPSULAMENTO: private[somente atributos e métodos da própria classe]
this._ : privado
um objeto não deveria chamar um objeto privado?
VALORes de ATRIBUTOS: atribuir ou recuperar
getters e setters: métodos que permitem definir como acessar os valores */

 // var declara variável 
        // this: cria em vários lugares da classe. 
        // this: Faz referência ao objeto que foi instanciado nesta classe

/* 

get displayCalc() {

    return this._displayCalc;
}

o get só me devolve o valor dele com qq regra

set displayCalc(valor/argumento/parâmetro){ se eu vou definir precisa de um parâmetro??
    this._displayCalc = valor;

}

mudar o valor

TESTE
Método construtor é aquele que é chamado automaticamente quando existe a instância de uma classe
Atributos podem possuir encapsulamento: controlar quem pode ou não conversar com ele
Criar get and set do atributo para controlar

Instância é o objeto que representa uma classe
Em uma aplicação Web. as camdas responsáveis por:
1) tratar os dados da aplicação - MODEL
2) exibir as informações em nosso navegador  - VIEW

this ---> Palavra que usamos para fazer referência ao próprio objeto dentro de uma classe

*/

class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display"); // guarda a informação que está na tela
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();  
        this.initButtonsEvents();

    }

    initialize(){
        this.setDisplayDateTime()


        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);

        /* antes: 
        {
        this.displayDate = this.currentDate.toLocaleDateString('pt-br')
        }, 1000);
        */

    } 
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => { 
            element.addEventListener(event, fn, false);
        })
    }
    clearAll(){
        this._operation = [];
    }
    clearEntry(){
        this._operation.pop();
    }
    getLastOperation(){
        return this._operation[this._operation.length-1] = value;
    }

    setLastOperation(value){
        this._operation[this._operation.length-1];

    }

    isOperator(value){
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);
       
        if(this._operation.length > 3) {
        /* o tres aqui eh pq quando ele faz operacoes, ele faz em pares.
        por exemplo 90 * 2 + 10, ele faz primeiro o 90 * 2 (=180) e depois 
        faz 180 + 10 */ 
            this.calc();
        }
    }

    calc(){

        let last = this._operation.pop();
        // retira o ultimo e deixa na variavel last
        let result = eval(this._operation.join(""));
        // join coloca sem virgula, com separador vazio ou outro que seja indicado
        this._operation = [result, last];

        this.setLastNumberToDisplay();
        // atualizar o display de novo para calcular e jogar na tela o calculo do ultimo par
        
    }
    
    //  Criação de método para atualizar display
    /* Vou percorrer o array do final pro comeco para ver o que vai encontrar
     Aula 17 "O comando FOR: procurando o ultimo numero do array" 
     estrutura   for(let = 0; i <= 100, i++){
            for (valor inicial, valor final, incremento)
            for (valor final, valor inicial, decremento)

     }      
*/  
    setLastNumberToDisplay(){  
        let lastNumber;
        for(let i = this._operation.length-1; i >=0; i--) {
            if (!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }

        }
this.displayCalc = lastNumber;

    }
    
    addOperation(value){

        if(isNaN(this.getLastOperation())){

                if(this.isOperator(value)){
                    this.setLastOperation(value);
                    } else if(isNaN(value)){      
                         console.log("Outra coisa", value);
                } else { 
                this.pushOperation(value);
                // nao esta aparecendo na tela entao vai precisar chamar o display tbm
                this.setLastNumberToDisplay();
                // Atualizar display

                 } 

        } else { 

            if(this.isOperator(value)){

                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                
                this.setLastNumberToDisplay();
                // Atualizar display
            }
        }
    }

    setError(){
        this.displayCalc = "Error";
    }
   
    execBtn(value){
        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':

                break;
            case 'ponto':
                this.addOperation('.');
                break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':    
            case '9':
                this.addOperation(parseInt(value))
                break;
            
            default:
                this.setError();
                break;
 
        


        }

    }

    
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, "click drag", e => {
                /*
               console.log(btn.className.baseVal.replace("btn-",""));
               este extrai o texto da classe do botão..
                */
                
               let textbtn = btn.className.baseVal.replace("btn-","");
               this.execBtn(); 
               // para executar a ação deste botão e decidir qual ação vai ser executada vamos executar o Switch.

            })
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"; // mãozinha
            })
        })
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            // parâmetro especificados de como se quer exibir
            day:"2-digit",
            month: "long",
            year: "numeric"    
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    get displayTime(){
        return this._timeEl.innerHTML; 
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value; 
    }
    
    get displayDate(){
        return this._dateEl.innerHTML; 
    }
    set displayDate(value){
        return this._dateEl.innerHTML = value; 
    }
    
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }
    
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }


}