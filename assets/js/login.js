let server = "http://195.26.245.5:9505/api/";

let loginSubmitBtn = document.querySelector("#loginSubmitBtn"),
  globalError = document.querySelector(".globalError"),
  isValid = true;

const fields = {
  password: {
    input: document.querySelector(".passwordForLogin"),
    error: document.querySelector(".passwordErrorForLogin"),
  },

  username: {
    input: document.querySelector(".usernameForLogin"),
    error: document.querySelector(".usernameErrorForLogin"),
  },
};

const regex = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]{8,15}$/,
  username: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
};

const rules = {
  username: (u) =>
    regex.username.test(u) ? null : "Username standartlara uyğun deyil !",
  password: (p) =>
    regex.password.test(p) ? null : "Password düz qurulmayib !",
};

Object.keys(fields).forEach((field) => {
  fields[field].input.addEventListener("input", () => {
    const value = fields[field].input.value;
    const error = rules[field](value);

    error ? showError(field, error) : hideError(field);
  });
});

function showError(field, error) {
  const input = fields[field].input;
  const errorElement = fields[field].error;

  input.classList.add("inputError");
  input.classList.remove("successMessage");

  errorElement.textContent = error;
}

function hideError(field) {
  const input = fields[field].input;
  const errorElement = fields[field].error;

  input.classList.add("successMessage");
  input.classList.remove("inputError");

  errorElement.textContent = "";
}

function checkValidation() {
  isValid = true;
  Object.keys(fields).forEach((field) => {
    const value = fields[field].input.value;
    const error = rules[field](value);

    if (error) {
      isValid = false;
      showError(field, error);
    } else {
      hideError(field);
    }
  });

  return isValid;
}

async function login(username, password) {
  const response = await fetch(`${server}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(
      response?.message ? "Error : " + response?.message : "Server error !",
    );
  }

  const cleanResponse = await response.json();
  return cleanResponse;
}

async function fetchLogin() {
  if (!checkValidation()) return;

  loginSubmitBtn.disabled = true;

  try {
    const username = fields.username.input.value;
    const password = fields.password.input.value;

    const result = await login(username, password);

    console.log(result);

    if (typeof Toastify !== "undefined") {
      Toastify({
        text: "Ugurla daxil oldunuz !",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }

    setTimeout(() => {
      window.location.href = "/profile.html";
    }, 3000);
  } catch (error) {
    globalError.textContent = error.message || error;
  } finally {
    loginSubmitBtn.disabled = false;

    Object.keys(fields).forEach((field) => {
      fields[field].input.value = "";
    });
  }
}
