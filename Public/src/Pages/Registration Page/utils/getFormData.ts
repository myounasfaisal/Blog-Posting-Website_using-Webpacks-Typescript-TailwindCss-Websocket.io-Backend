document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const avatarInput = document.getElementById("avatar") as HTMLInputElement;
  const avatarElem = document.getElementById(
    "display-avatar"
  ) as HTMLImageElement;

  if (!avatarInput || !avatarElem) {
    console.error("Required elements not found");
    return;
  }

  avatarInput.addEventListener("input", () => {
    console.log("Change event triggered");
    if (avatarInput.files && avatarInput.files.length > 0) {
      const file = avatarInput.files[0];
      const objectURL = URL.createObjectURL(file);
      console.log("File selected: ", file);
      console.log("Object URL: ", objectURL);
      avatarElem.src = objectURL;

      // Optionally, revoke the object URL after some time
      setTimeout(() => URL.revokeObjectURL(objectURL), 10000);
    } else {
      console.log("No file selected");
    }
  });
});
export const getFormData = (): FormData | null => {
  const avatar = document.getElementById("avatar") as HTMLInputElement;
  const name = document.getElementById("fullname") as HTMLInputElement;
  const username = document.getElementById("username") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  const password2 = document.getElementById(
    "confirm_password"
  ) as HTMLInputElement;

  if (!avatar.files || avatar.files.length === 0) {
    alert("Please Upload Your Avatar");
    return null;
  }

  if (
    [username, name, email, password, password2].some(
      (field) => field?.value.trim() === ""
    )
  ) {
    alert("Please fill all the fields");
    return null;
  }

  if (password.value !== password2.value) {
    alert("Passwords are not the same");
    return null;
  }

  const formData = new FormData();
  formData.append("avatar", avatar.files[0]);
  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  formData.append("name", name.value);

  return formData;
};
