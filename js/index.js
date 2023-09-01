document.addEventListener('DOMContentLoaded', () => {
    const gitApi = "https://api.github.com";
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    function renderUser(user) {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar">
            <div class="content">
                <h1>${user.login}</h1>
                <a href="${user.html_url}" target="_blank">Profile</a>
            </div>
        `;
        userCard.addEventListener('click', () => {
            fetchUserRepos(user.login);
        });
        userList.appendChild(userCard);
    }

    function fetchUsers(username) {
        const searchUrl = `${gitApi}/search/users?q=${username}`;
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                userList.innerHTML = '';
                data.items.forEach(user => {
                    renderUser(user);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                userList.innerHTML = '<p>Error fetching user data. Please try again.</p>';
                reposList.innerHTML = '';
            });
    }

    function renderRepo(repo) {
        const repoItem = document.createElement('div');
        repoItem.className = 'repo-item';
        repoItem.innerHTML = `
            <h2>${repo.name}</h2>
            <p>Description: ${repo.description || 'N/A'}</p>
            <p>Language: ${repo.language || 'N/A'}</p>
            <a href="${repo.html_url}" target="_blank">Repo Link</a>
        `;
        reposList.appendChild(repoItem);
    }

    function fetchUserRepos(username) {
        const reposUrl = `${gitApi}/users/${username}/repos`;
        fetch(reposUrl)
            .then(response => response.json())
            .then(data => {
                reposList.innerHTML = '';
                data.forEach(repo => {
                    renderRepo(repo);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                reposList.innerHTML = '<p>Error fetching user repositories. Please try again.</p>';
            });
    }

    const searchForm = document.getElementById('github-form');
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const usernameInput = document.getElementById('search');
        const username = usernameInput.value.trim();
        if (username) {
            fetchUsers(username);
        }
    });
});

