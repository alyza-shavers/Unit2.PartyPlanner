document.addEventListener('DOMContentLoaded', () => {
    const partyList = document.getElementById('partyList');
    const partyForm = document.getElementById('partyForm');

    // Function to fetch and render parties
    const fetchAndRenderParties = async () => {
        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-B/events');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch parties: ${response.status} - ${response.statusText}`);
            }
    
            const parties = await response.json();
    
            // Clear the existing party list
            partyList.innerHTML = '';
    
            // Render each party to the page
            parties.forEach(party => renderParty(party));
        } catch (error) {
            console.error(error.message);
        }


    // Function to render a single party to the page
    const renderParty = (party) => {
        const partyItem = document.createElement('div');
        partyItem.innerHTML = `
            <p>Name: ${party.name}</p>
            <p>Date: ${party.date}</p>
            <p>Time: ${party.time}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
            <button class="deleteButton" data-id="${party.id}">Delete</button>
        `;
        partyList.appendChild(partyItem);

        // Add event listener for delete button
        partyItem.querySelector('.deleteButton').addEventListener('click', () => deleteParty(party.id));
    };

    // Function to delete a party
    const deleteParty = async (partyId) => {
        // Send a DELETE request to the API 
        await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-B/events/${partyId}`, { method: 'DELETE' });

        // Fetch and render updated party list
        fetchAndRenderParties();
    };

    // Event listener for party form submission
    partyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form values
        const formData = new FormData(partyForm);
        const newParty = {};
        formData.forEach((value, key) => {
            newParty[key] = value;
        });

        // Send a POST request to the API to add a new party 
        await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-B/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newParty),
        });

        // Fetch and render updated party list
        fetchAndRenderParties();

        // Clear the form
        partyForm.reset();
    });

    // Initial fetch and render of parties
    fetchAndRenderParties();
});
