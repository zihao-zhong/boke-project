module.exports = app => {
  const env = require('../../env')
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  const User = require('../../models/User')
  const multer = require('multer')
  const jwt = require('jsonwebtoken')
  const upload = multer({ dest: __dirname + '/../../uploads'})

  router.get('/category/list', async (req, res) => {
    const data = await Category.find()
    res.send(data)
  })

  router.post('/category/create', async (req, res) => {
    const data = await Category.create(req.body)
    if ( data ) {
      res.send({
        message: '新增成功'
      })
    } else {
      res.send({
        message: '新增失败'
      })
    }
  })

  router.delete('/category/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({ message: '删除成功' })
  })

  router.post('/upload/file', upload.single('file'), async (req, res) => {
    const data = req.file
    data.url = `${env.LOCAL_URL}/uploads/${data.filename}`
    res.send(data)
  })


  router.post('/article/create', async (req, res) => {
    const data = await Article.create(req.body)

    if ( data ) {
      res.send({ message: '新增成功' })
    } else {
      res.status(422).send({ message: '新增失败' })
    }
  })

  router.get('/article/list', async (req, res) => {
    const data = await Article.find().setOptions({
      populate: 'category'
    }).limit(10)

    res.send(data)
  })

  router.get('/article/:id', async (req, res) => {
    const data = await Article.findById(req.params.id)
    res.send(data)
  })
  router.put('/article/:id', async (req, res) => {
    await Article.findByIdAndUpdate(req.params.id)
    res.send({ message: '修改成功' })
  })

  router.delete('/article/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({ message: '删除成功' })
  })


  router.post('/login/create', async (req, res) => {
    const data = await User.create(req.body)
    res.send(data)
  })

  router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')
    if ( !user ) {
      res.status(422).send({ message: '用户不存在，请检查输入的用户名是否正确' })
    }

    const isValid = require('bcryptjs').compareSync(password, user.password)
    if ( !isValid ) {
      res.status(422).send({ message: '密码错误，请检查输入的密码是否正确' })
    }

    const token = jwt.sign({id: user._id}, app.get('secret'))

    res.send({
      token,
      message: '登录成功'
    })
  })




  app.use('/admin/api', router)
}