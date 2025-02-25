// app/services/login-service.ts

interface LoginResponse {
    success: boolean;
    msg: {
      status: string;
      memberCode: string;
      responseCode: string[];
      loginId: string;
      token: string;
    };
    responseCode: string[];
  }
  
  interface LoginRequest {
    loginId: string;
    password: string;
    secretKey: string;
    memberCode: string;
  }
  
  const loginApiUrl = 'http://192.168.1.131:3000/api/login/auth';
  
  export const loginUser = async (data: LoginRequest) => {
    try {
      const response = await fetch(loginApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result: LoginResponse = await response.json();
  
      if (response.ok && result.success && result.msg.status === 'success') {
        return { success: true, token: result.msg.token };
      }
  
      return { success: false, error: 'Invalid credentials or other error' };
    } catch (error) {
      return { success: false, error: 'Error occurred while logging in.' };
    }
  };
  