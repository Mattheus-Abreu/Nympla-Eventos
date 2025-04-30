const database = require("../../frameworks/PgDatabase");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken")

const userRepository = new UserRepository(database);

//return all users from the database
async function getAllUsers(req, res) {
  const service = new UserService(userRepository);
  const responseService = await service.getAllUsers();

  if (responseService.error) {
    return res.status(500).json({ error: responseService.error });
  }

  res.status(201).json( { status: responseService})
}

// register a user in database
async function registerUser(req, res){
  const data = req.body

  const service = new UserService(userRepository)
  const responseService = await service.registerUser(data)

  if (responseService.error){
    return res.status(500).json({error: responseService.error})
  }

  //res.status(201).json( { status: "User successfully created!"})
  res.status(201).json( { status: responseService})
}

async function loginUser(req, res){
  const dataLogin = req.body

  const service = new UserService(userRepository)
  const responseService = await service.autenticateUser(dataLogin)

  if (responseService.error){
    return res.status(responseService.code).json({error: responseService.error})
  }

  const payload = {
    userId: responseService.user.id,
    role: responseService.user.role,
    userName: responseService.user.name
  }


  const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "60m"})

  let redirect = ""
  if(responseService.user.role == "admin") redirect = "admin.html"
  else redirect = "profile.html"


  res.status(200).json( {token, redirect} )
}

async function profileUser(req, res){
  res.json("Bem vindo! você esta autenticado para usar a pagina profile")
}

async function adminUser(req, res){
  res.json("Bem vindo! vocé eh admin")
}



module.exports = { getAllUsers, registerUser, loginUser, profileUser, adminUser };
