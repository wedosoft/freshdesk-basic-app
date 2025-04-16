
// server.js

exports = {
  // Handler for 'onTicketCreate' product event
  onTicketCreateHandler: function(payload) {
    // Logic to perform on ticket creation
    console.log('Ticket created with ID:', payload.data.ticket.id);
    // Additional logic can be added here
  },

  // Handler for 'onTicketUpdate' product event
  onTicketUpdateHandler: function(payload) {
    // Logic to perform on ticket update
    console.log('Ticket updated with ID:', payload.data.ticket.id);
    // Additional logic can be added here
  },

  // Server method to handle fetching of ticket details
  fetchTicketDetails: async function(request) {
    // Extract ticket ID from the request
    const ticketId = request.ticket_id;
    // Use the FDK request method to call the Freshdesk API
    try {
      const response = await $request.invoke(`https://<your_domain>.freshdesk.com/api/v2/tickets/${ticketId}`, {
        headers: {
          Authorization: 'Basic <%= encode(iparam.api_key) %>',
          'Content-Type': 'application/json'
        }
      });
      // Parse the response and return the ticket details
      return JSON.parse(response.response);
    } catch (error) {
      // Handle errors
      console.error('Error fetching ticket details:', error);
      throw error;
    }
  }
};
