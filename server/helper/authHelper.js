import bcrypt from 'bcrypt';

//to encrypt password
export let encryptedPassword=async(password)=>{
    let salt=10;
    let hashedPassword=bcrypt.hash(password,salt)
    return hashedPassword
}

//to match password when login
export let matchPassword=async (password,hashpassword)=>{
    return bcrypt.compare(password,hashpassword)
}