import RatgeberPage from '../components/RatgeberPage';
import liveShopping from '../data/live-shopping';

export default function LiveShoppingPage() {
  return <RatgeberPage content={liveShopping} sectionKey="ratgeber_live_shopping" />;
}