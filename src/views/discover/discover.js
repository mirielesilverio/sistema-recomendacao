export default {
    components: {},
    name: 'Discover',
    props: {},
    created() {

    },
    data() {
        return {
            username: ''
        }
    },
    methods: {
        verify_user() {
            var vm = this;
            this.axios.get(`https://api.github.com/users/${vm.username}`)
                .then(function(response) {
                    vm.$router.push({
                        name: 'recommendation',
                        params: {
                            username: vm.username
                        }
                    })
                }).catch((error) => {
                    alert('Não foi possível encontrar o usuário especificado! Tente novamente');
                });
        }
    }
}