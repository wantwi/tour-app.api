
const logger = (req, res, next) => {
    req.hello = "hi Mid"
    console.log("mid running.....");
    next()
}

module.exports = logger