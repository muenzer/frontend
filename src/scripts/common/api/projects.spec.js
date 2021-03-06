/* eslint-env jasmine */

describe('projects api service', () => {
  var ProjectsService = require('./api.projects')

  var projectsService

  var $http

  it('provides a function', () => {
    expect(typeof ProjectsService).toBe('function')
  })

  it('is a constructor', () => {
    projectsService = new ProjectsService($http, 'apiroot')
    expect(typeof projectsService).toBe('object')
  })

  describe('create', () => {
    var create

    beforeEach(() => {
      var mockProject = {
        'project': {
          'name': 'It is a project',
          'projectId': '123',
          'client': 'xyz'
        }
      }

      $http = jasmine.createSpyObj('http', ['post'])
      $http.post.and.returnValue(Promise.resolve({data: mockProject}))
      projectsService = new ProjectsService($http, 'apiroot')

      create = projectsService.create({data: 'foo'})
    })

    it('provides a create method', () => {
      expect(projectsService.create).toBeDefined()
    })

    it('returns a promise', () => {
      expect(create.then).toBeDefined()
      expect(create.catch).toBeDefined()
    })

    it('calls the $http post service', (done) => {
      create
      .then(function (response) {
        expect($http.post).toHaveBeenCalled()
        expect($http.post).toHaveBeenCalledWith('apiroot/projects', {data: 'foo'})
        done()
      })
    })

    it('returns a project', (done) => {
      create
      .then(function (project) {
        expect(project.constructor.name).toBe('Project')
        done()
      })
    })

    it('returns null when there is an error', (done) => {
      $http.post.and.returnValue(Promise.reject(new Error('User is not authorized to access this resource')))
      projectsService = new ProjectsService($http, 'apiroot')

      projectsService.create()
      .then((project) => {
        expect(project).toBe(null)
        done()
      })
      .catch((err) => {
        fail(err)
        done()
      })
    })
  })

  describe('getList', () => {
    var getList
    beforeEach(() => {
      var mockProjects = {
        'projects': [
          {
            'name': 'It is a project',
            'projectId': '123',
            'client': 'xyz'
          },
          {
            'name': 'It is a project',
            'projectId': '123',
            'client': 'xyz'
          }
        ],
        count: 2
      }

      $http = jasmine.createSpyObj('http', ['get'])
      $http.get.and.returnValue(Promise.resolve({data: mockProjects}))
      projectsService = new ProjectsService($http, 'apiroot')

      getList = projectsService.getList()
    })

    it('provides a getList method', () => {
      expect(projectsService.getList).toBeDefined()
    })

    it('returns a promise', () => {
      expect(getList.then).toBeDefined()
      expect(getList.catch).toBeDefined()
    })

    it('calls the $http get service', (done) => {
      getList
      .then(function (response) {
        expect($http.get).toHaveBeenCalled()
        expect($http.get).toHaveBeenCalledWith('apiroot/projects')
        done()
      })
    })

    it('returns an array of projects', (done) => {
      getList
      .then(function (projects) {
        expect(Array.isArray(projects)).toBeTruthy()
        expect(projects[0].constructor.name).toBe('Project')
        done()
      })
    })

    it('returns null when there is an error', (done) => {
      $http.get.and.returnValue(Promise.reject(new Error('User is not authorized to access this resource')))
      projectsService = new ProjectsService($http, 'apiroot')

      projectsService.getList()
      .then((project) => {
        expect(project).toBe(null)
        done()
      })
      .catch((err) => {
        fail(err)
        done()
      })
    })
  })
})
