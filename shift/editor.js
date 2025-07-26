let students = {};
let selectedStudent = null;
let selectedKey = null;

fetch("sample.json")
  .then(res => res.json())
  .then(data => {
    students = data;
    const studentSelect = document.getElementById("studentSelect");

    Object.keys(students).forEach(form => {
      students[form].forEach((student, index) => {
        const option = document.createElement("option");
        option.value = `${form}-${index}`;
        option.text = `${student.name} (${form})`;
        studentSelect.appendChild(option);
      });
    });
  });

document.getElementById("studentSelect").addEventListener("change", function() {
  const val = this.value;
  if (!val) return;

  const [form, index] = val.split("-");
  selectedStudent = students[form][index];
  selectedKey = { form, index: parseInt(index) };

  document.getElementById("studentForm").style.display = "block";
  document.getElementById("name").value = selectedStudent.name || "";
  document.getElementById("total").value = selectedStudent.fees.total || 0;
  document.getElementById("firstPayment").value = selectedStudent.fees.firstPayment || 0;
  document.getElementById("secondPayment").value = selectedStudent.fees.secondPayment || 0;
  document.getElementById("balance").value = selectedStudent.fees.balance || 0;

  document.getElementById("Math").value = selectedStudent.results.subjects.Math || 0;
  document.getElementById("English").value = selectedStudent.results.subjects.English || 0;
  document.getElementById("Biology").value = selectedStudent.results.subjects.Biology || 0;
  document.getElementById("remarks").value = selectedStudent.results.remarks || "";
});

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const { form, index } = selectedKey;

  students[form][index].name = document.getElementById("name").value;
  students[form][index].fees = {
    total: +document.getElementById("total").value,
    firstPayment: +document.getElementById("firstPayment").value,
    secondPayment: +document.getElementById("secondPayment").value,
    balance: +document.getElementById("balance").value
  };
  students[form][index].results.subjects = {
    Math: +document.getElementById("Math").value,
    English: +document.getElementById("English").value,
    Biology: +document.getElementById("Biology").value
  };
  students[form][index].results.remarks = document.getElementById("remarks").value;

  document.getElementById("outputJson").textContent = JSON.stringify(students, null, 2);
  alert("Student updated! Copy the new JSON below.");
});
