document.addEventListener('DOMContentLoaded', () => {
    let leaveBalance = 20; // Default leave balance

    // Toggle between pages
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');

            // Show the targeted page and hide others
            sections.forEach(section => {
                section.style.display = section.getAttribute('data-page') === targetPage ? 'block' : 'none';
            });
        });
    });

    // Leave application logic
    const leaveForm = document.getElementById('leaveForm');
    const leaveBalanceElement = document.getElementById('leaveBalance');
    const leaveRequests = document.getElementById('leaveRequests');

    leaveForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get leave details
        const leaveType = document.getElementById('leaveType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const reason = document.getElementById('reason').value;

        // Calculate number of leave days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = (end - start) / (1000 * 60 * 60 * 24) + 1;

        if (days <= 0) {
            alert("Invalid date range. Please check your start and end dates.");
            return;
        }

        // Check leave balance
        if (days > leaveBalance) {
            alert("Insufficient leave balance.");
            return;
        }

        // Deduct leave balance
        leaveBalance -= days;
        leaveBalanceElement.textContent = leaveBalance;

        // Add leave request to dashboard
        const leaveRequest = document.createElement('div');
        leaveRequest.innerHTML = `
            <p>Leave Type: ${leaveType}</p>
            <p>Duration: ${days} days</p>
            <p>Reason: ${reason}</p>
            <p>Status: <span style="color: orange;">Pending</span></p>
            <hr>
        `;
        leaveRequests.appendChild(leaveRequest);

        // Reset the form
        leaveForm.reset();
        alert("Leave request submitted successfully!");
    });
});