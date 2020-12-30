<template>
  <main>
    <div id="main-content">
      <!--UserData-->
      <section class="container" id="userData">
        <h1>Miriéle Silvério</h1>
        <h2>https://github.com/miriele</h2>
        <img src="./../../assets/user.png" alt="" />
      </section>

      <!--MyRepositories-->
      <div class="section-headers">
        <h2>Meus Repositórios</h2>
        <a href="#">Visualizar Todos</a>
      </div>

      <section id="my-repositories">
        <repository-card :cardType="1" :repository="{}"></repository-card>
        <repository-card :cardType="1" :repository="{}"></repository-card>
        <repository-card :cardType="1" :repository="{}"></repository-card>
        <repository-card :cardType="1" :repository="{}"></repository-card>
        <repository-card :cardType="1" :repository="{}"></repository-card>
      </section>

      <!-- DiscoverRepositories -->
      <div class="section-headers">
        <h2>Descubra Novos Repositórios</h2>
      </div>

      <section id="discover-repositories">

        <article>
          <div class="container">
            <div class="section-headers">
              <h2>Mais Favoritados</h2>
              <a href="#">Atualizar</a>
            </div>
            <div class="grid-repository-line">
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
            </div>
          </div>
        </article>

        <article>
          <div class="container">
            <div class="section-headers">
              <h2>Parecidos com os seus</h2>
              <a href="#">Visualizar Todos</a>
            </div>
            <div class="grid-repository">
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
            </div>
          </div>
          <div class="container">
            <div class="section-headers">
              <h2>Parecidos com os seus</h2>
              <a href="#">Visualizar Todos</a>
            </div>
            <div class="grid-repository">
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
              <repository-card :cardType="1" :repository="{}"></repository-card>
            </div>
          </div>
        </article>

      </section>
    </div>
  </main>
</template>

<script src="./recommendation.js"></script>