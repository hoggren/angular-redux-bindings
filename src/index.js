import { module } from 'angular';
import { createStore, combineReducers, applyMiddleware } from 'redux';

export default module('angular-redux-bindings', [])
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
    }])
    .name;