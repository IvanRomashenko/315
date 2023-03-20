/*
Скрипт заполняет таблицу All Users на вкладке User Table
 */
$(async function () {
    await allUsers();
});

async function allUsers() {
    const table = $('#bodyAllUserTable');
    table.empty()
    fetch("http://localhost:8080/api/admin")
        .then(r => r.json())
        .then(data => {
            data.forEach(user => {
                let users = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.password}</td>
                            <td>${user.roles.map(role => role.role.replace('ROLE_', ''))}</td>
                            <td>
                                <button type="button" class="btn btn-primary" data-toggle="modal" id="buttonEdit" data-action="edit" data-id="${user.id}" data-target="#edit">edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete" data-action="delete" data-id="${user.id}" data-target="#delete">delete</button>
                            </td>
                        </tr>)`;
                table.append(users);
            })
        })
        .catch((error) => {
            alert(error);
        })
}
