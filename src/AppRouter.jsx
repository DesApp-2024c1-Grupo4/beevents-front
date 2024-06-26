import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { RecoverPage } from "./pages/auth/RecoverPage";
import { MyAccountPage } from "./pages/MyAccountPage";
import { ReservationPage } from "./pages/ReservationPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event/:eventId" element={<EventPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/create_event" element={<CreateEventPage />} />
      <Route path="/create_event/:eventId" element={<CreateEventPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/recover" element={<RecoverPage />} />
      <Route path="/account" element={<MyAccountPage />} />
    </Routes>
  );
}
