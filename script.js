function handleBranch(value) {
  const q2 = document.getElementById("question2");
  const q3 = document.getElementById("question3");
  const submit = document.getElementById("submitSection");

  if (value === "yes") {
    q2.classList.remove("hidden");
    q3.classList.remove("hidden");
    submit.classList.remove("hidden");
  } else if (value === "no") {
    q2.classList.add("hidden");
    q3.classList.add("hidden");
    submit.classList.remove("hidden");
  } else {
    q2.classList.add("hidden");
    q3.classList.add("hidden");
    submit.classList.add("hidden");
  }
}

document.getElementById("surveyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const symptoms = this.symptoms?.value || "";
  const duration = this.duration?.value || "";
  const hasSymptoms = document.querySelector("#question1 select").value;

  db.collection("submissions").add({
    name,
    email,
    hasSymptoms,
    symptoms,
    duration,
    submittedAt: new Date()
  })
  .then(() => {
    document.getElementById("surveyForm").classList.add("hidden");
    document.getElementById("thankYouMessage").classList.remove("hidden");
  })
  .catch((error) => {
    alert("Error submitting form: " + error.message);
  });
});

