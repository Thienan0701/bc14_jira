import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import DrawerCommon from "./components/DrawerCommon/DrawerCommon";
import PageNotFound from "./templates/PageNotFound/PageNotFound";
import { renderRouteHome, renderRouteUser } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {renderRouteHome()}
        {renderRouteUser()}
        <Route path="*" component={PageNotFound} />
      </Switch>

      <DrawerCommon />
    </BrowserRouter>
  );
}

export default App;
