
const uploadImg = (req,res)=>{
    const file = req.file

    if (!file) {
        const error = new Error('Error subiendo el archivo')
        error.httpStatuscode = 400
        return next(error)
    }

    res.status(200).json({nombre: file.filename})
}

module.exports = {
    uploadImg
}