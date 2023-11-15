const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-signup-input").value.trim();
    const password = document.querySelector("#password-signup-input").value.trim();

    if (username && password) {
        const response = await fetch("/api/users/sign-up", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to sign up.");
        }
    } 
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);