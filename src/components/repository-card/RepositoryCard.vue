<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ repository.name }}</h3>
      <p v-if="cardType == 1">{{ repository.owner.name}}</p>
    </div>
    <div class="card-body">
      <div v-for="language in repository.languages.slice(0, 4)" :key="language" >
        <i class="fas fa-circle fa-sm" :class='"color-"+language.toLowerCase()'></i>{{ language }}
      </div>
    </div>
    <div class="card-footer">
      <div><i class="fas fa-star fa-sm"></i>{{ repository.stars_count }}</div>
      <div><i class="fas fa-code-branch fa-sm"></i>{{ repository.forks_count }}</div>
    </div>
  </div>
</template>

<script src="./repository-card.js"></script>