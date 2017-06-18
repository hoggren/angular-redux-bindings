import {createStore, applyMiddleware, combineReducers} from 'redux';

export default angular.module('angularReduxBindings', [])
    .provider('$angularRedux', [function () { // no arrow-style to get *this*
        this.reducers = {};
        this.middlewares = [];
        this.storeEnhancers = [];

        this.store;

        this.$get = () => {
            return {
                getState: () => this.store.getState(),
                dispatch: (action) => this.store.dispatch(action),
                bindState: (bindFn, target) => {
                    //initialize binding
                    Object.assign(target, bindFn(this.store.getState()));

                    const unsubscribe = this.store.subscribe(() => {
                        const state = this.store.getState();

                        Object.assign(target, bindFn(state));
                    });

                    return unsubscribe;
                },
            };
        };
        this.createStore = (reducers, middlewares) => {
            this.reducers = reducers;
            this.middlewares = middlewares;

            this.store = createStore(combineReducers(reducers), applyMiddleware(...middlewares));
        };
    }]).name;