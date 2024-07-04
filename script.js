$(document).ready(function() {
    // Search button click event
    $('.search-btn').click(function() {
        const country = $('#country').val();
        const state = $('#state').val();
        const district = $('#district').val();
        const taluk = $('#taluk').val();

        // Log the selected values
        console.log('Country:', country);
        console.log('State:', state);
        console.log('District:', district);
        console.log('Taluk:', taluk);

        // Here you can add the code to perform the actual search
    });

    // Reset button click event
    $('.reset-btn').click(function() {
        $('#country').val('Select Country');
        $('#state').val('Select State');
        $('#district').val('Select District');
        $('#taluk').val('Select Taluk');
    });
});
