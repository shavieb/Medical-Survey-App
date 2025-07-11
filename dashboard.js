const resultsTableBody = document.querySelector("#resultsTable tbody");

db.collection("submissions").orderBy("submittedAt", "desc").onSnapshot(snapshot => {
  resultsTableBody.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.name || ""}</td>
      <td>${data.email || ""}</td>
      <td>${data.hasSymptoms || ""}</td>
      <td>${data.symptoms || ""}</td>
      <td>${data.duration || ""}</td>
      <td>${
        data.submittedAt?.toDate?.()
          ? data.submittedAt.toDate().toLocaleString()
          : "N/A"
      }</td>
    `;

    resultsTableBody.appendChild(row);
  });
});

document.getElementById("downloadCsvBtn").addEventListener("click", async () => {
  const snapshot = await db.collection("submissions").orderBy("submittedAt", "desc").get();

  const rows = [["Name", "Email", "Has Symptoms", "Symptoms", "Duration", "Submitted At"]];

  snapshot.forEach(doc => {
    const data = doc.data();
    rows.push([
      data.name || "",
      data.email || "",
      data.hasSymptoms || "",
      data.symptoms || "",
      data.duration || "",
      data.submittedAt?.toDate?.().toLocaleString() || ""
    ]);
  });

  const csvContent = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "survey_results.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
