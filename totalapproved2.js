const approveid = localStorage.getItem('approveid');
const approvearray = JSON.parse(localStorage.getItem('approvearray')) || []; // Retrieve or initialize an empty array

// let approvearray=[]
if (!approvearray.includes(approveid)) {
    approvearray.push(approveid);
    localStorage.setItem('approvearray', JSON.stringify(approvearray)); // Save the updated array to localStorage

}
console.log(approvearray)


fetch('members.json')
    .then(res => res.json())
    .then(data => {
        let rows = '';
        approvearray.forEach(element => {
            for (let i = 0; i < data.Data.length; i++) {
                if (data.Data[i].Id == element) {
                    rows += `
                        <tr>
                            <td>${data.Data[i].Id}</td>
                            <td>
                                <input type="radio" name="selectedMember" value="${data.Data[i].Id}">
                            </td>                           
                            <td>${data.Data[i].Name}</td>
                            <td>${data.Data[i].Area}</td>
                            <td>${data.Data[i].IsPrimary}</td>
                            <td>${data.Data[i].SubmissionDate}</td>
                        </tr>`;
                    console.log(data.Data[i].Id);
                }
            }
        });
        document.getElementById('tableBody').innerHTML = rows;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
