import RepositoryCard from './../../components/repository-card/RepositoryCard.vue';
import Loader from './../../components/Loader.vue';
export default {
    components: {
        'repository-card': RepositoryCard,
        'loader': Loader,
    },
    name: 'Recommendation',
    props: {
        username: {
            require: true
        }
    },
    created() {
        this.set_myRepositories();
        this.set_my_user();
        this.set_most_favorite_repositories();
        this.get_language_recommendation();
        this.set_most_similar_users_repositories();
    },
    data() {
        return {
            my_repositorys: [],
            my_user: {},
            most_favorite_repositories: [],
            repositories_similar_to_mine: [],
            user_repositories_similar_to_mine: [],
        };
    },
    methods: {
        set_myRepositories() {
            var vm = this;
            this.get_user_repositories(vm.username, 4).then(function(response) {
                vm.get_repositories_with_language(response.data).then(function(r) {
                    vm.my_repositorys = r;
                });
            });
        },
        set_most_favorite_repositories() {
            var vm = this;
            this.get_repositories(1, 5).then(function(response) {
                vm.get_repositories_with_language(response.data.items).then(function(r) {
                    vm.most_favorite_repositories = r;
                });
            });
        },
        set_most_similar_users_repositories() {
            var vm = this;
            this.similar_users_repositories().then(function(response) {
                vm.user_repositories_similar_to_mine = response;
            });
        },
        get_user_following() {
            var vm = this;
            return this.axios.get('https://api.github.com/users/'+ vm.username +'/following');
        },
        get_user_followers(username) {
            return this.axios.get('https://api.github.com/users/'+ username +'/followers');
        },
        get_similar_followers() {
            var vm = this;
            return new Promise((resolve, reject) => {
                var similar_followers = [];
                vm.get_user_following().then(function (response) {
                    var following = response.data;
                    for (var i = 0; i < following.length && i < 100; i++) {
                        vm.get_user_followers(following[i].login).then(function(response) {
                            similar_followers = similar_followers.concat(response.data); 
                            if (similar_followers.length == following.length * 30 || similar_followers.length >= 300) {
                                resolve(similar_followers);
                            }
                        });
                    }
                });
            });
        },
        get_most_similar_users() {
            var vm = this;
            return new Promise((resolve, reject) => {
                this.get_similar_followers().then(function (similar_followers) {
                    var similar_followers_by_appearence = {};
                    similar_followers.forEach(function(user) {
                        if (similar_followers_by_appearence[user.login]) {
                            similar_followers_by_appearence[user.login].appearence = similar_followers_by_appearence[user.login].appearence + 1;
                        } else if (user.login !== vm.username) {
                            similar_followers_by_appearence[user.login] = user;
                            similar_followers_by_appearence[user.login].appearence = 1;
                        }
                    });
                    var similar_followers_list = Object.keys(similar_followers_by_appearence).map((key) => similar_followers_by_appearence[key]);
                    similar_followers_list = similar_followers_list.sort(function(a,b) {
                        return b.appearence - a.appearence;
                    });
                    resolve(similar_followers_list.slice(0, 5));
                });
            });
        },
        get_user_most_used_languages() {
            var vm = this;
            return new Promise((resolve, reject) => {
                this.get_user_repositories(vm.username).then(function(response) {
                    var repositories = [];
                    vm.get_repositories_with_language(response.data).then(function(r) {
                        repositories = r;
                        var languages = {};
                        repositories.forEach(function(repo) {
                            repo.languages.forEach(function(language) {
                                if (languages[language]) {
                                    languages[language] = languages[language] + 1;
                                } else {
                                    languages[language] = 1;
                                }
                            });
                        });
                        var languages_list = [];
                        for (var language in languages) {
                            if (language !== 'Shell')
                                languages_list.push([language, languages[language]]);
                        }
                        languages_list.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        var most_used_languages = [];
                        for (var i = 0; i < 5 && i < languages_list.length; i++) {
                            most_used_languages.push(languages_list[i][0]);
                        }
                        resolve(most_used_languages);
                    });
                });
            });
        },
        similar_users_repositories() {
            var vm = this;
            return new Promise((resolve, reject) => {
                var users_repositories = [];
                vm.get_user_most_used_languages().then(function(most_used_languages) {
                    vm.get_most_similar_users().then(function(similar_followers_list) {
                        var i = 0;
                        similar_followers_list.forEach(function(user) {
                            var with_my_languages = []
                            vm.get_user_repositories(user.login, 100).then(function(repositories) {
                                repositories = repositories.data;
                                var j = 1;
                                repositories.forEach(function(r) {
                                    vm.get_languages_of_repository(r).then(function(res) {
                                        r = vm.clean_repository_object(r);
                                        r.languages = Object.keys(res.data);
                                        var is_founded = r.languages.some( lg => most_used_languages.includes(lg));
                                        if (is_founded) {
                                            with_my_languages.push(r);
                                        }
                                        if (j == repositories.length) {
                                            i = i + 1
                                            if (with_my_languages.length) {
                                                users_repositories.push(with_my_languages[0]);
                                            }                      
                                            if (i == similar_followers_list.length - 1) {
                                                resolve(users_repositories);
                                            }                      
                                        } else {
                                            j = j + 1;
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        },
        get_language_recommendation() {
            var vm = this;
            this.get_user_most_used_languages().then(function(most_used_languages) {
                vm.get_repositories_by_languages_list(most_used_languages).then(function(r) {
                    vm.repositories_similar_to_mine = r;
                });
            });
        },
        get_repositories_by_languages_list(languages_list) {
            var vm = this;
            return new Promise((resolve, reject) => {
                var repositories = [];
                languages_list.forEach(function(language) {
                    vm.get_repositories(1, 1, 'language:' + language).then(function(response) {
                        repositories.push(response.data.items[0]);
                        if (languages_list.length == repositories.length) {
                            vm.get_repositories_with_language(repositories).then(function(r) {
                                resolve(r);
                            });
                        }
                    });
                });
            });
        },
        get_repositories_with_language(repositories) {
            var vm = this;
            return new Promise((resolve, reject) => {
                var i = 1;
                var new_repositories = [];
                repositories.forEach(function(repo) {
                    vm.get_languages_of_repository(repo).then(function(res) {
                        repo = vm.clean_repository_object(repo);
                        repo.languages = Object.keys(res.data);
                        new_repositories.push(repo);
                        if (i == repositories.length) {
                            resolve(new_repositories);
                        } else {
                            i = i + 1;
                        }
                    });
                });
            });
        },
        get_repositories(page_number, page_size, q_filter) {
            if (!page_size)
                page_size = 100;
            if (!q_filter)
                q_filter = 'all';
            return this.axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: q_filter,
                    sort: 'stars',
                    per_page: page_size,
                    page: page_number
                }
            });
        },
        get_user_repositories(username, page_size) {
            if (!page_size)
                page_size = 100
            return this.axios.get('https://api.github.com/users/' + username + '/repos', {
                params: {
                    type: 'owner',
                    sort: 'updated',
                    per_page: page_size,
                }
            });
        },
        get_languages_of_repository(repository) {
            repository = this.clean_repository_object(repository);
            return this.axios.get('https://api.github.com/repos/' + repository.owner.login + '/' + repository.name + '/languages');
        },
        clean_repository_object(repository) {
            return {
                name: repository.name,
                owner: repository.owner,
                stars_count: repository.stargazers_count || 0,
                forks_count: repository.forks_count || 0,
                url: repository.svn_url
            };
        },
        set_my_user() {
            var vm = this;
            this.axios.get(`https://api.github.com/users/${vm.username}`)
                .then(function(response) {
                    vm.my_user = response.data;
                });
        }
    }
}
