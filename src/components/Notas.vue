<template>
    <div class="content">
        <div class="notas" v-for="nota in notas" @click="notaPressionada" v-on:click="(counter != 7 ? counter += 1 : counter +=0)" :key="nota">{{  nota }}</div>
    </div>
</template>

<script>
export default {
    name: 'Notas',
    data(){
        return{
            
        }
    },
    methods: {
        notaPressionada(e) {
            //Pega a nota pressionada e manda para o componente ExEscala
            let nota = e.target.innerHTML
            this.$emitter.emit('escala', [nota, this.counter])
            for (let i = 0; i < this.notas.length; i++) {
                if(nota == this.notas[i]){
                    if(this.counter != 7){
                        this.notas.splice(i, 1)
                    }
                }
            }
        }
    },
    props: ['notas', 'counter'] //Recebendo do componente pai, ExEscala
}
</script>

<style scoped>
    .content{
        margin: 10px 0 0 0;
        width: 100%;
        height: 300px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        justify-content: center;
        align-items: center;
    }
    .content .notas{
        width: 60px;
        height: 60px;
        border: 1px solid black;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 2px 0 2px;
    }
</style>