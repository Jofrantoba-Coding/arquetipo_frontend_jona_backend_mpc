import { clearSession, setToken } from "../methods/storage"

export const login = async () => {
    const data = {
        status: true,
        message: "User authenticated successfully",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDRiMDA1MjAtMTZiNi0xMWVmLWFkODItYWRlMWZkODczNzA4IiwibmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJUZXN0IiwiZW1haWwiOiJoYW5zZ2lhbmZyYW5jbzNAZ21haWwuY29tIiwicGhvbmUiOiIrNTE5NDUxMjI2ODAiLCJiaXJ0aGRhdGUiOm51bGwsImdlbmRlciI6bnVsbCwibGlua2VkaW5fdXJsIjpudWxsLCJ0d2l0dGVyX3VybCI6bnVsbCwiZmFjZWJvb2tfdXJsIjpudWxsLCJpbnN0YWdyYW1fdXJsIjpudWxsLCJpYXQiOjE3MTY4NzAwMDV9.2jw3pgzPYW6jZNBkZn6iCORYNA0btV2xa2OKxa8ajZ0",
        token_type: "Bearer",
        user: {
            user_id: "44b00520-16b6-11ef-ad82-ade1fd873708",
            name: "Test",
            last_name: "Test",
            email: "test@test.com"
        }
    }
    setToken(data.access_token)
    return data
}

export const requestAccessToken = () => {

}

export const requestRefreshAccessToken = () => {
    
}

export const logout = async () => {
    clearSession()
    return true
}

