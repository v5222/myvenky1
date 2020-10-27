import React from "react";
import { UserAgentApplication } from "msal";
import { getUserDetails } from "./GraphService";
import { Testconfig } from "./config";

export default function withAuthProvider(WrappedComponent) {
  return class extends React.Component {
    // private userAgentApplication: UserAgentApplication;

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isAuthenticated: false,
        user: {},
      };

      // Initialize the MSAL application object
      this.userAgentApplication = new UserAgentApplication({
        auth: {
          clientId: Testconfig.appId,
          redirectUri: Testconfig.redirectUri,
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: true,
        },
      });
    }

    componentDidMount() {
      // If MSAL already has an account, the user
      // is already logged in
      // console.log("provider mounted");
      var account = this.userAgentApplication.getAccount();
      // console.log(account,"adfs ");
      if (account) {
        // Enhance user object with data from Graph
        this.getUserProfile();
        console.log(this.getUserProfile());
      }
    }

    render() {
      return (
        <WrappedComponent
          error={this.state.error}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
          login={() => this.login()}
          logout={() => this.logout()}
          getAccessToken={(scopes) => this.getAccessToken(scopes)}
          getUserProfile={() => this.getUserProfile()}
          setError={(message, debug) => this.setErrorMessage(message, debug)}
          {...this.props}
          {...this.state}
        />
      );
    }

    async login() {
      try {
        // Login via popup
        await this.userAgentApplication.loginPopup({
          scopes: Testconfig.scopes,
          prompt: "select_account",
        });
        // After login, get the user's profile
        await this.getUserProfile();
      } catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }

    logout() {
      this.userAgentApplication.logout();
    }

    async getAccessToken(scopes) {
      try {
        // Get the access token silently
        // If the cache contains a non-expired token, this function
        // will just return the cached token. Otherwise, it will
        // make a request to the Azure OAuth endpoint to get a token
        var silentResult = await this.userAgentApplication.acquireTokenSilent({
          scopes: scopes,
        });

        return silentResult.accessToken;
      } catch (err) {
        // If a silent request fails, it may be because the user needs
        // to login or grant consent to one or more of the requested scopes
        if (this.isInteractionRequired(err)) {
          var interactiveResult = await this.userAgentApplication.acquireTokenPopup(
            {
              scopes: scopes,
            }
          );

          return interactiveResult.accessToken;
        } else {
          throw err;
        }
      }
    }

    async getUserProfile() {
      try {
        var accessToken = await this.getAccessToken(Testconfig.scopes);

        if (accessToken) {
          // TEMPORARY: Display the token in the error flash
          var user = await getUserDetails(accessToken);
          this.setState({
            isAuthenticated: true,
            user: {
              displayName: user.displayName,
              email: user.mail || user.userPrincipalName,
            },
            error: null,
          });
        }
      } catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }

    setErrorMessage(message, debug) {
      this.setState({
        error: { message: message, debug: debug },
      });
    }

    normalizeError(error) {
      var normalizedError = {};
      if (typeof error === "string") {
        var errParts = error.split("|");
        normalizedError =
          errParts.length > 1
            ? { message: errParts[1], debug: errParts[0] }
            : { message: error };
      } else {
        normalizedError = {
          message: error.message,
          debug: JSON.stringify(error),
        };
      }
      return normalizedError;
    }

    isInteractionRequired(error) {
      if (!error.message || error.message.length <= 0) {
        return false;
      }

      return (
        error.message.indexOf("consent_required") > -1 ||
        error.message.indexOf("interaction_required") > -1 ||
        error.message.indexOf("login_required") > -1
      );
    }
  };
}
