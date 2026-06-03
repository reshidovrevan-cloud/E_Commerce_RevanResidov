let server = "http://195.26.245.5:9505/api";

let signUpForm = document.querySelector("#signUpForm"),
  globalError = document.querySelector(".globalError");

const createAccountButton = signUpForm.querySelector("button[type='submit']");

const fields = {
  name: {
    input: document.querySelector("#name"),
    error: document.querySelector(".nameError"),
  },
  surname: {
    input: document.querySelector("#surname"),
    error: document.querySelector(".surnameError"),
  },
  password: {
    input: document.querySelector("#password"),
    error: document.querySelector(".passwordError"),
  },
  username: {
    input: document.querySelector("#username"),
    error: document.querySelector(".usernameError"),
  },
  email: {
    input: document.querySelector("#email"),
    error: document.querySelector(".emailError"),
  },
};

const regex = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]{8,15}$/,
  username: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const rules = {
  name: (n) =>
    n.length < 3 || n.length > 10
      ? "Ad 3 ile 10 simvol arasinda olmalidir!"
      : null,
  surname: (s) =>
    s.length < 5 || s.length > 10
      ? "Soyad 5 ile 10 simvol arasinda olmalidir!"
      : null,
  username: (u) =>
    regex.username.test(u)
      ? null
      : "Username standartlara uygun deyil (mes: user_12)!",
  password: (p) =>
    regex.password.test(p)
      ? null
      : "sifrede en az 1 boyuk, 1 kiçik herf, 1 reqem ve 1 xususi simvol olmalidir (8-15 simvol)!",
  email: (e) => (regex.email.test(e) ? null : "Email duzgun formada deyil!"),
};

Object.keys(fields).forEach((field) => {
  if (fields[field].input) {
    fields[field].input.addEventListener("input", () => {
      const value = fields[field].input.value.trim();
      const error = rules[field](value);
      error ? showError(field, error) : hideError(field);
    });
  }
});

function showError(field, error) {
  if (fields[field].error) {
    fields[field].error.textContent = error;
    fields[field].input.classList.add("is-invalid");
    fields[field].input.classList.remove("is-valid");
  }
}

function hideError(field) {
  if (fields[field].error) {
    fields[field].error.textContent = "";
    fields[field].input.classList.remove("is-invalid");
    fields[field].input.classList.add("is-valid");
  }
}

async function fetchRegister(e) {
  e.preventDefault();

  let hasError = false;

  Object.keys(fields).forEach((field) => {
    const value = fields[field].input.value.trim();
    const error = rules[field](value);
    if (error) {
      showError(field, error);
      hasError = true;
    }
  });

  if (hasError) {
    if (globalError)
      globalError.textContent = "Zehmet olmasa xetalari duzeldin!";
    return;
  }

  if (globalError) globalError.textContent = "";
  if (createAccountButton) createAccountButton.disabled = true;

  try {
    const registerData = {
      name: fields.name.input.value.trim(),
      surname: fields.surname.input.value.trim(),
      email: fields.email.input.value.trim(),
      username: fields.username.input.value.trim(),
      password: fields.password.input.value.trim(),
    };

    const response = await fetch(`${server}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Xeta bas verdi!");
    }

    const token = result.body?.token || result.token;
    const refreshToken = result.body?.refreshToken || result.refreshToken;

    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    localStorage.setItem("user", JSON.stringify(registerData));

    Toastify({
      text: "Ugurla qeydiyyat oldunuz !",
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

    setTimeout(() => {
      window.location.href = "/logİn.html";
    }, 2500);
  } catch (error) {
    console.error(error);
    if (globalError) {
      globalError.textContent = error.message || "Baglanti xetasi bas verdi!";
    }
  } finally {
    if (createAccountButton) createAccountButton.disabled = false;
  }
}

if (createAccountButton) {
  createAccountButton.addEventListener("click", fetchRegister);
}
