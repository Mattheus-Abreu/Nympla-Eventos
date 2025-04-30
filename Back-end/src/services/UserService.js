const bcrypt = require("bcryptjs");
const User = require("../entities/User");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
    // return await "Listando usuários ...";
  }

  async registerUser(data){
    console.log(data)

    const cryptPassword = await bcrypt.hash(data.password, 10)

    const user = new User(data.name, data.email, cryptPassword, data.birth)

    return await this.userRepository.registerUser(user)
    
  }

  async autenticateUser(dataLogin){
    const user = await this.userRepository.getUserByEmail(dataLogin.email)

    if(!user){
      return { error: "User not found!", code: 404 }
    }

    const correctPassword = await bcrypt.compare(dataLogin.password, user.password)

    if(!correctPassword){
      return { error: "Invalid Credentials", code: 401 }
    }

    return { user }
  }


}

module.exports = UserService;
