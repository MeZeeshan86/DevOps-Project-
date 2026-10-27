document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('.nav-tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');

            if (target === 'tab-monthly') loadMonthlyReport();
            if (target === 'tab-students') loadStudentsList();
        });
    });

    const attendanceDateInput = document.getElementById('attendance-date');
    const attendanceTbody = document.getElementById('attendance-tbody');
    const btnSaveAttendance = document.getElementById('btn-save-attendance');
    const btnMarkAllP = document.getElementById('btn-mark-all-p');
    const btnMarkAllA = document.getElementById('btn-mark-all-a');
    const btnExportCsv = document.getElementById('btn-export-csv');
    const monthlyPicker = document.getElementById('monthly-picker');
    const formAddStudent = document.getElementById('form-add-student');

    // Toast helper
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.background = isError ? '#dc2626' : '#1e293b';
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3500);
    }

    // --- MODULE 2 & 3: DAILY ATTENDANCE ---
    async function loadDailyAttendance() {
        const date = attendanceDateInput.value;
        try {
            const res = await fetch(`/api/attendance?date=${encodeURIComponent(date)}`);
            const data = await res.json();
            renderAttendanceTable(data.records);
        } catch (err) {
            console.error('Failed to load attendance:', err);
            showToast('Failed to fetch attendance data', true);
        }
    }

    function renderAttendanceTable(records) {
        attendanceTbody.innerHTML = '';
        records.forEach(rec => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-roll', rec.roll_no);

            let periodTds = '';
            for (let i = 1; i <= 7; i++) {
                const status = (rec[`p${i}`] || 'P').toUpperCase();
                const cls = status === 'P' ? 'period-p' : 'period-a';
                periodTds += `
                    <td class="text-center">
                        <span class="period-cell ${cls}" data-period="p${i}" data-status="${status}">${status}</span>
                    </td>
                `;
            }

            tr.innerHTML = `
                <td><strong>${rec.roll_no}</strong></td>
                <td>${rec.name}</td>
                ${periodTds}
            `;
            attendanceTbody.appendChild(tr);
        });

        // Attach click handlers to toggle P/A
        document.querySelectorAll('.period-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const cur = cell.getAttribute('data-status');
                const next = cur === 'P' ? 'A' : 'P';
                cell.setAttribute('data-status', next);
                cell.textContent = next;
                cell.className = `period-cell ${next === 'P' ? 'period-p' : 'period-a'}`;
            });
        });
    }

    // Quick Mark All Present
    btnMarkAllP.addEventListener('click', () => {
        document.querySelectorAll('.period-cell').forEach(cell => {
            cell.setAttribute('data-status', 'P');
            cell.textContent = 'P';
            cell.className = 'period-cell period-p';
        });
        showToast('Marked all periods as Present');
    });

    // Quick Mark All Absent
    btnMarkAllA.addEventListener('click', () => {
        document.querySelectorAll('.period-cell').forEach(cell => {
            cell.setAttribute('data-status', 'A');
            cell.textContent = 'A';
            cell.className = 'period-cell period-a';
        });
        showToast('Marked all periods as Absent');
    });

    // Save Attendance
    btnSaveAttendance.addEventListener('click', async () => {
        const date = attendanceDateInput.value;
        const rows = attendanceTbody.querySelectorAll('tr');
        const records = [];

        rows.forEach(tr => {
            const roll_no = tr.getAttribute('data-roll');
            const rowData = { roll_no };
            tr.querySelectorAll('.period-cell').forEach(cell => {
                const period = cell.getAttribute('data-period');
                const status = cell.getAttribute('data-status');
                rowData[period] = status;
            });
            records.push(rowData);
        });

        try {
            const res = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, records })
            });
            const data = await res.json();
            if (res.ok) {
                showToast(`Attendance saved successfully for ${date}`);
            } else {
                showToast(data.error || 'Failed to save', true);
            }
        } catch (err) {
            showToast('Network error while saving attendance', true);
        }
    });

    attendanceDateInput.addEventListener('change', loadDailyAttendance);

    // --- MODULE 4: MONTHLY ATTENDANCE REPORT ---
    async function loadMonthlyReport() {
        const month = monthlyPicker.value;
        try {
            const res = await fetch(`/api/monthly-report?month=${month}&threshold=75.0`);
            const data = await res.json();
            renderMonthlyReport(data);
        } catch (err) {
            console.error('Failed to load monthly report:', err);
            showToast('Failed to load monthly report', true);
        }
    }

    function renderMonthlyReport(data) {
        const tbody = document.getElementById('monthly-tbody');
        tbody.innerHTML = '';

        let totalWorking = 0;
        let totalPresent = 0;
        let defaulters = 0;

        data.report.forEach(row => {
            totalWorking += row.working_periods;
            totalPresent += row.present;
            if (row.is_defaulter) defaulters++;

            const tr = document.createElement('tr');
            if (row.is_defaulter) tr.classList.add('row-defaulter');

            tr.innerHTML = `
                <td><strong>${row.roll_no}</strong></td>
                <td>${row.name} ${row.is_defaulter ? '<span class="badge-defaulter">Low Attendance</span>' : ''}</td>
                <td class="text-right">${row.working_periods}</td>
                <td class="text-right">${row.present}</td>
                <td class="text-right">${row.absent}</td>
                <td class="text-right font-weight-bold ${row.is_defaulter ? 'text-danger' : 'text-success'}">
                    <strong>${row.percentage.toFixed(2)}%</strong>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('stat-total-students').textContent = data.report.length;
        document.getElementById('stat-working-periods').textContent = data.report.length ? data.report[0].working_periods : 154;
        const avg = totalWorking > 0 ? ((totalPresent / totalWorking) * 100).toFixed(2) : '0.00';
        document.getElementById('stat-class-average').textContent = `${avg}%`;
        document.getElementById('stat-defaulter-count').textContent = defaulters;
    }

    monthlyPicker.addEventListener('change', loadMonthlyReport);

    // Module 5: CSV Export
    btnExportCsv.addEventListener('click', () => {
        const month = monthlyPicker.value;
        window.location.href = `/api/export-csv?month=${month}`;
        showToast(`Downloading Attendance_Report_${month}.csv...`);
    });

    // --- MODULE 1: STUDENT DIRECTORY ---
    async function loadStudentsList() {
        try {
            const res = await fetch('/api/students');
            const students = await res.json();
            const tbody = document.getElementById('students-tbody');
            tbody.innerHTML = '';
            students.forEach(s => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${s.roll_no}</strong></td>
                    <td>${s.name}</td>
                    <td>${s.department}</td>
                    <td><span class="badge badge-success">Enrolled</span></td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error('Failed to load students:', err);
        }
    }

    formAddStudent.addEventListener('submit', async (e) => {
        e.preventDefault();
        const roll_no = document.getElementById('input-roll').value.trim();
        const name = document.getElementById('input-name').value.trim();
        const department = document.getElementById('input-dept').value.trim();

        if (!roll_no || !name) {
            showToast('Roll number and name are required', true);
            return;
        }

        try {
            const res = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roll_no, name, department })
            });
            const data = await res.json();
            if (res.ok) {
                showToast(`Student ${name} added successfully`);
                document.getElementById('input-roll').value = '';
                document.getElementById('input-name').value = '';
                loadStudentsList();
                loadDailyAttendance();
            } else {
                showToast(data.error || 'Error adding student', true);
            }
        } catch (err) {
            showToast('Network error while adding student', true);
        }
    });

    // Initial load
    loadDailyAttendance();
});
