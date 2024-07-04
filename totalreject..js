
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const viewButton = document.getElementById('viewButton');
    const itemsPerPageInput = document.getElementById('items-per-page');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    let members = [];
    let currentPage = 1;

    function fetchMembers() {
        fetch('https://vocapbkendsvc.azurewebsites.net/api/admin/members')
            .then(response => response.json())
            .then(data => {
                members = data.Data || [];
                updateTable();
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    }

    function updateTable() {
        const itemsPerPage = parseInt(itemsPerPageInput.value, 10);
        const totalPages = Math.ceil(members.length / itemsPerPage);

        // Clear existing rows
        tableBody.innerHTML = '';

        // Calculate the starting and ending index of the items for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Update page info
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        // Display the members for the current page
        members.slice(start, end).forEach((member, index) => {
            const row = document.createElement('tr');

            const slNoCell = document.createElement('td');
            slNoCell.textContent = start + index + 1;
            row.appendChild(slNoCell);

            const selectCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'radio';
            checkbox.name = 'selectMember';
            checkbox.value = member.Id;
            selectCell.appendChild(checkbox);
            row.appendChild(selectCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = member.Name || 'N/A';
            row.appendChild(nameCell);

            const areaCell = document.createElement('td');
            areaCell.textContent = member.Area || 'N/A';
            row.appendChild(areaCell);

            const userTypeCell = document.createElement('td');
            userTypeCell.textContent = member.IsPrimary ? 'Primary' : 'Secondary';
            row.appendChild(userTypeCell);

            const submittedDateCell = document.createElement('td');
            submittedDateCell.textContent = member.SubmissionDate || 'N/A';
            row.appendChild(submittedDateCell);

            tableBody.appendChild(row);
        });

        // Add event listener to show view button when a member is selected
        document.querySelectorAll('input[name="selectMember"]').forEach(radio => {
            radio.addEventListener('change', () => {
                viewButton.classList.remove('hidden');
            });
        });

        // Handle view button click
        viewButton.addEventListener('click', () => {
            const selectedMemberId = document.querySelector('input[name="selectMember"]:checked').value;
            const selectedMember = members.find(member => member.Id === selectedMemberId);
            localStorage.setItem('selectedMember', JSON.stringify(selectedMember));
            window.location.href = 'memberdetails.html';
        });
    }

    itemsPerPageInput.addEventListener('input', () => {
        currentPage = 1;
        updateTable();
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });

    nextButton.addEventListener('click', () => {
        const itemsPerPage = parseInt(itemsPerPageInput.value, 10);
        const totalPages = Math.ceil(members.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTable();
        }
    });

    // Initial fetch and load
    fetchMembers();
});