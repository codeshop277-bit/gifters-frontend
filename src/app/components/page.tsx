"use client";
import { useEffect } from "react";

export default function GoogleLoginButton() {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const tryRenderButton = () => {
      if (typeof window === "undefined" || !window.google) return;

      try {
        window.google.accounts.id.disableAutoSelect(); // reset suppression

        window.google.accounts.id.initialize({
          client_id: "739549704992-i4mt437cak6c5hgmmqv97l1hc847m1jc.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        const btnDiv = document.getElementById("googleButton");
        if (btnDiv && btnDiv.childNodes.length === 0) {
          window.google.accounts.id.renderButton(btnDiv, {
            theme: "outline",
            size: "large",
            text: "signin_with",
          });
        }

        clearInterval(interval);
      } catch (err) {
        console.log("Retrying GSI load...");
      }
    };

    interval = setInterval(tryRenderButton, 500);
    return () => clearInterval(interval);
  }, []);

  function handleCredentialResponse(response: any) {
    console.log("Google ID Token:", response.credential);
  }

  return <div id="googleButton" />;
}
