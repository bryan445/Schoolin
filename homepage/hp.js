const schools = [
  { name: "Ngoms Private Secondary", file: "schools/ngoms.json" },
  { name: "Fountain of Victory Secondary", file: "schools/fountain.json" }
];

const searchBar = document.getElementById("searchBar");
const schoolList = document.getElementById("schoolList");

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  schoolList.innerHTML = "";

  schools
    .filter(s => s.name.toLowerCase().includes(query))
    .forEach(school => {
      const li = document.createElement("li");
      li.textContent = school.name;
      li.onclick = () => {
        // Save selected school in sessionStorage
        sessionStorage.setItem("selectedSchool", JSON.stringify(school));
        // Open the portal
        window.location.href = "templ.html";
      };
      schoolList.appendChild(li);
    });
});
