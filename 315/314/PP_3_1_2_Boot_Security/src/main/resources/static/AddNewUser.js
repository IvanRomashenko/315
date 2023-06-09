$(async function () {
    await newUser();
});

async function newUser() {
    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let element = document.createElement("option");
                element.text = role.role.replace('ROLE_', '');
                // element.text = role.name.substring(5);
                element.value = role.id;
                $('#rolesNewUser')[0].appendChild(element);
            })
        })
    const formAddNewUser = document.forms["formAddNewUser"];

    formAddNewUser.addEventListener('submit', function (event) {
        event.preventDefault();
        let rolesNewUser = [];
        for (let i = 0; i < formAddNewUser.roles.options.length; i++) {
            if (formAddNewUser.roles.options[i].selected) rolesNewUser.push({
                id: formAddNewUser.roles.options[i].value,
                name: formAddNewUser.roles.options[i].text
            })
        }

        fetch("http://localhost:8080/api/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formAddNewUser.username.value,
                password: formAddNewUser.password.value,
                roles: rolesNewUser
            })

        })
            .then(() => {
                formAddNewUser.reset();
                allUsers();
                $('#allUsersTable').click();
            })
            .catch((error) => {
                alert(error);
            })
    })
}
