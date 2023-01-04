<template>
    <div class="body">
        <h1>Escala de {{ escala[0] }}</h1>
        <div class="escala row"  >
            <div class="acordes" @click="removerNota" v-for="item in escalaDoUsuario" :key="item">
                <div :class="isNull"  role="status" v-if="item.length == 0">
                </div>
                <div v-else-if="item.length != 0">
                    {{ item }}
                </div>
            </div>
        </div>
        <button class="btn btn-primary" @click="mudaEscala">Gerar escala</button> <!-- Por enquanto so gera escala apertando aqui, logo sera feito de forma dinâmica-->
        <button class="btn btn-primary" @click="verificaSeAEscalaTaCorreta" >Conferir a Escala</button>
    </div>
    <Notas :notas="notas" :counter="counter"/>
</template>

<script>
import Notas from './Notas.vue'
export default {
    name: 'Escala',
    data(){
        return{
            escalaDoUsuario: ['', '', '', '', '', '', ''],
            escala: [],
            isNull: 'spinner-grow',
            notas: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#","A", "A#", "B", "Db", "Eb", "Gb", "Ab", "Bb"],
            notasComBemol: {'C#':"Db",'D#':"Eb",'F#':"Gb",'G#':"Ab",'A#':"Bb"},
            controle: [],
            counter: 0
        }
    },
    components: {
        Notas
    },
    methods: {
        removerNota(e){
            let nota = e.target.innerHTML
            if(nota != ""){
                //Remove qualquer nota que o usuario clicar da escala "EscalaDoUsuario"
                for (let i = 0; i < this.escalaDoUsuario.length; i++) {
                    if(nota == this.escalaDoUsuario[i]){
                        this.controle.push(i)
                        this.notas.push(this.escalaDoUsuario[i])
                        this.counter -= 1
                        this.escalaDoUsuario[i] = ''
                    }
                }
            }
        },
        verificaVazioEAdiciona(nota){
            //Quando o usuario retira uma nota da escala, ele deixa um lugar vazio. Essa função verifica esse lugar e preenche com a próxima nota que ele apertar.
            this.controle.sort((a, b) => a - b)
            for (let i = 0; i < this.controle.length; i++) {
                if(this.escalaDoUsuario[this.controle[i]] == ''){
                    this.escalaDoUsuario[this.controle[i]] = nota
                    break
                }
            
        }
           
        },
        adicionaEverifica(from){
            //Aqui ele pega as notas que usuario está clicando e adiciona na lista escala do usuario que é a escala que tem de ser preeenchida
            if(this.escalaDoUsuario[from[1]] == ''){
                this.escalaDoUsuario[from[1]] = from[0] 
                this.counter += 1
            }else{
                this.verificaVazioEAdiciona(from[0])
            }
        },
        verificaSeAEscalaTaCorreta(){
            //Função para verificar a escala do usuario, se esta tudo correto.
            let listaDeNotasErradas = []
            let preenchida = true
            for (let i = 0; i < this.escalaDoUsuario.length; i++) {
                if(this.escalaDoUsuario[i] != this.escala[i]){
                    listaDeNotasErradas.push(this.escalaDoUsuario[i]);
                }
                if(this.escalaDoUsuario[i] == ''){
                    window.alert("A escala não foi totalmente preenchida ainda.")
                    preenchida = false
                    break
                }
            }
            if(preenchida){
                //Verificando se a escala foi totalmente preenchida
                if(listaDeNotasErradas.length > 0){
                    window.alert("As seguintes notas estão erradas: " + listaDeNotasErradas)
                }else{
                    window.alert("Parabénnns você acertou todas as notas da escala!!")
                }
            }
        },
        mudaEscala(){
            let escolhaEscala = 'B' //Essa variavel vai ser mudada pelo usuario

            //essa função vai gerar as escalas que o usuario desejar, Por enquanto so a escala maior

            
            let A = 'Bb'
            let C = 'Db'
            let D = 'Eb'
            let F = 'Gb'
            let G = 'Ab'

            let controle = 0
            let controle2 = 0
            if(this.escala.length <= 0)
            this.escala.push(escolhaEscala)
            for (let i = 0; i < this.notas.length; i++) {
                controle2 = i
                //Ele verifica a nota que o usuario escolheu, e ai quando a nota que ele escolheu for igual na escala, ele vai gerar uma escala apartir da posição que essa nota se encontra na lista
                if(this.notas[i] == escolhaEscala){
                    for (let a = 0; a < 7; a++) {
                        //Esse if verifica se ja tem coisa na escala, caso o usuario ficasse apertando gerar escala
                        if(this.escala.length <= 6){
                            console.log(controle + controle2)
                            if(controle + controle2 >= 11 ){
                                //Quando ele chega na ultima nota, para não colocar Bmol na lista ele volta para o inicio da lista
                                controle2 = -1
                                controle = 0
                                foi = false
                            }
                            //Aqui ele faz toda a parte de Tom, tom e semitom 
                            if(a == 1 || a == 2 || a == 4 || a == 5 || a == 6 ){
                                controle += 2
                                this.escala.push(this.notas[controle + controle2])
                            }
                            if(a == 3){
                                controle += 1
                                this.escala.push(this.notas[controle + controle2])
                            }
                        }
                        
                        
                    }
                }
            }

            for (let i = 0; i < this.escala.length; i++) {
                //Aqui ele verifica as notas sustenidas(#) que estão se repetindo e substitui por bmol
                if(this.escala[i] == this.escala[i + 1].split("")[0] ){
                    this.escala[i + 1] = this.notasComBemol[this.escala[i+1]]        
                }
                
            }
        }


    },
    mounted(){
        //recebendo a nopta que o usuario apertou
        this.$emitter.on('escala', (from) => (from[1] != 7 ? this.adicionaEverifica(from) : this.verificaVazioEAdiciona(from[0])))
    },
    
}
</script>



<style scoped>
    h1{
        color: black;
    }
    .body{
        width: 100%;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .body .escala{
        max-width: 800px;
        width: 100%;
        min-height: 70px;
        border: 1px solid black;
        border-radius: 16px;
        padding: 4px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        justify-content: center;
        align-items: center;

    }
    .body .escala .acordes{
        width: 60px;
        height: 60px;
        border: 1px solid black;
        color: white;
        background: #333;
        font-weight: bold;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: 0.3s;
        margin: 6px 3px 0 3px;
    }
    .body .escala .acordes:hover{
        box-shadow: 3px 5px rgb(192, 192, 192);

    }
    .btn{
        margin: 10px 0 30px 0;
    }
</style>