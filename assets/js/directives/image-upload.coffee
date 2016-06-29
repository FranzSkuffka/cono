inputTypeFileDirective = ->
    {
    restrict: 'E'
    require: '?ngModel'
    scope:
      target: '='
    link: (scope, element, attrs, ngModel) ->

      updateModelWithFile = (event) ->

        cloudinary.upload(event.target.files[0], {})
          .then (response) ->
            scope.target = response.data.public_id + '.' + response.data.format
            Materialize.toast('Bild hochgeladen.', 1000, 'green')
          .catch (error) ->
            console.log(error);
            Materialize.toast(error.data.message)

        Materialize.toast('Bild lädt hoch...', 3000)

        # files = event.target.files
        # if !angular.isDefined(attrs.multiple)
        #   files = files[0]
        # else
        #   files = Array::slice.apply(files)
        # ngModel.$setViewValue files, event
        # return

      if attrs.type != 'file' or !angular.isDefined(ngModel)
        return
      element.on 'change', updateModelWithFile
      scope.$on '$destroy', ->
        element.off 'change', updateModelWithFile
        return
      if attrs.maxsize
        maxsize = parseInt(attrs.maxsize)

        ngModel.$validators.maxsize = (modelValue, viewValue) ->
          value = modelValue or viewValue
          if !angular.isArray(value)
            value = [ value ]
          i = value.length - 1
          while i >= 0
            if value[i] and value[i].size and value[i].size > maxsize
              return false
            i--
          true

      if attrs.accept
        accept = attrs.accept.split(',')

        ngModel.$validators.accept = (modelValue, viewValue) ->
          value = modelValue or viewValue
          if !angular.isArray(value)
            value = [ value ]
          i = value.length - 1
          while i >= 0
            if value[i] and accept.indexOf(value[i].type) == -1
              return false
            i--
          true

      return

  }

app.directive 'input', inputTypeFileDirective
