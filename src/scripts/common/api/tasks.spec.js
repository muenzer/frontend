/* eslint-env jasmine */

describe('tasks api service', () => {
  var TasksService = require('./tasksService')
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
      $http.get.and.returnValue(Promise.resolve(mockTasks))
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
      $http.get.and.returnValue(Promise.resolve(mockTask))
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
})
