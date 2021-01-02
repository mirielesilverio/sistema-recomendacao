<template>
    <main class="container-discover">
        <div class="discover-card">
            <h1>Comece a explorar</h1>
            <p>
                Para que possamos te indicar alguns repositórios relevantes, primeiro informe seu usuário no GitHub
            </p>
            <div>
                <input type="text" placeholder="Digite seu usuário do GitHub" v-model="username">
                <button class="btn" v-on:click="verify_user"><i class="fas fa-play"></i></button>
            </div>
        </div>
    </main>
</template>

<script src="./discover.js"></script>