document.getElementById('event-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];
    const imgurl="https://vocapstorage.blob.core.windows.net/events/1 (1).jpg"

    const formData = {
        EventName:title,
        EventDescription:description,
        EventDate:date,
        EventBannerUrl:imgurl
    };

    try {
        const response = await fetch('https://vocapbkendsvc.azurewebsites.net/api/admin/events', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
        // Handle success response, e.g., redirect to another page
        window.location.href = 'events.html';
    } catch (error) {
        console.error('Error:', error);
        // Handle error response
    }
});