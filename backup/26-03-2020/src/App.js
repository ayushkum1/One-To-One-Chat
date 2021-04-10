import "./App.css";
import LeftPanel from "./chatpage/search/LeftPanel";
import { Grid } from "@material-ui/core";
import Chat from "./chatpage/chatpanel/Chat";
import { rootReducer } from "./redux/reducers/userReducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Chattrial from "./chatpage/chatpanel/Chattrial";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Grid container>
          {/* <Grid item xs={3} md={3} lg={3} xl={3}>
            <LeftPanel />
          </Grid> */}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Chat />
          </Grid>
        </Grid>
      </div>
      {/* <Chattrial /> */}
    </Provider>
  );
}

export default App;
