let appointments = [
    { id: 1, patientName: "John Doe", date: "2024-02-23", time: "10:00 AM", reason: "Regular Checkup", status: "completed" },
    { id: 2, patientName: "Jane Smith", date: "2024-02-24", time: "01:06 AM", reason: "Dental Cleaning", status: "pending" },
    { id: 3, patientName: "Dhiraj Prajapati", date: "2024-02-22", time: "09:30 AM", reason: "Consultant", status: "pending" },
    { id: 4, patientName: "Elon Smith", date: "2024-01-01", time: "11:30 AM", reason: "Operation", status: "completed" },
    { id: 5, patientName: "oontie ith", date: "2023-12-25", time: "04:30 PM", reason: "Operation", status: "cancelled" }
    // Add more appointments as needed
];


// Function to display appointments in the table
function displayAppointments(appointmentsToDisplay) {
    const tableBody = document.querySelector('#appointmentsTable tbody');

    // Clear table before adding rows
    tableBody.innerHTML = '';

    appointmentsToDisplay.forEach(appointment => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = appointment.id;
        row.insertCell(1).textContent = appointment.patientName;
        row.insertCell(2).textContent = appointment.date;
        row.insertCell(3).textContent = appointment.time;
        row.insertCell(4).textContent = appointment.reason;
        row.insertCell(5).textContent = appointment.status;

        const actionCell = row.insertCell(6);
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Details';
        // Add event listener for view button click
        viewButton.addEventListener('click', () => {
            // Implement logic to view appointment details
            console.log('View details for:', appointment.patientName);
        });
        actionCell.appendChild(viewButton);
    });
}

// Function to sort the table based on column index
function sortTable(columnIndex) {
    const statusFilter = document.getElementById('statusFilter').value;
    let sortedAppointments = appointments;

    if (statusFilter !== 'all') {
        sortedAppointments = sortedAppointments.filter(appointment => appointment.status === statusFilter);
    }

    sortedAppointments.sort((a, b) => {
        const valueA = a[Object.keys(a)[columnIndex]];
        const valueB = b[Object.keys(b)[columnIndex]];
        if (typeof valueA === 'string') {
            return valueA.localeCompare(valueB);
        } else {
            return valueA - valueB;
        }
    });
    displayAppointments(sortedAppointments);
}

// Function to search appointments by patient name
function searchAppointments() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    const filteredAppointments = appointments.filter(appointment => {
        const patientName = appointment.patientName.toLowerCase();
        const status = appointment.status;
        
        // Check if patient name contains the search input and status matches the filter
        return patientName.includes(searchInput) && (statusFilter === 'all' || status === statusFilter);
    });

    displayAppointments(filteredAppointments);
}

// Function to sort the table based on column index and search input
function sortAndSearchTable(columnIndex) {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    let filteredAppointments = appointments.filter(appointment => {
        const patientName = appointment.patientName.toLowerCase();
        const status = appointment.status;
        
        // Check if patient name contains the search input and status matches the filter
        return patientName.includes(searchInput) && (statusFilter === 'all' || status === statusFilter);
    });

    filteredAppointments.sort((a, b) => {
        const valueA = a[Object.keys(a)[columnIndex]];
        const valueB = b[Object.keys(b)[columnIndex]];
        if (typeof valueA === 'string') {
            return valueA.localeCompare(valueB);
        } else {
            return valueA - valueB;
        }
    });

    displayAppointments(filteredAppointments);
}

function filterAndDisplayAppointments(status) {
    const filteredAppointments = appointments.filter(appointment => {
        return status === 'all' || appointment.status === status;
    });
    displayAppointments(filteredAppointments);
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    

    if (filter === 'pending') {
        // Filter the appointments to show only pending ones
        filterAndDisplayAppointments('pending');
    } else if(filter === 'completed'){
        filterAndDisplayAppointments('completed');
    } else if(filter === 'cancelled'){
        filterAndDisplayAppointments('cancelled');
    } else {
        // Filter the appointments based on the status filter
        displayAppointments(appointments);
    }

});
    
const totalPendingAppointments = appointments.filter(appointment => appointment.status === 'pending').length;
document.getElementById('pendingAppointmentsCount').textContent = totalPendingAppointments;

const totalcomAppointments = appointments.filter(appointment => appointment.status === 'completed').length;
document.getElementById('completedAppointmentsCount').textContent = totalcomAppointments;

const totalcanAppointments = appointments.filter(appointment => appointment.status === 'cancelled').length;
document.getElementById('totalcancelledAppointmentsCount').textContent = totalcanAppointments;
// Function to filter appointments when status filter changes
function filterAppointments() {
    const statusFilter = document.getElementById('statusFilter').value;
    filterAndDisplayAppointments(statusFilter);
}
