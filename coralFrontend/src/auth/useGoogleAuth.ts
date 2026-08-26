import { useEffect, useRef, useState } from "react";

export interface GoogleUser {
  readonly name: string;
  readonly email: string;
  readonly picture?: string;
}

interface GoogleJwtPayload {
  readonly name?: string;
  readonly email?: string;
  readonly picture?: string;
}

interface GoogleCredentialResponse {
  readonly credential: string;
}

interface GoogleAccountId {
  initialize: (options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "large" | "medium" | "small";
      shape?: "rectangular" | "pill" | "circle" | "square";
      text?: "signin_with" | "signup_with" | "continue_with" | "signin";
      logo_alignment?: "left" | "center";
      width?: string;
    },
  ) => void;
  disableAutoSelect: () => void;
  revoke: (hint: string, callback: () => void) => void;
}

interface GoogleIdentityApi {
  readonly accounts: {
    readonly id: GoogleAccountId;
  };
}

declare global {
  interface Window {
    google?: GoogleIdentityApi;
  }
}

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ??
  "11155701499-sem40hbrr7u06tq0qs98a6c4nn9rj1o1.apps.googleusercontent.com";

function decodeGoogleJwtPayload(token: string): GoogleJwtPayload | null {
  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    const normalized = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((character) => `%${(`00${character.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload) as GoogleJwtPayload;
  } catch {
    return null;
  }
}

export function useGoogleAuth() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const hasInitializedGoogle = useRef(false);

  useEffect(() => {
    function renderGoogleButton() {
      if (user || !window.google?.accounts.id) return;

      const buttonContainer = document.getElementById("google-signin-button");
      if (!buttonContainer) return;

      buttonContainer.innerHTML = "";
      window.google.accounts.id.renderButton(buttonContainer, {
        type: "standard",
        theme: "outline",
        size: "medium",
        text: "signin_with",
        shape: "pill",
        logo_alignment: "left",
      });
    }

    function initializeGoogle() {
      if (!window.google?.accounts.id || hasInitializedGoogle.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => {
          const payload = decodeGoogleJwtPayload(credential);

          if (!payload?.email) return;

          setUser({
            name: payload.name ?? payload.email,
            email: payload.email,
            picture: payload.picture,
          });
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      hasInitializedGoogle.current = true;
    }

    function setupGoogleSignIn() {
      if (!window.google?.accounts.id) return;

      initializeGoogle();
      renderGoogleButton();
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (existingScript) {
      if (window.google) setupGoogleSignIn();
      else existingScript.addEventListener("load", setupGoogleSignIn, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", setupGoogleSignIn, { once: true });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", setupGoogleSignIn);
    };
  }, [user]);

  function signOut() {
    window.google?.accounts.id.disableAutoSelect();

    if (user?.email) {
      window.google?.accounts.id.revoke(user.email, () => {
        setUser(null);
      });
      return;
    }

    setUser(null);
  }

  return {
    user,
    signOut,
  };
}
