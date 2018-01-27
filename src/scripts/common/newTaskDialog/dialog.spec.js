/* eslint-env jasmine */

describe('dialog box', () => {
  var $mdDialog

  it('opens a dialog box', () => {
    $mdDialog = jasmine.createSpyObj('$mdDialog', ['show', 'hide'])

    var Dialog = require('./dialog')

    var dialog = new Dialog($mdDialog)

    dialog.open()

    expect($mdDialog.show).toHaveBeenCalled()
  })

  describe('dialog box ctrl', () => {
    var DialogCtrl = require('./dialogCtrl')
    var dialogCtrl
    var apiService
    var $mdDialog

    var task = {
      name: 'a task'
    }

    var project = {
      projectId: 'aaa',
      name: 'a project'
    }

    var submit

    it('returns a function', () => {
      expect(typeof DialogCtrl).toBe('function')
    })

    beforeEach(() => {
      $mdDialog = jasmine.createSpyObj('$mdDialog', ['show', 'hide', 'cancel'])

      apiService = {
        tasks: {
          create: jasmine.createSpy()
        }
      }

      apiService.tasks.create.and.returnValue(Promise.resolve('xxx'))

      dialogCtrl = new DialogCtrl($mdDialog, apiService)

      submit = dialogCtrl.submit(task, project)
    })

    it('has a submit method', () => {
      expect(dialogCtrl.submit).toBeDefined()
    })

    describe('submit method', () => {
      it('has a submit method', () => {
        expect(dialogCtrl.submit).toBeDefined()
      })

      it('returns a promise', () => {
        expect(submit.then).toBeDefined()
      })

      it('calls api tasks.create', (done) => {
        submit
        .then(() => {
          expect(apiService.tasks.create).toHaveBeenCalled()
          var arg = apiService.tasks.create.calls.argsFor(0)[0]
          expect(arg).toBeDefined()
          expect(arg.name).toBe('a task')
          expect(arg.projectId).toBe('aaa')
          expect(arg.project).toBeDefined()
          done()
        })
      })

      it('calls the $mdDialog hide method', (done) => {
        submit
        .then(() => {
          expect($mdDialog.hide).toHaveBeenCalled()
          expect($mdDialog.hide).toHaveBeenCalledWith('xxx')
          done()
        })
      })
    })
  })
})
