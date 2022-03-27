import { Route, Routes } from "react-router-dom";
import App from "./App";

function RoutesOutlet() {
  <Routes>
    <Route path="/" element={<App />}>
      {/* <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route> */}
    </Route>
    {/* <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} /> */}
  </Routes>;
}

export default RoutesOutlet;
