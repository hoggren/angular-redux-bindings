# Angular redux bindings
### Bind redux state to your AngularJs controller
Minimal module to bind your Redux state to your Angular controller, see usage below. This module is in a very early stage of development and may change drastic.

### Usage
```javascript
import angularReduxBindings from 'angular-redux-bindings';

angular.module('app', [angularReduxBindings])
    .config(['$angularReduxProvider', function ($angularReduxProvider) {
        $angularReduxProvider.createStore({
            firstReducer,
            secondReducer
        }, [myOwnMiddleware, logger, thunk]);
    }])

    .controller('PageController', [, '$angularRedux', function ($angularRedux) {
        const unsubscribe = $angularRedux.bindState(state => {
            return {
                api: state.globals.api
            };
        }, this);

        // this is from the Redux state!
        console.log(this.api);

        $scope.$on('$destroy', unsubscribe);
    };
}]);
```
### Author
Patrik Höggren, p [at] hoggren.nu