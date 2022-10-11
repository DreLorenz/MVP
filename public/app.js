const ENV = "production"
//const ENV = "dev"

let APIUrl = ENV === "dev" ? "http://localhost:3007" : 'https://mvp-sxdv.onrender.com'
console.log("API:", APIUrl);


var result;

var resultsDiv = document.getElementById("results")

function getEntries() {
    resultsDiv.innerHTML = '';

    var updateEntry = document.createElement('button')
    updateEntry.setAttribute('type', 'submit')
    updateEntry.setAttribute('id', 'updatebtn')
    updateEntry.classList.add("button")
    updateEntry.innerText = "Update Entry"


    var deleteEntry = document.createElement('button')
    deleteEntry.setAttribute('type', 'submit')
    deleteEntry.setAttribute('id', 'deletebtn')
    deleteEntry.classList.add("button")
    deleteEntry.innerText = "Delete Entry"


    fetch(`${APIUrl}/journal`)
        .then(res => res.json())
        .then(data => {
            data.map(journal => {
                var entryDiv = document.createElement('div')
                entryDiv.textContent = "Entry " + journal.tracker_id + " : " + journal.journal_input
                resultsDiv.append(entryDiv)
            })
            resultsDiv.append(updateEntry)
            updateEntry.addEventListener('click', () => {
                let updatePrompt = prompt("Which data entry would you like to update?");
                let typeUpdatedEntry = prompt("type here")
                let updatedEntry = { "journal_input": typeUpdatedEntry }

                fetch(`${APIUrl}/journal/${updatePrompt}`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(updatedEntry)
                })
                    .then(getEntries)
                alert(`Entry ${updatePrompt} updated!`)
                    .catch((error) => {
                        res.send(error)
                    })

            })
                .catch((error) => {
                    res.send(error)
                })


            resultsDiv.append(deleteEntry)
            deleteEntry.addEventListener('click', () => {
                let deletePrompt = prompt("Which data entry would you like to delete?");

                fetch(`${APIUrl}/journal/${deletePrompt}`, {
                    method: 'DELETE'
                })
                    .then(getEntries)
                alert(`Entry ${deletePrompt} deleted!`)
                    .catch((error) => {
                        res.send(error)
                    })

            })
                .catch((error) => {
                    res.send(error)
                })
        })
        .catch((error) => {
            res.send(error)
        })
}




var button = document.getElementById('btn_submit');
button.addEventListener('click', getEntries)


var createNew = document.getElementById('add');

createNew.addEventListener('click', () => {
    resultsDiv.innerHTML = '';
    var input = document.getElementById('addbut')
    let newEntry = { "journal_input": input.value }
    console.log(newEntry)

    fetch(`${APIUrl}/journal`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newEntry)
    })
        .then(getEntries)
        .catch((error) => {
            res.send(error)
        })
})
    .catch((error) => {
        res.send(error)
    })
