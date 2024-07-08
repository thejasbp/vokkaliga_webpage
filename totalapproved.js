document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const viewButton = document.getElementById('viewButton');
    const itemsPerPageInput = document.getElementById('items-per-page');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');
    const approveid = localStorage.getItem('approveid');
    let members = [];
    let currentPage = 1;

    // Retrieve the approvearray from localStorage
    let approvearray = JSON.parse(localStorage.getItem('approvearray')) || [];

    function fetchMembers() {
        fetch('members.json')
            .then(response => response.json())
            .then(data => {
                members = data.Data || [];
                const filteredMembers = members.filter(member => member.Id == approveid);
                Array.prototype.push.apply(approvearray, filteredMembers); // Append filtered members to approvearray
                // approvearray.splice(0, approvearray.length);

                  
                // Save the updated approvearray to localStorage
                localStorage.setItem('approvearray', JSON.stringify(approvearray));

                updateTable();
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    }

    function updateTable() {
        const itemsPerPage = parseInt(itemsPerPageInput.value, 10);
        const totalPages = Math.ceil(approvearray.length / itemsPerPage);

        // Clear existing rows
        tableBody.innerHTML = '';

        // Update page info
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        // Calculate the starting and ending index of the items for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Display the members for the current page
        approvearray.slice(start, end).forEach((member, index) => {
            const row = document.createElement('tr');

            const slNoCell = document.createElement('td');
            slNoCell.textContent = member.Id || 'N/A';
            row.appendChild(slNoCell);

            const selectCell = document.createElement('td');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'selectMember';
            radio.value = member.Id;
            selectCell.appendChild(radio);
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
                const selectedMemberId = radio.value;
                localStorage.setItem('selectedMemberId', selectedMemberId);
                viewButton.classList.remove('hidden');
            });
        });

        // Handle view button click
        viewButton.addEventListener('click', () => {
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
        const totalPages = Math.ceil(approvearray.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTable();
        }
    });

    // Initial fetch and load
    fetchMembers();
});
