import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

// Lazy load pages
const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const CareersPage = lazy(() => import('../pages/careers/page'));
const CaseStudiesPage = lazy(() => import('../pages/case-studies/page'));
const IndustriesPage = lazy(() => import('../pages/industries/page'));
const SRTPage = lazy(() => import('../pages/srt/page'));
const TeamPage = lazy(() => import('../pages/team/page'));
const LosungenPage = lazy(() => import('../pages/losungen/page'));
const SonicReelsPage = lazy(() => import('../pages/sonic-reels/page'));
const BlogPage = lazy(() => import('../pages/blog/page'));
const BlogDetailPage = lazy(() => import('../pages/blog/detail/page'));
const LeistungenPage = lazy(() => import('../pages/leistungen/page'));
const ForecastingPage = lazy(() => import('../pages/leistungen/forecasting/page'));
const TalentpoolPage = lazy(() => import('../pages/leistungen/talentpool/page'));
const StaffAsAServicePage = lazy(() => import('../pages/leistungen/staff-as-a-service/page'));
const VideoPage = lazy(() => import('../pages/leistungen/video/page'));
const POSFullServicePage = lazy(() => import('../pages/leistungen/pos-full-service/page'));
const EventsMessenPage = lazy(() => import('../pages/leistungen/events-messen/page'));
const KreationContentPage = lazy(() => import('../pages/leistungen/kreation-content/page'));
const WarehouseLogistikPage = lazy(() => import('../pages/leistungen/warehouse-logistik/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const JobsPage = lazy(() => import('../pages/jobs/page'));
const JobDetailPage = lazy(() => import('../pages/jobs/[hash]/page'));
const KontaktPage = lazy(() => import('../pages/kontakt/page'));
const ErlebnismarketingPage = lazy(() => import('../pages/ratgeber/erlebnismarketing/page'));
const VerkaufsfoerderungPOSPage = lazy(() => import('../pages/ratgeber/verkaufsfoerderung-pos/page'));
const MesseEventmarketingPage = lazy(() => import('../pages/ratgeber/messe-eventmarketing/page'));
const FieldMarketingSamplingPage = lazy(() => import('../pages/ratgeber/field-marketing-sampling/page'));
const RetailMerchandisingPage = lazy(() => import('../pages/ratgeber/retail-merchandising/page'));
const MysteryShoppingPage = lazy(() => import('../pages/ratgeber/mystery-shopping/page'));
const PromotionspersonalPage = lazy(() => import('../pages/ratgeber/promotionspersonal/page'));
const MarkenaktivierungPage = lazy(() => import('../pages/ratgeber/markenaktivierung/page'));
const LiveShoppingPage = lazy(() => import('../pages/ratgeber/live-shopping/page'));
const GuerillaMarketingPage = lazy(() => import('../pages/ratgeber/guerilla-marketing/page'));
const NachhaltigkeitsmarketingPage = lazy(() => import('../pages/ratgeber/nachhaltigkeitsmarketing/page'));
const TiktokShopLivePage = lazy(() => import('../pages/ratgeber/tiktok-shop-live/page'));
const MarkteintrittDachPage = lazy(() => import('../pages/ratgeber/markteintritt-dach/page'));
const LiveVideoPromotionRatgeberPage = lazy(() => import('../pages/ratgeber/live-video-promotion/page'));
const RoadshowsAktionenPage = lazy(() => import('../pages/ratgeber/roadshows-aktionen/page'));
const SocialCommercePage = lazy(() => import('../pages/ratgeber/social-commerce/page'));
const VerkaeuferschulungenPage = lazy(() => import('../pages/ratgeber/verkaeuferschulungen/page'));
const ShopperMarketingPage = lazy(() => import('../pages/ratgeber/shopper-marketing/page'));
const TradeMarketingPage = lazy(() => import('../pages/ratgeber/trade-marketing/page'));
const InfluencerMarketingPage = lazy(() => import('../pages/ratgeber/influencer-marketing/page'));
const PopUpStoresPage = lazy(() => import('../pages/ratgeber/pop-up-stores/page'));
const InstoreMediaPage = lazy(() => import('../pages/ratgeber/instore-media/page'));
const ProduktLaunchPage = lazy(() => import('../pages/ratgeber/produkt-launch/page'));
const CustomerExperiencePage = lazy(() => import('../pages/ratgeber/customer-experience/page'));
const CommunityManagementPage = lazy(() => import('../pages/ratgeber/community-management/page'));
const KulturEventsPage = lazy(() => import('../pages/ratgeber/kultur-events/page'));
const SegmentierteAnsprachePage = lazy(() => import('../pages/ratgeber/segmentierte-ansprache/page'));
const RatgeberHubPage = lazy(() => import('../pages/ratgeber/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/media-dashboard',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/about',
    element: <Navigate to="/ueber-uns" replace />,
  },
  {
    path: '/careers',
    element: <Navigate to="/karriere" replace />,
  },
  {
    path: '/case-studies',
    element: <Navigate to="/fallbeispiele" replace />,
  },
  {
    path: '/case-studies/:slug',
    element: <Navigate to="/fallbeispiele" replace />,
  },
  {
    path: '/ueber-uns',
    element: <AboutPage />,
  },
  {
    path: '/karriere',
    element: <CareersPage />,
  },
  {
    path: '/fallbeispiele',
    element: <CaseStudiesPage />,
  },
  {
    path: '/industries',
    element: <IndustriesPage />,
  },
  {
    path: '/leistungen/live-video',
    element: <VideoPage />,
  },
  {
    path: '/srt',
    element: <SRTPage />,
  },
  {
    path: '/team',
    element: <TeamPage />,
  },
  {
    path: '/losungen',
    element: <LosungenPage />,
  },
  {
    path: '/sonic-reels',
    element: <SonicReelsPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog/:id',
    element: <BlogDetailPage />,
  },
  {
    path: '/leistungen',
    element: <LeistungenPage />,
  },
  {
    path: '/leistungen/forecasting',
    element: <ForecastingPage />,
  },
  {
    path: '/leistungen/talentpool',
    element: <TalentpoolPage />,
  },
  {
    path: '/leistungen/staff-as-a-service',
    element: <StaffAsAServicePage />,
  },
  {
    path: '/leistungen/pos-full-service',
    element: <POSFullServicePage />,
  },
  {
    path: '/leistungen/events-messen',
    element: <EventsMessenPage />,
  },
  {
    path: '/leistungen/kreation-content',
    element: <KreationContentPage />,
  },
  {
    path: '/leistungen/warehouse-logistik',
    element: <WarehouseLogistikPage />,
  },
  {
    path: '/jobs',
    element: <JobsPage />,
  },
  {
    path: '/jobs/:hash',
    element: <JobDetailPage />,
  },
  {
    path: '/kontakt',
    element: <KontaktPage />,
  },
  {
    path: '/ratgeber/erlebnismarketing',
    element: <ErlebnismarketingPage />,
  },
  {
    path: '/ratgeber/verkaufsfoerderung-pos',
    element: <VerkaufsfoerderungPOSPage />,
  },
  {
    path: '/ratgeber/messe-eventmarketing',
    element: <MesseEventmarketingPage />,
  },
  {
    path: '/ratgeber/field-marketing-sampling',
    element: <FieldMarketingSamplingPage />,
  },
  {
    path: '/ratgeber/retail-merchandising',
    element: <RetailMerchandisingPage />,
  },
  {
    path: '/ratgeber/mystery-shopping',
    element: <MysteryShoppingPage />,
  },
  {
    path: '/ratgeber/promotionspersonal',
    element: <PromotionspersonalPage />,
  },
  {
    path: '/ratgeber/markenaktivierung',
    element: <MarkenaktivierungPage />,
  },
  {
    path: '/ratgeber/live-shopping',
    element: <LiveShoppingPage />,
  },
  {
    path: '/ratgeber/guerilla-marketing',
    element: <GuerillaMarketingPage />,
  },
  {
    path: '/ratgeber/nachhaltigkeitsmarketing',
    element: <NachhaltigkeitsmarketingPage />,
  },
  {
    path: '/ratgeber/tiktok-shop-live',
    element: <TiktokShopLivePage />,
  },
  {
    path: '/ratgeber/markteintritt-dach',
    element: <MarkteintrittDachPage />,
  },
  {
    path: '/ratgeber/live-video-promotion',
    element: <LiveVideoPromotionRatgeberPage />,
  },
  {
    path: '/ratgeber/roadshows-aktionen',
    element: <RoadshowsAktionenPage />,
  },
  {
    path: '/ratgeber/social-commerce',
    element: <SocialCommercePage />,
  },
  {
    path: '/ratgeber/verkaeuferschulungen',
    element: <VerkaeuferschulungenPage />,
  },
  {
    path: '/ratgeber/shopper-marketing',
    element: <ShopperMarketingPage />,
  },
  {
    path: '/ratgeber/trade-marketing',
    element: <TradeMarketingPage />,
  },
  {
    path: '/ratgeber/influencer-marketing',
    element: <InfluencerMarketingPage />,
  },
  {
    path: '/ratgeber/pop-up-stores',
    element: <PopUpStoresPage />,
  },
  {
    path: '/ratgeber/instore-media',
    element: <InstoreMediaPage />,
  },
  {
    path: '/ratgeber/produkt-launch',
    element: <ProduktLaunchPage />,
  },
  {
    path: '/ratgeber/customer-experience',
    element: <CustomerExperiencePage />,
  },
  {
    path: '/ratgeber/community-management',
    element: <CommunityManagementPage />,
  },
  {
    path: '/ratgeber/kultur-events',
    element: <KulturEventsPage />,
  },
  {
    path: '/ratgeber/segmentierte-ansprache',
    element: <SegmentierteAnsprachePage />,
  },
  {
    path: '/ratgeber',
    element: <RatgeberHubPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;