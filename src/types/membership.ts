import { ApiResponse } from './response'

export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface ProfileBody {
  first_name: string
  last_name: string
}
export interface ProfileImageBody {
  file: File
}

export interface AuthResponse extends ApiResponse {
  data: {
    token: string
  }
}

export interface ProfileResponse extends ApiResponse {
  data: {
    email: string
    first_name: string
    last_name: string
    profile_image: string
  }
}
