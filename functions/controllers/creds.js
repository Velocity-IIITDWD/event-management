// add validation here tooooooo!!

const Creds = require('../models/creds')

exports.getCreds = async (req, res, next) => {
  try {
    const creds = await Creds.find()
    res.status(200).json({
      message: 'Creds fetched!',
      creds,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.addCreds = async (req, res, next) => {
  const points = req.body.points
  const timestamp = Date.now()
  const title = req.body.title
  const description = req.body.description

  try {
    const creds = await Creds.create({
      points,
      timestamp,
      title,
      description,
    })
    res.status(201).json({
      message: 'Creds added!',
      creds,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteCreds = async (req, res, next) => {
  try {
    const creds = await Creds.findByIdAndDelete(req.params.credsId)
    res.status(200).json({
      message: 'Creds deleted!',
      creds,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
