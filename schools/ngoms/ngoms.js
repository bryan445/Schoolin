let studentData = {};

// Load student data from JSON file
fetch("ngoms.json")
  .then(res => res.json())
  .then(data => {
    studentData = data;
  })
  .catch(err => {
    console.error("Failed to load student data:", err);
  });

// Set dynamic school name from URL
const school = new URLSearchParams(window.location.search).get("school") || "Ngoms Private Schools";
document.getElementById("schoolName").textContent = school;

// Show School Fees form
function showFeesForm() {
  document.getElementById('feesForm').style.display = 'block';
  document.getElementById('feesResult').style.display = 'none';
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('resultsDisplay').style.display = 'none';
  document.getElementById('newsSection').style.display = 'none';
}

// Show Exam Results form
function goToResults() {
  document.getElementById('resultsSection').style.display = 'block';
  document.getElementById('resultsDisplay').style.display = 'none';
  document.getElementById('feesForm').style.display = 'none';
  document.getElementById('feesResult').style.display = 'none';
  document.getElementById('newsSection').style.display = 'none';
}

// Admissions alert
function admissionForm() {
  alert("Please visit the school's office or contact us via WhatsApp for admissions.");
}

// Submit and display school fees
function submitFees() {
  const nameInput = document.getElementById('nameInput').value.trim().toLowerCase();
  const classInput = document.getElementById('classInput').value.trim();

  const classStudents = studentData[classInput];
  if (!classStudents) {
    alert("Class not found.");
    return;
  }

  // Find student by name (case-insensitive)
  const student = classStudents.find(s => s.name.toLowerCase() === nameInput);
  if (!student) {
    alert("Student not found in the specified class.");
    return;
  }

  const fees = student.fees;

  document.getElementById('displayStudentName').textContent = student.name;
  document.getElementById('displayClass').textContent = classInput;
  document.getElementById('displayTotal').textContent = fees.total.toLocaleString();
  document.getElementById('displayFirst').textContent = fees.firstPayment.toLocaleString();
  document.getElementById('displaySecond').textContent = fees.secondPayment.toLocaleString();
  document.getElementById('displayBalance').textContent = fees.balance.toLocaleString();

  document.getElementById('feesForm').style.display = 'none';
  document.getElementById('feesResult').style.display = 'block';
}

// Submit and display exam results
function submitResults() {
  const classInput = document.getElementById('resClassInput').value.trim();
  const regInput = document.getElementById('resRegInput').value.trim();

  const classStudents = studentData[classInput];
  if (!classStudents) {
    alert("Class not found.");
    return;
  }

  // Find student by registration number
  const student = classStudents.find(s => s.regNumber === regInput);
  if (!student) {
    alert("Student not found in the specified class.");
    return;
  }

  document.getElementById('resStudentName').textContent = student.name;
  document.getElementById('resStudentClass').textContent = classInput;
  document.getElementById('resRemarks').textContent = student.results.remarks;

  const subjectScores = document.getElementById('subjectScores');
  subjectScores.innerHTML = "";

  for (const [subject, mark] of Object.entries(student.results.subjects)) {
    const li = document.createElement('li');
    li.textContent = `${subject}: ${mark}%`;
    li.style.color = mark >= 40 ? "green" : "red";
    subjectScores.appendChild(li);
  }

  document.getElementById('resultsDisplay').style.display = 'block';
}
