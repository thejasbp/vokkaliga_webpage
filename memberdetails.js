document.addEventListener('DOMContentLoaded', () => {
    try {
        // Retrieve selected member ID from localStorage
       
            // var value = localStorage.getItem('key');
            // const selectedMemberId = localStorage.getItem('selectedMemberId');
            const selectedMemberId = localStorage.getItem('selectedMemberId');
            console.log(selectedMemberId)
            // console.log(value);
       
        if (!selectedMemberId) {
            throw new Error('Selected member ID not found.');
        }

        // Use the retrieved member ID in the API endpoint
        // fetch(`https://vocapbkendsvc.azurewebsites.net/api/admin/member/${selectedMemberId}`)
        fetch(`memberdetails/member${selectedMemberId}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => populateForm(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle error scenario here (e.g., display an error message)
            });
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error scenario here (e.g., display an error message)
    }
});

function populateForm(data) {
    // document.querySelector(`[name="resident-type"][value="${data.residentType}"]`).checked = true;
    document.getElementById('first-name').value = data.Data.Personal.FirstName;
    document.getElementById('last-name').value = data.Data.Personal.LastName;
    document.getElementById('email').value = data.Data.Personal.EmailAddress;
    document.getElementById('phone-number').value = data.Data.Personal.MobileNumber;
    document.getElementById('gender').value = data.Data.Personal.Gender;
    document.getElementById('hobbies').value = data.Data.Personal.Hobby;
    document.getElementById('dob').value = data.Data.Personal.DateOfBirth;
    document.getElementById('blood-group').value = data.Data.Personal.BloodGroup;
    document.querySelector(`[name="gender"][value="${data.Data.Personal.Gender}"]`).checked = true;

    document.getElementById('current-address').value = data.currentAddress;
    document.getElementById('native-place').value = data.nativePlace;
    document.getElementById('permanent-address').value = data.permanentAddress;
    document.getElementById('village').value = data.village;
    document.getElementById('district').value = data.district;
    document.getElementById('state').value = data.state;
    document.getElementById('country').value = data.country;
    document.getElementById('pin-code').value = data.pinCode;

    document.getElementById('occupation-type').value = data.occupation;
    document.getElementById('income').value = data.income;
    document.getElementById('work-address').value = data.workAddress;
    document.getElementById('working-hours').value = data.workingHours;
    document.getElementById('holiday').value = data.holiday;
    document.getElementById('marital-status').value = data.maritalStatus;
}

function showSection(sectionId) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`#${sectionId}`).classList.add('active');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab-button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}
async function approvememberFunction() {
    const selectedSubmissionDate = localStorage.getItem('submissionDate');
    const selectedMemberId = localStorage.getItem('selectedMemberId');
   /* const approvemember = {
        Id: selectedMemberId,
        ModificationTimeStamp: selectedSubmissionDate
    };*/

    try {
        const approveid=selectedMemberId;
        localStorage.setItem('approveid', approveid);


       /* const response = await fetch('https://vocapbkendsvc.azurewebsites.net/api/admin/member/approve', {
            method: 'PUT',
            body: JSON.stringify(approvemember),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('Member approved:', data);*/
        window.location.href='totalpending.html'

        
    } catch (error) {
        console.error('Error approving member:', error);
    }
}

function rejectmemberFunction() {
    document.getElementById('rejectionReasonContainer').style.display = 'block';
}

async function submitRejectionReason() {
    const rejectionReason = document.getElementById('rejectionReason').value;
    const selectedSubmissionDate = localStorage.getItem('submissionDate');
    const selectedMemberId = localStorage.getItem('selectedMemberId');
    const rejectMember = {
        Id: selectedMemberId,
        ModificationTimeStamp: selectedSubmissionDate,
        RejectionReason: rejectionReason
    };

    try {
        const response = await fetch('https://vocapbkendsvc.azurewebsites.net/api/admin/member/reject', {
            method: 'PUT',
            body: JSON.stringify(rejectMember),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('Member rejected:', data);
        // Optionally hide the rejection reason container after successful submission
        document.getElementById('rejectionReasonContainer').style.display = 'none';
    } catch (error) {
        console.error('Error rejecting member:', error);
    }
}


function showProfile() {
    document.getElementById('profile-modal').style.display = 'block';
}

function closeProfile() {
    document.getElementById('profile-modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('profile-modal')) {
        document.getElementById('profile-modal').style.display = 'none';
    }
}   