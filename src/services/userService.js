export default class UserService {
  createUser(email, password) {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const id = Date.now().toString();
      const newUser = { id, email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      return id;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }

  loginUser(email, password) {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = existingUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        return { success: true, userId: user.id };
      } else {
        return { success: false, message: "Invalid username or password" };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: "An error occurred during login" };
    }
  }

  saveUserToLocalStorage(user) {
    try {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user to local storage:", error);
    }
  }

  removeUserFromLocalStorage() {
    try {
      localStorage.removeItem("loggedUser");
    } catch (error) {
      console.error("Error removing user from local storage:", error);
    }
  }

  getUserFromLocalStorage() {
    try {
      const user = localStorage.getItem("loggedUser");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting user from local storage:", error);
      return null;
    }
  }
}
