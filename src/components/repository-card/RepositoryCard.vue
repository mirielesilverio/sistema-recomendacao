<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Vue.js CORE</h3>
      <p v-if="cardType === 1">Miriele Silvério</p>
    </div>
    <div class="card-body">
      <div><i class="fas fa-circle fa-sm danger"></i>Javascript</div>
      <div><i class="fas fa-circle fa-sm success"></i>Python</div>
      <div><i class="fas fa-circle fa-sm info"></i>Laravel</div>
    </div>
    <div class="card-footer">
      <div><i class="fas fa-star fa-sm"></i>1000</div>
      <div><i class="fas fa-code-branch fa-sm"></i>100</div>
    </div>
  </div>
</template>

<script src="./repository-card.js"></script>