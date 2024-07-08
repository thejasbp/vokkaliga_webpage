const rejectid = localStorage.getItem('rejectid');
console.log(rejectid)
const rejectarray = JSON.parse(localStorage.getItem('rejectarray')) || [];
console.log(rejectarray)
if (!rejectarray.includes(rejectid)) {
  rejectarray.push(rejectid);
  localStorage.setItem('rejectarray', JSON.stringify(rejectarray));
}

const itemsPerPage = document.getElementById('items-per-page').value; // Get items per page from input
let currentPage = 1; // Current page number

fetch('members.json')
  .then(res => res.json())
  .then(data => {
    
    const totalItems = data.Data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function updatePaginationInfo() {
      document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
      document.getElementById('prev-button').disabled = currentPage === 1;
      document.getElementById('next-button').disabled = currentPage === totalPages;
    }

    function displayPage(pageNumber) {
      currentPage = pageNumber;
      updatePaginationInfo();

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
      let rows = '';
      console.log(rejectarray)
      rejectarray.forEach(element => {
        for (let i = startIndex; i < endIndex; i++) {
          if (data.Data[i].Id == element) {
            rows += `
              <tr>
                <td>${data.Data[i].Id}</td>
                <td>
                  <input type="radio" name="selectedMember" value="${data.Data[i].Id}" onchange="handleRadioChange('${data.Data[i].Id}')">
                </td>
                <td>${data.Data[i].Name}</td>
                <td>${data.Data[i].Area}</td>
                <td>${data.Data[i].IsPrimary}</td>
                <td>${data.Data[i].SubmissionDate}</td>
                <td><button class="viewBtn" style="display:none;" onclick="viewMemberDetails('${data.Data[i].Id}')">View</button></td>
              </tr>`;
              console.log(data.Data[i])
          }
        }
      });

      document.getElementById('tableBody').innerHTML = rows;
    }

    displayPage(1); // Initially display page 1

    document.getElementById('prev-button').addEventListener('click', () => {
      displayPage(currentPage - 1);
    });

    document.getElementById('next-button').addEventListener('click', () => {
      displayPage(currentPage + 1);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function handleRadioChange(memberId) {
    localStorage.setItem('selectedMemberId', memberId);
    const viewButtons = document.querySelectorAll('.viewBtn');
    viewButtons.forEach(button => {
        button.style.display = 'none';
    });
    const selectedRow = document.querySelector(`input[type="radio"][value="${memberId}"]`).parentNode.parentNode;
    const viewButton = selectedRow.querySelector('.viewBtn');
    viewButton.style.display = 'block';
}

function viewMemberDetails(memberId) {
    // Redirect to memberdetails.html with memberId
    window.location.href = `memberdetails.html`;
}
