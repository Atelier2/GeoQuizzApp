import * as Camera from "nativescript-camera";
import * as Geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";

export const take = uploadHandler => {
    Camera.requestPermissions()
        .then(() => {
            Geolocation.enableLocationRequest()
                .then(() => {
                    Camera.takePicture({
                        width: 300,
                        height: 300,
                        keepAspectRatio: true,
                        saveToGallery: false
                    }).then(imageAsset => {
                        Geolocation.getCurrentLocation({
                            desiredAccuracy: Accuracy.high,
                            maximumAge: 5000,
                            timeout: 20000
                        }).then(location => {
                            let image = {
                                imageAsset: imageAsset,
                                location: {
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                }
                            };
                            uploadHandler(image);
                        }).catch(err => console.log("Couldn't get location"));
                    });
                }).catch(err => {
                    alert({
                        title: "Error",
                        message: "You must give permissions to take pictures.",
                        okButtonText: "OK"
                    });
            });
        }).catch(err => {
            alert({
                title: "Error",
                message: "You must give permissions to take pictures.",
                okButtonText: "OK"
            });
    });
};

export const uploadToImgBB = (image, successHandler, errorHandler) => {
    const bghttp = require("nativescript-background-http");
    const session = bghttp.session("image-upload");

    const apiKey = "0b0174ed0aded05168ca96a1ea5e9e84";

    let filePath = image.imageAsset._android !== undefined ? image.imageAsset._android : image.imageAsset._ios;
    let request = {
        url: `https://api.imgbb.com/1/upload?key=${apiKey}`,
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream"
        },
        description: "Uploading image"
    };
    let params = [
        { name: "image", filename: filePath, mimeType: "img/jpeg" }
    ];

    let upload = session.multipartUpload(params, request);

    upload.on("responded", event => {
        successHandler(image, JSON.parse(event.data).data.url);
    });

    upload.on("error", () => {
        errorHandler();
    });
};
