# Angular redux bindings
### Bind redux state to your AngularJs controller
Minimal module to bind your Redux state to your Angular controller, see usage below. This module is in a very early stage of development and may change drastic.

### Install
`$ npm install --save angular-redux-bindings`

### Usage
```javascript
import angular from 'angular';
import logger from 'redux-logger';
import 'angular-redux-bindings';

const firstReducer = (state = { api: 'https://google.com' }, action) => {
    switch (action.type) {
        case 'TESTY':
            return {
                ...state,
                api: 'http://my-api-dir.se'
            }
        default:
            return state;
    }
};

angular.module('app', ['angularReduxBindings'])
    .config(['$angularReduxProvider', function ($angularReduxProvider) {
        $angularReduxProvider.createStore({
            firstReducer
        }, [logger]);
    }])

    .controller('PageController', ['$scope', '$angularRedux', function ($scope, $angularRedux) {
        const unsubscribe = $angularRedux.bindState(state => {
            return {
                api: state.firstReducer.api
            };
        }, this);

        $scope.handleClick = () => {
            $angularRedux.dispatch({ type: 'TESTY' });
        };

        $scope.$on('$destroy', unsubscribe);
    }]);
```
### Author
Patrik Höggren, p [at] hoggren.nu