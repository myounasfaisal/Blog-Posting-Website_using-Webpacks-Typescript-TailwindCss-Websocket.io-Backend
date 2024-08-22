export const avatarToLocalStorage = (avatarLink: string) => {
  if (avatarLink) {
    localStorage.setItem("Avatar", avatarLink);
  }
};
