export interface User {
    UserEmail: string;
    UserName: string;   
    UserPhoneNumber: string;
    password: string;
    role: 'admin' | 'customer';
}