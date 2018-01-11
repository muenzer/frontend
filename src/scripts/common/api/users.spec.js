/* eslint-env jasmine */

describe('users api service', () => {
  var UsersService = require('./api.users')
  var usersService

  var $http

  it('provides a function', () => {
    expect(typeof UsersService).toBe('function')
  })

  it('is a constructor', () => {
    usersService = new UsersService($http, 'apiroot')
    expect(typeof usersService).toBe('object')
  })

  describe('login', () => {
    beforeEach(() => {
      var response = {
        user: {
          email: 'bob@bob.com',
          token: 'xxx'
        }
      }

      $http = jasmine.createSpyObj('http', ['get', 'post'])
      $http.post.and.returnValue(Promise.resolve({data: response}))
      usersService = new UsersService($http, 'apiroot')
    })

    it('provides a login method', () => {
      expect(usersService.login).toBeDefined()
    })

    it('returns a promise', () => {
      expect(usersService.login({}).then).toBeDefined()
      expect(usersService.login({}).catch).toBeDefined()
    })

    it('calls the $http post service', (done) => {
      var credentials = {
        user: {
          email: 'bob@bob.com',
          password: 'abc123'
        }
      }
      usersService.login(credentials)
      .then(function (response) {
        expect($http.post).toHaveBeenCalled()
        expect($http.post).toHaveBeenCalledWith('apiroot/users/login', credentials)
        done()
      })
      .catch((err) => {
        fail(err)
        done()
      })
    })

    it('error if no credentials are provided', (done) => {
      usersService.login()
      .then(function (response) {
        fail()
        done()
      })
      .catch((err) => {
        expect(err.message).toBe('no credentials provided')
        done()
      })
    })

    it('returns a token', (done) => {
      var credentials = {
        user: {
          email: 'bob@bob.com',
          password: 'abc123'
        }
      }
      usersService.login(credentials)
      .then(function (token) {
        expect(token).toBe('xxx')
        done()
      })
      .catch((err) => {
        fail(err)
        done()
      })
    })
  })

  describe('userInfo', () => {
    var userInfo

    var profile = {
      profile: {
        name: 'bob'
      }
    }

    beforeEach(() => {
      $http = jasmine.createSpyObj('http', ['get', 'post'])
      $http.get.and.returnValue(Promise.resolve({data: profile}))
      usersService = new UsersService($http, 'apiroot')
      userInfo = usersService.userInfo()
    })

    it('provides a userInfo method', () => {
      expect(usersService.userInfo).toBeDefined()
    })

    it('returns a promise', () => {
      expect(userInfo.then).toBeDefined()
      expect(userInfo.catch).toBeDefined()
    })

    it('calls the $http get service', (done) => {
      userInfo
      .then(function (response) {
        expect($http.get).toHaveBeenCalled()
        expect($http.get).toHaveBeenCalledWith('apiroot/users')
        done()
      })
    })

    it('returns user info', (done) => {
      userInfo
      .then(function (response) {
        expect(response.name).toBe('bob')
        done()
      })
    })
  })
})
