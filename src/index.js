document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector ('#dog-form')
    const currentDataUpdated = {}

    function renderData (data) {
        data.forEach(element => {
            const tr = document.createElement ('tr');
            const name = document.createElement ('td')
            name.textContent = element.name;
            tr.append(name)
            const breed = document.createElement ('td');
            breed.textContent = element.breed;
            tr.append(breed);
            const sex = document.createElement ('td')
            sex.textContent = element.sex;
            tr.append(sex)
            const buttonTD = document.createElement ('td')
            const button = document.createElement ('button')
            button.textContent = 'Edit dog'
            button.id = element.id;
            button.classList.add ('edit-button')
            buttonTD.append(button)
            tr.append(buttonTD)
            document.querySelector('#table-body').append(tr)
        });
    }

    async function getAllData (url) {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    getAllData('http://localhost:3000/dogs').then (data => {
        renderData (data);
    })

    const tableArea = document.querySelector ('#table-body');
    tableArea.addEventListener ('click', event => {
        if (event.target.className !== 'edit-button') return
        const idToEdit = event.target.id;
        document.querySelector('#name-box').focus();
        form.addEventListener ('submit', event => {
            const arr = []; updateObj = {};
            event.preventDefault();
            arr.push (event.target.querySelector ('#name-box').value);
            arr.push (event.target.querySelector ('#breed-box').value);
            arr.push (event.target.querySelector ('#sex-box').value);
            if (arr[0] !== '') {updateObj.name = arr[0]};
            if (arr[1] !== '') {updateObj.breed = arr[1]};
            if (arr[2] !== '') {updateObj.sex = arr[2]} 
            async function updateData (url) {
                const res = await fetch (url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify(updateObj)
                });
                const data = await res.json();
                return data;
            }
            updateData(`http://localhost:3000/dogs/${idToEdit}`).then (data => render (data))
        })
    })

})