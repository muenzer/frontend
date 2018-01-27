'use strict'

module.exports = function NewTaskDialogController ($mdDialog, api) {
  var vm = this

  vm.schema = {
    'type': 'object',
    'title': 'New Task',
    'properties': {
      'name': {
        'title': 'Name',
        'type': 'string'
      },
      'limit': {
        'title': 'Working Limit (minutes)',
        'type': 'integer'
      },
      'shortDescription': {
        'title': 'Description',
        'type': 'string'
      },
      'background': {
        'title': 'Background',
        'type': 'string'
      },
      'actions': {
        'type': 'array',
        'title': 'Actions',
        'items': {
          'type': 'object',
          'properties': {
            'name': {
              'type': 'string'
            },
            'type': {
              'type': 'string',
              'enum': ['research', 'write']
            }
          }
        }
      },
      'files': {
        'type': 'array',
        'title': 'Files for Task',
        'items': {
          'type': 'object',
          'properties': {
            'file': {
              'type': 'string'
            }
          }
        }
      }
    },
    required: [
      'name'
    ]
  }

  vm.form = [
    'name',
    'limit',
    {
      'key': 'shortDescription',
      'type': 'textarea',
      'placeholder': 'Provide a short description'
    },
    {
      'key': 'background',
      'type': 'textarea',
      'placeholder': 'Provide a short description'
    },
    {
      'key': 'actions',
      'add': 'New',
      'items': [
        'actions[].name',
        'actions[].type'
      ]
    },
    {
      'key': 'files',
      'add': 'New',
      'items': [
        'files[].file'
      ]
    }
  ]

  vm.model = {
    limit: 120
  }

  vm.close = function () {
    $mdDialog.cancel()
  }
  vm.submit = function (task, project) {
    task.projectId = project.projectId
    task.project = project
    return api.tasks.create(task)
    .then((response) => {
      $mdDialog.hide(response)
    })
  }
}
