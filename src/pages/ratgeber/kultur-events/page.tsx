import RatgeberPage from '../components/RatgeberPage';
import kulturEvents from '../data/kultur-events';

export default function KulturEventsPage() {
  return <RatgeberPage content={kulturEvents} sectionKey="ratgeber_kultur_events" />;
}