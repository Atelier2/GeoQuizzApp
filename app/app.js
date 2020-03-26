import Vue from "nativescript-vue";
import Axios from "axios";
import Home from "./components/Home";
import {decode, encode} from 'base-64';
import * as Camera from "nativescript-camera";
const bghttp = require("nativescript-background-http");
const session = bghttp.session("image-upload");

// Base 64
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

// Global scope for events
global.bus = new Vue({});

// Session for image upload
global.bghttpSession = session;

// ImgBB API key
global.apiKey = "0b0174ed0aded05168ca96a1ea5e9e84";

// Axios
global.axios = Axios.create({
    baseURL: 'http://51.91.8.97:18380/'
});

// Camera Module
global.camera = Camera;

// User who's currently logged in
global.user = null;

// Checkboxes
Vue.registerElement(
    'Checkbox',
    () => require('@nstudio/nativescript-checkbox')
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
