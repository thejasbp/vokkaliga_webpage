/* designapp.js */
function showSection(section) {
    // Hide all sections
    document.getElementById('personal-form').style.display = 'none';
    document.getElementById('address-form').style.display = 'none';
    document.getElementById('occupation-form').style.display = 'none';
    // Show selected section
    if (section === 'personal') {
        document.getElementById('personal-form').style.display = 'flex';
    } else if (section === 'address') {
        document.getElementById('address-form').style.display = 'flex';
    } else if (section === 'occupation') {
        document.getElementById('occupation-form').style.display = 'flex';
    }
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add active class to the clicked button
    document.querySelector(`.tab-button[onclick="showSection('${section}')"]`).classList.add('active');

    // Show or hide the BACK link based on the active tab
    const backLink = document.getElementById('back-link');
    if (section === 'personal') {
        backLink.style.display = 'block';
    } else {
        backLink.style.display = 'none';
    }
}

function showNextSection() {
    const currentForm = document.querySelector('main form:not([style*="display: none"])');
    if (currentForm.id === 'personal-form') {
        showSection('address');
    } else if (currentForm.id === 'address-form') {
        showSection('occupation');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Retrieve selected member ID from localStorage
        const selectedMemberId = localStorage.getItem('selectedMemberId');
        if (!selectedMemberId) {
            throw new Error('Selected member ID not found.');
        }

        // Use the retrieved member ID in the API endpoint
        fetch(`https://vocapbkendsvc.azurewebsites.net/api/admin/member/${selectedMemberId}`)
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
    const personal=data.Data.Personal;
    // document.querySelector(`[name="resident-type"][value="${data.residentType}"]`).checked = true;
    document.getElementById('first_name').value = personal.FirstName;
    document.getElementById('last_name').value = data.Data.Personal.LastName;
    document.getElementById('email').value = data.Data.Personal.EmailAddress;
    document.getElementById('phone').value = data.Data.Personal.MobileNumber;
    document.getElementById('hobbies').value = data.Data.Personal.Hobby;
    if (personal.DateOfBirth) {
        const dob = new Date(personal.DateOfBirth);
        document.getElementById('dob').value = dob.toISOString().split('T')[0];
    }
    document.getElementById('blood_group').value = data.Data.Personal.BloodGroup;
    document.querySelector(`[name="gender"][value="${data.Data.Personal.Gender}"]`).checked = true;
    document.getElementById('sub_caste').value=personal.SubCaste;
    document.querySelector(`[name="marital_status"][value="${data.Data.Personal.MaritalStatus}"]`).checked = true;
    document.querySelector(`[name="donate_blood"][value="${data.Data.Personal.DonateBlood}"]`).checked = true;
    document.querySelector(`[name="disabilities"][value="${data.Data.Personal.HasDisability}"]`).checked=true;
    document.querySelector(`[name="donate_organs"][value="${data.Data.Personal.DonateOrgans}"]`).checked = true;
    document.querySelector(`[name="matrimonial"][value="${data.Data.Personal.CommunityMatrimony}"]`).checked = true;
    document.querySelector(`[name="serve_community"][value="${data.Data.Personal.HelpCommunity}"]`).checked = true;
    document.querySelector(`[name="competitive_exams"][value="${data.Data.Personal.CivilServiceExam}"]`).checked = true;
    document.querySelector(`[name="volunteer"][value="${data.Data.Personal.Volunteer}"]`).checked = true;
    document.getElementById('caste_certificate').value=personal.DocumentId;
    document.querySelector(`[name="card_holder"][value="${data.Data.Personal.CardType}"]`).checked = true;
    // document.querySelector(`[name="upload_caste_certificate"][value="${data.Data.Personal.DocumentUrl}"]`).checked = true;
    // document.getElementById('upload_caste_certificate').value=personal.DocumentUrl;


    
    document.querySelector(`[name="residing_karnataka"][value="${data.Data.Address.ResidencyType}"]`).checked = true;
    document.getElementById('district').value = data.Data.Address.CurrentDistrict;
    document.getElementById('state').value = data.Data.Address.CurrentState;
    document.getElementById('address1').value = data.Data.Address.CurrentAddL1;
    document.getElementById('address2').value = data.Data.Address.CurrentAddl2;
    document.getElementById('zip_code').value = data.Data.Address.CurrentPinCode;


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
}
function togglePermanentAddress() {
        var checkbox = document.querySelector('input[name="same_as_current"]');
        var div = document.getElementById('Permanent_address');
        
        if (checkbox.checked) { 
            div.style.display = 'none';       
        } else {
            div.style.display = 'flex';
        }
    }

// document.querySelector(`[id="participate_in"][value="${data.Data.Personal.SocialWork}"]`).checked = true;
// document.querySelector(`[id="participate_in2"][value="${data.Data.Personal.MuttActivity}"]`).checked = true;
// document.querySelector(`[id="participate_in1"][value="${data.Data.Personal.CommunityActivity}"]`).checked = true;
// document.querySelector(`[id="participate_in3"][value="${data.Data.Personal.DisasterSupport}"]`).checked = true;