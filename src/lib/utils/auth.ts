// Authentication utilities using localStorage
// Note: This is a simplified demo. In production, use proper backend authentication.

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface UserAccount extends User {
  passwordHash: string;
}

const STORAGE_KEYS = {
  USERS: "fitness_users",
  CURRENT_USER: "fitness_current_user",
};

// Simple hash function (for demo only - NOT secure for production)
const simpleHash = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

// Get all users
const getUsers = (): UserAccount[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

// Save users
const saveUsers = (users: UserAccount[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// Register new user
export const register = (
  email: string,
  password: string,
  name: string
): { success: boolean; message: string; user?: User } => {
  // Validation
  if (!email || !password || !name) {
    return { success: false, message: "Vui lòng điền đầy đủ thông tin" };
  }

  if (!email.includes("@")) {
    return { success: false, message: "Email không hợp lệ" };
  }

  if (password.length < 6) {
    return { success: false, message: "Mật khẩu phải có ít nhất 6 ký tự" };
  }

  // Check if email already exists
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: "Email đã được sử dụng" };
  }

  // Create new user
  const newUser: UserAccount = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name,
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without password
  const { passwordHash, ...user } = newUser;
  return {
    success: true,
    message: "Đăng ký thành công!",
    user,
  };
};

// Login user
export const login = (
  email: string,
  password: string
): { success: boolean; message: string; user?: User } => {
  // Validation
  if (!email || !password) {
    return { success: false, message: "Vui lòng điền đầy đủ thông tin" };
  }

  // Find user
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, message: "Email hoặc mật khẩu không đúng" };
  }

  // Check password
  if (user.passwordHash !== simpleHash(password)) {
    return { success: false, message: "Email hoặc mật khẩu không đúng" };
  }

  // Save current user
  const { passwordHash, ...userWithoutPassword } = user;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));

  return {
    success: true,
    message: "Đăng nhập thành công!",
    user: userWithoutPassword,
  };
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Get current logged in user
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

// Update user profile
export const updateUserProfile = (
  userId: string,
  updates: Partial<User>
): { success: boolean; message: string } => {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return { success: false, message: "Người dùng không tồn tại" };
  }

  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
  };

  saveUsers(users);

  // Update current user if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const { passwordHash, ...userWithoutPassword } = users[userIndex];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
  }

  return { success: true, message: "Cập nhật thành công" };
};

// Change password
export const changePassword = (
  email: string,
  oldPassword: string,
  newPassword: string
): { success: boolean; message: string } => {
  if (newPassword.length < 6) {
    return { success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự" };
  }

  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

  if (userIndex === -1) {
    return { success: false, message: "Người dùng không tồn tại" };
  }

  // Check old password
  if (users[userIndex].passwordHash !== simpleHash(oldPassword)) {
    return { success: false, message: "Mật khẩu cũ không đúng" };
  }

  // Update password
  users[userIndex].passwordHash = simpleHash(newPassword);
  saveUsers(users);

  return { success: true, message: "Đổi mật khẩu thành công" };
};
