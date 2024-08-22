export const avatarFromLocalStorage = () => {
  const Avatar = localStorage.getItem("Avatar");

  if (Avatar) {
    return Avatar;
  }
};
