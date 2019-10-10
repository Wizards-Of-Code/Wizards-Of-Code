import React from "react";

// might be worth refactoring to using state to tell if the user is logged in or not. Feels like you're doing more work to use the context api for this
const AuthUserContext = React.createContext(null);

export default AuthUserContext;
