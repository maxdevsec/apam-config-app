import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Resources from "./resources/pages/Resources";
import Settings from "./settings/pages/Settings";

import "./App.css";
import Secrets from "./secrets/pages/Secrets";
import NewResource from "./resources/pages/NewResource";
import NewSetting from "./settings/pages/NewSetting";
import UpdateResource from "./resources/pages/UpdateResource";
import UpdateSetting from "./settings/pages/UpdateSetting";
import UpdateSecret from "./secrets/pages/UpdateSecret";
import SettingDetail from "./settings/pages/SettingDetail";
import NewSecret from "./secrets/pages/NewSecret";
import SecretDetail from "./secrets/pages/SecretDetail";
import NewSettingValue from "./settings/pages/NewSettingValue";
import NewSecretvalue from "./secrets/pages/NewSecretValue";
import ResourceConfiguration from "./resources/pages/ResourceConfiguration";
import Home from "./Home";
import AddSetting from "./resources/pages/AddSetting";
import AddSecret from "./resources/pages/AddSecret";
import AuthContext from "./store/AuthContext";
import EditSecretValue from "./secrets/pages/EditSecretValue";
import SettingResources from "./settings/pages/SettingResources";
import SecretResources from "./secrets/pages/SecretResources";

function App() {
  const isAuthenticated = useIsAuthenticated();
  let routes;

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/create" element={<NewResource />} />
        <Route path="/resources/:resourceId" element={<UpdateResource />} />
        <Route
          path="/resources/:resourceId/configuration"
          element={<ResourceConfiguration />}
        />
        <Route
          path="/resources/:resourceId/settings"
          element={<AddSetting />}
        />
        <Route path="/resources/:resourceId/secrets" element={<AddSecret />} />
        <Route path="/settings/create" element={<NewSetting />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/:settingId" element={<SettingDetail />} />
        <Route path="/settings/edit/:settingId" element={<UpdateSetting />} />
        <Route
          path="/settings/value/:settingId"
          element={<NewSettingValue />}
        />
        <Route path="/settings/:settingId/resources" element={<SettingResources />}/>
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/secrets/create" element={<NewSecret />} />
        <Route path="/secrets/:secretId" element={<SecretDetail />} />
        <Route path="/secrets/edit/:secretId" element={<UpdateSecret />} />
        <Route path="/secrets/value/:secretId" element={<NewSecretvalue />} />
        <Route path="/secrets/:secretId/value/:id" element={<EditSecretValue />} />
        <Route path="/secrets/:secretId/resources" element={<SecretResources />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated
    }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
