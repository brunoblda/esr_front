<template>
  <HeaderComponent></HeaderComponent>
  <div class="container m-5"></div>
  <div class="container">
    <div class="container mb-5 border border-secondary">
      <h2>Sobre Extrair Sustentação Mensal</h2>
      <p></p>
      <p>
        <strong>
          A pagina "Extrair Sustentação Mensal" apresenta 3 quadros que informam
          como as configuracoes estão definadas naquele momemento.
        </strong>
      </p>
      <ul>
        <p>
          O primeiro quadro representa a lista de usuários da fábrica de
          software que estão sendo considerados na analise, dessa forma, caso
          tenha algum usuario da fabrica de sofware que não foi adicionado na
          lista, esse usuario não adicionando não será considerado na extração.
        </p>
      </ul>
      <ul>
        <p>
          O segundo quadro representa a lista de feriados em que o tempo de
          contagem não sera considerado, podendo ser um feriado integral ou
          matutino ou vespertino, dessa forma, o chamado que tenha ficado com
          algum usuario da fabrica num periodo que teve um ou mais feriados,
          esse tempo do feriado não será considerado para a aferição do service
          level agreement.
        </p>
      </ul>
      <ul>
        <p>
          O terceiro quadro representa o numero de paginas a percorrer do
          redmine. O sistema faz uma requisicao de dados para a Api do redmine
          em que cada página contem 50 chamados resolvidos do tipo sustentacao,
          assim, quanto mais paginas a serem solicitadas, maior a chance de ter
          chamados de sustentacao resolvidos do mês que se quer extrair. Quanto
          mais distânte for o mês que se quer extrair maior deve ser o numero de
          páginas a se percorrer.
        </p>
      </ul>
      <p>
        <strong>
          Para se realizar a extração mensal, deve-se escolher o mês e o ano nos
          inputs de "Escolha o mês" e "Digite o ano", após o preenchimento
          apertar o botão "Extrair Sustentação". O sistema ira realizar a
          extração e dentro de alguns segundos deve-se aparecer o botão para
          efetuar o donwload do arquivo no formato CSV.
        </strong>
      </p>
    </div>
    <div class="container mt-4 mb-5 border border-secondary">
      <h2>Sobre Configurações</h2>
      <p></p>
      <p>
        <strong>
          Existem 3 telas de configuração: Usuários da Fábrica, Feriados e
          Datas, Paginas a Percorrer
        </strong>
      </p>
      <p>
        <strong>Usuários da Fábrica</strong>
      </p>
      <ul>
        <p>
          A paginas de configuração de Usuários da Fábrica apresenta 3 listas.
        </p>
        <p>
          A primeira lista apresenta os usuários que foram classificados como
          usuários da fábrica de software, a segunda lista apresenta todos os
          usuários do redmine para que sejam adicionados à lista de usuários da
          fábrica de software, e a terceira lista apresenta os usuários que
          estão na lista da fábrica de software para que sejam retirados da
          lista.
        </p>
      </ul>
      <p>
        <strong>Feriados e Datas</strong>
      </p>
      <ul>
        <p>
          A paginas de configuração de Feriados e Datas, apresenta 1 lista, um
          campo de adicionar data e um campo de retirar data.
        </p>
        <p>
          A lista informa as datas que foram consideradas como feridos, podendo
          ser do tipo integral, matutino ou verpertino, sendo que aquele periodo
          não será considerado para a contagem do Service Level Agreement. O
          campo de adicioanar data permite selecionar uma data e classifica-la
          como um feriado integral, matutino ou vespertino. O campo de retirar
          data permite retirar alguma data que foi incluída na lista de feriados
          e datas.
        </p>
        <p>
          Obs.: Um feriado matutino é considerado de 8:00 até as 14:00, um
          ferido vespertino é considerado de 14:00 até as 20:00.
        </p>
      </ul>
      <p>
        <strong>Paginas a Percorrer</strong>
      </p>
      <ul>
        <p>
          A pagina de configuração de Paginas a Percorrer possui um campo
          informando o valor atual e um campo para definir um novo valor.
        </p>
        <p>
          O campo de valor atual informa quantas paginas o sistema ira percorrer
          para realizar a extração de sustentação. O campo de alterar o valor
          atual irá definir um novo valor para o número de paginas a serem
          percorridas.
        </p>
        <p><strong>Explicando melhor o Páginas a Percorrer:</strong></p>
        <ul>
          <p>
            O redmine informa ao sistema paginas em formato json contendo os
            chamados resolvidos do tipo sustentação, cada página contém 50
            chamados, assim quanto mais paginas forem buscadas maiores são as
            chances de se ter chamados do mês que se quer extrair. Por exemplo,
            a chance de todos os chamados do ultimo mês estarem nas ultimas 3
            paginas que contém 150 tarefas resolvidas (50 chamados por página)
            do tipo sustentação, são muito grandes, enquanto que conter algum
            chamado de mais de 1 ano nas últimas 150 tarefas resolvidas são
            menores.
          </p>
        </ul>
      </ul>
    </div>
    <div class="container mt-4 mb-5 border border-secondary">
      <h2>Sobre o Sistema</h2>
      <p></p>
      <p>
        <strong>
          Sistema desenvolvido utilizando a arquitetura REST, em Vue (front-end)
          e Python (back-end) com o banco de dados NOSQL firestore.
        </strong>
      </p>
      <ul>
        <p>
          Documentação do sistema se encontra na pagina Wiki do Redmine:
          <a
            href="https://redmine.iphan.gov.br/redmine/projects/divsis/wiki/Esr-web"
          >
            https://redmine.iphan.gov.br/redmine/projects/divsis/wiki/Esr-web
          </a>
          .
        </p>
      </ul>
    </div>
    <p></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "HomeComponent",
  components: { HeaderComponent },
});
</script>
