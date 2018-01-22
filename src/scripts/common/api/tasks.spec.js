/* eslint-env jasmine */

describe('tasks api service', () => {
  var TasksService = require('./api.tasks')
  var tasksService

  var $http

  it('provides a function', () => {
    expect(typeof TasksService).toBe('function')
  })

  it('is a constructor', () => {
    tasksService = new TasksService($http, 'apiroot')
    expect(typeof tasksService).toBe('object')
  })

  describe('getList', () => {
    beforeEach(() => {
      var mockTasks = {
        'tasks': [
          {
            'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
            'status': 'shown',
            'id': 1
          },
          {
            'name': 'Make a seating chart',
            'status': 'shown',
            'id': 2
          }
        ],
        'count': 2
      }

      $http = jasmine.createSpyObj('http', ['get'])
      $http.get.and.returnValue(Promise.resolve({data: mockTasks}))
      tasksService = new TasksService($http, 'apiroot')
    })

    it('provides a get list method', () => {
      expect(tasksService.getList).toBeDefined()
    })

    it('returns a promise', () => {
      expect(tasksService.getList().then).toBeDefined()
      expect(tasksService.getList().catch).toBeDefined()
    })

    it('calls the $http get service', (done) => {
      tasksService.getList()
      .then(function (response) {
        expect($http.get).toHaveBeenCalled()
        expect($http.get).toHaveBeenCalledWith('apiroot/tasks')
        done()
      })
    })

    it('returns an array of tasks', (done) => {
      tasksService.getList()
      .then(function (tasks) {
        expect(Array.isArray(tasks)).toBeTruthy()
        expect(tasks[0].constructor.name).toBe('Task')
        done()
      })
    })
  })

  describe('get', () => {
    beforeEach(() => {
      var mockTask = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'shown',
          'id': 1
        }
      }

      $http = jasmine.createSpyObj('http', ['get'])
      $http.get.and.returnValue(Promise.resolve({data: mockTask}))
      tasksService = new TasksService($http, 'apiroot')
    })

    it('provides a get method', () => {
      expect(tasksService.get).toBeDefined()
    })

    it('returns a promise', () => {
      expect(tasksService.get(1).then).toBeDefined()
      expect(tasksService.get(1).catch).toBeDefined()
    })

    it('calls the $http get service', (done) => {
      tasksService.get(1)
      .then(function (response) {
        expect($http.get).toHaveBeenCalled()
        expect($http.get).toHaveBeenCalledWith('apiroot/tasks/1')
        done()
      })
      .catch((err) => {
        console.log(err)
        fail()
        done()
      })
    })

    it('it returns a task type', (done) => {
      tasksService.get(1)
      .then(function (task) {
        expect(task).toBeTruthy()
        expect(task.constructor.name).toBe('Task')
        expect(task.id).toBe(1)
        done()
      })
    })

    it('it returns a task with methods', (done) => {
      tasksService.get(1)
      .then(function (task) {
        expect(task.work).toBeDefined()
        expect(task.cancel).toBeDefined()
        expect(task.submit).toBeDefined()
        done()
      })
    })
  })

  describe('task method work', () => {
    var work

    beforeEach(() => {
      var mockTask = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'shown',
          'id': 1
        }
      }

      var mockTaskWorked = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'working',
          'id': 1
        }
      }

      $http = jasmine.createSpyObj('http', ['get', 'post'])
      $http.get.and.returnValue(Promise.resolve({data: mockTask}))
      $http.post.and.returnValue(Promise.resolve({data: mockTaskWorked}))
      tasksService = new TasksService($http, 'apiroot')

      work = tasksService.get(1)
      .then(function (task) {
        return task.work()
      })
    })

    it('returns a promise', () => {
      expect(work.then).toBeDefined()
      expect(work.catch).toBeDefined()
    })

    it('calls the $http post service', (done) => {
      work
      .then(function (response) {
        expect($http.post).toHaveBeenCalled()
        expect($http.post).toHaveBeenCalledWith('apiroot/tasks/1/work')
        done()
      })
      .catch((err) => {
        console.log(err)
        fail()
        done()
      })
    })

    it('it returns a task type', (done) => {
      work
      .then(function (task) {
        expect(task).toBeTruthy()
        expect(task.constructor.name).toBe('Task')
        expect(task.status).toBe('working')
        done()
      })
    })
  })

  describe('task method cancel', () => {
    var cancel

    beforeEach(() => {
      var mockTask = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'working',
          'id': 2
        }
      }

      var mockTaskCanceled = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'shown',
          'id': 2
        }
      }

      $http = jasmine.createSpyObj('http', ['get', 'post'])
      $http.get.and.returnValue(Promise.resolve({data: mockTask}))
      $http.post.and.returnValue(Promise.resolve({data: mockTaskCanceled}))
      tasksService = new TasksService($http, 'apiroot')

      cancel = tasksService.get(1)
      .then(function (task) {
        return task.cancel()
      })
    })

    it('returns a promise', () => {
      expect(cancel.then).toBeDefined()
      expect(cancel.catch).toBeDefined()
    })

    it('calls the $http post service', (done) => {
      cancel
      .then(function (response) {
        expect($http.post).toHaveBeenCalled()
        expect($http.post).toHaveBeenCalledWith('apiroot/tasks/2/cancel')
        done()
      })
      .catch((err) => {
        console.log(err)
        fail()
        done()
      })
    })

    it('it returns a task type', (done) => {
      cancel
      .then(function (task) {
        expect(task).toBeTruthy()
        expect(task.constructor.name).toBe('Task')
        expect(task.status).toBe('shown')
        done()
      })
    })
  })

  describe('task method submit', () => {
    var submit
    beforeEach(() => {
      var mockTask = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'working',
          'id': 2
        }
      }

      var mockTaskSubmitted = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'submitted',
          'id': 2
        }
      }

      $http = jasmine.createSpyObj('http', ['get', 'post'])
      $http.get.and.returnValue(Promise.resolve({data: mockTask}))
      $http.post.and.returnValue(Promise.resolve({data: mockTaskSubmitted}))
      tasksService = new TasksService($http, 'apiroot')

      submit = tasksService.get(1)
      .then(function (task) {
        return task.submit()
      })
    })

    it('returns a promise', () => {
      expect(submit.then).toBeDefined()
      expect(submit.catch).toBeDefined()
    })

    it('calls the $http post service', (done) => {
      submit
      .then(function (response) {
        expect($http.post).toHaveBeenCalled()
        expect($http.post).toHaveBeenCalledWith('apiroot/tasks/2/submit')
        done()
      })
      .catch((err) => {
        console.log(err)
        fail()
        done()
      })
    })

    it('it returns a task type', (done) => {
      submit
      .then(function (task) {
        expect(task).toBeTruthy()
        expect(task.constructor.name).toBe('Task')
        expect(task.status).toBe('submitted')
        done()
      })
    })
  })

  describe('task method respond', () => {
    var respond
    var data
    beforeEach(() => {
      var mockTask = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'working',
          'id': 2
        }
      }

      var mockTaskSubmitted = {
        'task':
        {
          'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
          'status': 'working',
          'id': 2,
          'response': [
            {
              'comment': 'foo',
              'files': []
            }
          ]
        }
      }

      data = {
        'comment': 'foo',
        'files': []
      }

      $http = jasmine.createSpyObj('http', ['get', 'post'])
      $http.get.and.returnValue(Promise.resolve({data: mockTask}))
      $http.post.and.returnValue(Promise.resolve({data: mockTaskSubmitted}))
      tasksService = new TasksService($http, 'apiroot')

      respond = tasksService.get(2)
      .then(function (task) {
        return task.respond(data)
      })
    })

    it('returns a promise', () => {
      expect(respond.then).toBeDefined()
      expect(respond.catch).toBeDefined()
    })

    it('calls the $http post service', (done) => {
      respond
      .then(function (response) {
        expect($http.post).toHaveBeenCalled()
        expect($http.post).toHaveBeenCalledWith('apiroot/tasks/2/respond', data)
        done()
      })
      .catch((err) => {
        console.log(err)
        fail()
        done()
      })
    })

    it('it returns a task type', (done) => {
      respond
      .then(function (task) {
        expect(task).toBeTruthy()
        expect(task.constructor.name).toBe('Task')
        expect(task.response).toBeDefined()
        done()
      })
    })
  })

  describe('userTasks', () => {
    var userTasks
    beforeEach(() => {
      var mockTasks = {
        'tasks': [
          {
            'name': 'Create an Event Volunteer Sign Up Sheet to be posted in the Springfield Food Pantry Office and posted on the food pantry’s facebook page.',
            'status': 'shown',
            'id': 1
          },
          {
            'name': 'Make a seating chart',
            'status': 'shown',
            'id': 2
          }
        ],
        'count': 2
      }

      $http = jasmine.createSpyObj('http', ['get'])
      $http.get.and.returnValue(Promise.resolve({data: mockTasks}))
      tasksService = new TasksService($http, 'apiroot')
      userTasks = tasksService.userTasks()
    })

    it('provides a user tasks method', () => {
      expect(tasksService.userTasks).toBeDefined()
    })

    it('returns a promise', () => {
      expect(userTasks.then).toBeDefined()
      expect(userTasks.catch).toBeDefined()
    })

    it('calls the $http get service', (done) => {
      userTasks
      .then(function (response) {
        expect($http.get).toHaveBeenCalled()
        expect($http.get).toHaveBeenCalledWith('apiroot/users/tasks')
        done()
      })
    })

    it('returns an array of tasks', (done) => {
      userTasks
      .then(function (tasks) {
        expect(Array.isArray(tasks)).toBeTruthy()
        expect(tasks[0].constructor.name).toBe('Task')
        done()
      })
    })
  })
})
