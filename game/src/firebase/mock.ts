// A simple mock for Firebase Auth and Firestore to allow local development
// and easy swapping with real Firebase credentials later.

export const mockUser = {
  uid: 'local-test-user',
  displayName: 'Test Player',
  email: 'test@example.com'
};

let isLoggedIn = false;

export async function loginWithGoogle() {
  console.log('[Firebase Mock] Logging in with Google...');
  return new Promise((resolve) => {
    setTimeout(() => {
      isLoggedIn = true;
      resolve(mockUser);
    }, 500);
  });
}

export async function loginWithApple() {
  console.log('[Firebase Mock] Logging in with Apple...');
  return new Promise((resolve) => {
    setTimeout(() => {
      isLoggedIn = true;
      resolve(mockUser);
    }, 500);
  });
}

export function getCurrentUser() {
  return isLoggedIn ? mockUser : null;
}

// Mock Firestore saving mechanism using localStorage
export const db = {
  saveCharacter: async (characterData: any) => {
    console.log('[Firebase Mock] Saving character data...', characterData);
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(`character_${mockUser.uid}`, JSON.stringify(characterData));
        resolve(true);
      }, 500);
    });
  },

  loadCharacter: async () => {
    console.log('[Firebase Mock] Loading character data...');
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(`character_${mockUser.uid}`);
        resolve(data ? JSON.parse(data) : null);
      }, 500);
    });
  }
};
