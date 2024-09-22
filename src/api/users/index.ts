import type { User, UserDetail } from 'src/types/user';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';

type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = {
  token: string;
  userInfo: UserDetail;
};

type SignUpRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type SignUpResponse = Promise<{
  accessToken: string;
}>;

export class UsersApi {
  static async postUser(request: Omit<User, 'id'>): Promise<User> {
    return await apiPost('/users', request);
  }

  static async getUsers(request: {}): Promise<UserDetail[]> {
    const response = await apiGet('/users', getFormData(request));
    return response;
  }

  static async putUser(request: Partial<User>) {
    const response = await apiPatch('/users/' + request.id, request);
    return response.data;
  }

  static async deleteUser(id: User['id'][]) {
    return await apiDelete(`/users/${id}`, { id });
  }

  static async signIn(request: SignInRequest): Promise<SignInResponse> {
    return await apiPost('/user/signin', request);
  }

  static async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return await apiPost('/user/signup', request);
  }

  static async me(): Promise<UserDetail> {
    return await apiGet('/user/profile');
  }

  static async updatePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }): Promise<User> {
    return await apiPut('/user/update-password', payload);
  }
}
