import Vue from "nativescript-vue";
import Axios from "axios";
import Home from "./components/Home";
import {decode, encode} from 'base-64';

// Base 64
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

// Global scope for events
global.bus = new Vue({});

// Axios
global.axios = Axios.create({
    baseURL: 'http://51.91.8.97:18380/'
});

// User who's currently logged in
global.user = null;

// Checkboxes
Vue.registerElement(
    'CheckBox',
    () => require('@nstudio/nativescript-checkbox').CheckBox,
    {
        model: {
            prop: 'checked',
            event: 'checkedChange'
        }
    }
);

Vue.registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
