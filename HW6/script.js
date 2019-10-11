document.addEventListener("DOMContentLoaded", function () {
    let addBtn = document.getElementById('addBtn');
    let allCount = 0;
    let doneCount = 0;
    let unDoneCount = 0;
    const local = localStorage.getItem('todolist');
    let saveitem = [];
    let list = document.getElementById('list');
    let filter = document.getElementById('filter');

    function addTaskToList(task) {
        list.insertAdjacentHTML('beforeend', `<li><input disabled class="edittext" value="${task}"><span class="editBtn">EDIT</span><span class="close">X</span></li>`);
        allCount++;
    }

    addBtn.addEventListener('click', function () {
        let inputValue = document.getElementById('toDoEl').value;
        if (inputValue !== '') {
            addTaskToList(inputValue);
            displayCounters();
            document.getElementById('toDoEl').value = '';

        } else alert("Введіть вашу справу!");
        toLocal();
    });

    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === "INPUT" && !ev.target.classList.contains('ch')) {
            if (!ev.target.parentNode.classList.contains('checked')) {
                doneCount++;
                displayCounters();
            } else if (ev.target.parentNode.classList.contains('checked')) {
                doneCount--;
                displayCounters();
            }
            ev.target.parentNode.classList.toggle('checked');
        }
        if (ev.target.tagName === "LI") {
            if (!ev.target.classList.contains('checked')) {
                doneCount++;
                displayCounters();
            } else if (ev.target.classList.contains('checked')) {
                doneCount--;
                displayCounters();
            }
            ev.target.classList.toggle('checked');
        } else if (ev.target.classList.contains('close')) {
            allCount--;
            if (ev.target.parentNode.classList.contains('checked')) {
                doneCount--;
            }
            displayCounters();
            let item = ev.target.parentNode;
            item.remove();
            toLocal();
        } else if (ev.target.classList.contains('editBtn')) {
            let inp = ev.target.previousSibling;
            inp.classList.toggle('ch');
            if (inp.disabled === true) {
                inp.disabled = false;
                ev.target.innerText = "APPLY";
            } else {
                inp.disabled = true;
                ev.target.innerText = "EDIT";
            }
        }
        toLocal();
    }, false);

    filter.addEventListener('change', function filterChange() {
        let tasks = document.querySelector('ul#list').getElementsByTagName('LI');
        switch (filter.selectedIndex) {
            case 0:
                for (let i = 0; i < tasks.length; i++) {
                    tasks[i].classList.remove('hidden');
                }
                break;
            case 1:
                for (let i = 0; i < tasks.length; i++) {
                    tasks[i].classList.remove('hidden');
                    if (tasks[i].classList.contains('checked')) {
                        tasks[i].classList.add('hidden');
                    }
                }
                break;
            case 2:
                for (let i = 0; i < tasks.length; i++) {
                    tasks[i].classList.remove('hidden');
                    if (!tasks[i].classList.contains('checked')) {
                        tasks[i].classList.add('hidden');
                    }
                }
                break;
        }
    });

    function displayCounters() {
        document.getElementById('all').innerHTML = +allCount;
        document.getElementById('done').innerHTML = +doneCount;
        document.getElementById('undone').innerHTML = allCount - doneCount;
    }

    function toLocal() {
        localStorage.clear();
        for (let i = 0; i < list.children.length; i++) {
            let temp = list.children[i].classList.value;
            let status = "false";
            if (temp === 'checked') {
                status = "true";
            }
            saveitem[i] = {
                value: list.children[i].firstChild.value,
                status: status
            };
            localStorage.setItem('todolist', JSON.stringify(saveitem));
        }
    }

        if (local) {
            let saveitem = JSON.parse(local);
            allCount = saveitem.length;
            for (let i = 0; i < saveitem.length; i++) {
                let value = saveitem[i].value;
                let status = saveitem[i].status;
                if (status === "true") {
                    doneCount++;
                    list.insertAdjacentHTML('beforeend', `<li class="checked"><input disabled class="edittext" value="${value}"><span class="editBtn">EDIT</span><span class="close">X</span></li>`);

                } else if (status === "false") {
                    unDoneCount++;
                    list.insertAdjacentHTML('beforeend', `<li><input disabled class="edittext" value="${value}"><span class="editBtn">EDIT</span><span class="close">X</span></li>`);

                }
            }
            displayCounters();
        }
});
