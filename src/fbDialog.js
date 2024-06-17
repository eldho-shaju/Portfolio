"use client";
import { useEffect } from "react";

const FacebookLogin = () => {
  useEffect(() => {
    initializeFacebook();
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      function (response) {
        if (response.status === "connected") {
          // Get and display user information
          window.FB.api("/me", function (response) {
            console.log("Good to see you, " + response.name + ".", response);
          });
        } else {
          console.log("user is not logged in");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div>
      <button onClick={handleFBLogin}>Login with Facebook</button>
    </div>
  );
};
export default FacebookLogin;

const initializeFacebook = () => {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "719059563429257", // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v20.0", // Use the latest version
      });

      resolve();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
};
