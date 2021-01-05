<template>
  <main>
    <div id="main-content">
      <!--UserData-->
      <section class="container" id="userData" v-if="Object.keys(my_user).length">
        <h1>{{ my_user.login }}</h1>
        <h2>{{ my_user.url }}</h2>
        <img :src="my_user.avatar_url" :alt="my_user.login" />
      </section>
      <div class="change-user">
        <a class="btn" @click="$router.push({name: 'discover'})">Trocar Usuário <i class="fas fa-exchange-alt"></i></a>
      </div>
      <loader v-if="!Object.keys(my_user).length"></loader>

      <!--MyRepositories-->
      <div class="section-headers">
        <h2>Meus Repositórios</h2>
        <a :href="`https://github.com/${my_user.login}?tab=repositories`" target="_blank">Visualizar Todos</a>
      </div>

      <section id="my-repositories" v-if="my_repositorys.length">
          <a target="_blank" :href="repo.url" v-for="repo in my_repositorys" :key="repo.name">
              <repository-card :cardType="0" :repository=repo></repository-card>
          </a>
      </section>
      <loader v-if="!my_repositorys.length"></loader>

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
            <div class="grid-repository-line" v-if="most_favorite_repositories.length">
                <a target="_blank" :href="repo.url" v-for="repo in most_favorite_repositories" :key="repo.name">
                    <repository-card :cardType="1" :repository=repo></repository-card>
                </a>
            </div>
            <loader v-if="!most_favorite_repositories.length"></loader>
          </div>
        </article>

        <article>
          <div class="container">
            <div class="section-headers">
              <h2>Parecidos com os seus</h2>
              <a href="#">Visualizar Todos</a>
            </div>
            <div class="grid-repository" v-if="repositories_similar_to_mine.length">
                <a target="_blank" :href="repo.url" v-for="repo in repositories_similar_to_mine" :key="repo.name">
                    <repository-card :cardType="1" :repository=repo></repository-card>
                </a>
            </div>
            <loader v-if="!repositories_similar_to_mine.length"></loader>
          </div>
          <div class="container">
            <div class="section-headers">
              <h2>Parecidos com os seus</h2>
              <a href="#">Visualizar Todos</a>
            </div>
            <div class="grid-repository">
              <a target="_blank" :href="repo.url" v-for="repo in user_repositories_similar_to_mine" :key="repo.name">
                <repository-card :cardType="1" :repository=repo></repository-card>
              </a>
            </div>
            <div v-if="user_repositories_similar_loaded && user_repositories_similar_to_mine.length === 0" class="empty-state">
              <h3>Nenhum repositório encontrado</h3>
              <p>É possível que você ainda não siga usuários no Github!</p>
            </div>
            <loader v-if="!user_repositories_similar_loaded"></loader>
          </div>
        </article>

      </section>
    </div>
  </main>
</template>

<script src="./recommendation.js"></script>