export const handleDeleteAccount = async (): Promise<void> => {
  // Confirm before deleting the account
  const confirmDeletion = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmDeletion) {
    return;
  }

  // Example API request to delete the account (you'll need to implement this)
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/user/delete-account",
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Account deleted successfully!");
      window.location.href = "./index.html";
      // Redirect or perform any other necessary actions
    } else {
      alert("Failed to delete account.");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("An error occurred. Please try again.");
  }
};
