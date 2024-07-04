document.addEventListener('DOMContentLoaded', function() {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    const tbody = document.getElementById('events-tbody');
    const itemsPerPageSelect = document.getElementById('items-per-page');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const pageInfo = document.querySelector('.page-info');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
    let currentEditIndex = -1;

    let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || 1;
    itemsPerPageSelect.value = itemsPerPage;

    itemsPerPageSelect.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        localStorage.setItem('itemsPerPage', itemsPerPage);
        currentPage = 1;
        renderTable();
    });

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < Math.ceil(events.length / itemsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    function renderTable() {
        tbody.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedEvents = events.slice(start, end);
    
        fetch('https://vocapbkendsvc.azurewebsites.net/api/admin/events')
            .then(res => res.json())
            .then(data => {
                events = data.Data;
                localStorage.setItem('events', JSON.stringify(events));

                let rows = '';
                paginatedEvents.forEach((event, index) => {
                    const date = moment(event.EventDate).utc().format('DD-MM-YYYY');
                    rows += `<tr>
                        <td>${event.Id}</td>
                        <td>${event.EventName}</td>
                        <td><img src="${event.EventBannerUrl}" alt="Event Banner" width="100px"/></td>
                        <td>${event.EventDescription}</td>
                        <td>${date}</td>
                        <td><button class="edit-button" data-index="${start + index}">Edit</button></td>
                        <td><button class="delete-button" data-index="${start + index}">Delete</button></td>
                    </tr>`;
                });

                document.getElementById('events-tbody').innerHTML = rows;

                document.querySelectorAll('.edit-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        currentEditIndex = index;
                        openEditModal(events[index]);
                    });
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        deleteEvent(index);
                    });
                });

                pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(events.length / itemsPerPage)}`;
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === Math.ceil(events.length / itemsPerPage);

                localStorage.setItem('currentPage', currentPage);
            })
            .catch(err => console.log(err));
    }

    function deleteEvent(index) {
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        renderTable();
    }

    function openEditModal(event) {
        document.getElementById('edit-title').value = event.EventName;
        document.getElementById('edit-date').value = event.EventDate;
        document.getElementById('edit-description').value = event.EventDescription;
        editModal.style.display = 'block';
    }

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('edit-title').value;
        const date = document.getElementById('edit-date').value;
        const description = document.getElementById('edit-description').value;
        const image = document.getElementById('edit-image').files[0];

        if (image) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateEvent(currentEditIndex, title, date, description, e.target.result);
            };
            reader.readAsDataURL(image);
        } else {
            updateEvent(currentEditIndex, title, date, description, events[currentEditIndex].EventBannerUrl);
        }

        editModal.style.display = 'none';
    });

    function updateEvent(index, title, date, description, image) {
        events[index] = { 
            Id: events[index].Id, 
            EventName: title, 
            EventDate: date, 
            EventDescription: description, 
            EventBannerUrl: image 
        };
        localStorage.setItem('events', JSON.stringify(events));
        renderTable();
    }

    function addEvent(newEvent) {
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        const totalPages = Math.ceil(events.length / itemsPerPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        renderTable();
    }

    renderTable();
});
