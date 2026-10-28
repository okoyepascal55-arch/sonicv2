// Fallback images (shown only while the dashboard slots are empty) — moved unchanged
// from the previous showcase / carousel components (28.10.2026).
export type ChapterId = 'konzeption' | 'innovation' | 'ci' | 'layout' | 'pos';

export const FALLBACKS: Record<ChapterId, string[]> = {
  konzeption: [
    'https://readdy.ai/api/search-image?query=professional%20brand%20campaign%20strategy%20creative%20agency%20whiteboard%20meeting%20concept%20development%20modern%20office%20team%20brainstorming%20premium%20commercial%20photography%20dramatic%20contrast&width=800&height=600&seq=k1-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20architecture%20positioning%20strategy%20design%20agency%20portfolio%20concept%20board%20professional%20flat%20lay%20premium%20modern%20workspace&width=400&height=300&seq=k2-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=multichannel%20campaign%20concept%20creative%20agency%20design%20boards%20assets%20layout%20professional%20editorial%20style&width=400&height=300&seq=k3-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=retail%20communication%20strategy%20brand%20point%20of%20sale%20premium%20campaign%20planning%20presentation%20board&width=600&height=300&seq=k4-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=content%20strategy%20editorial%20planning%20creative%20calendar%20digital%20marketing%20agency%20professional%20workspace&width=1200&height=350&seq=k5-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=content%20production%20shooting%20presenter%20unboxing%20video%20product%20how%20to%20studio%20camera%20crew%20professional%20bright%20modern&width=1200&height=350&seq=k6-a&orientation=landscape',
  ],
  innovation: [
    'https://readdy.ai/api/search-image?query=AI%20artificial%20intelligence%20creative%20concept%20development%20futuristic%20design%20agency%20digital%20generative%20design%20modern%20technology%20lime%20green%20accent%20dark%20atmosphere&width=800&height=600&seq=i1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=live%20stream%20product%20presentation%20studio%20presenter%20camera%20ring%20light%20consumer%20electronics%20modern%20professional%20broadcast%20setup&width=400&height=300&seq=i2-live&orientation=landscape',
    'https://readdy.ai/api/search-image?query=interactive%20brand%20experience%20digital%20installation%20retail%20environment%20touchscreen%20modern%20innovative%20consumer%20technology&width=400&height=300&seq=i3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20bright%20studio%20lighting%20commercial%20quality%20clean%20background&width=600&height=300&seq=i4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=new%20communication%20format%20digital%20brand%20storytelling%20creative%20agency%20innovative%20modern%20design%20concept%20future%20forward&width=1200&height=350&seq=i5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20smartphone%20vertical%20video%20product%20presenter%20modern%20studio%20bright%20professional&width=1200&height=350&seq=i6-a&orientation=landscape',
  ],
  ci: [
    'https://readdy.ai/api/search-image?query=corporate%20identity%20design%20brand%20system%20complete%20visual%20identity%20manual%20professional%20creative%20agency%20premium%20branding%20portfolio%20flat%20lay&width=800&height=600&seq=ci1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=logo%20design%20brand%20mark%20identity%20creative%20agency%20minimalist%20modern%20professional%20clean%20white%20background%20premium%20branding&width=400&height=300&seq=ci2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=typography%20color%20system%20brand%20guidelines%20design%20agency%20visual%20identity%20premium%20editorial%20layout%20professional%20modern&width=400&height=300&seq=ci3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=corporate%20design%20manual%20brand%20book%20guidelines%20flat%20lay%20premium%20creative%20agency%20print%20professional%20elegant&width=600&height=300&seq=ci4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20rollout%20touchpoints%20corporate%20identity%20application%20stationery%20signage%20business%20cards%20premium%20professional%20editorial%20flat%20lay&width=1200&height=350&seq=ci5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20templates%20briefing%20documents%20artwork%20print%20ready%20files%20design%20agency%20desk%20flat%20lay%20professional%20clean&width=1200&height=350&seq=ci6-a&orientation=landscape',
  ],
  layout: [
    'https://readdy.ai/api/search-image?query=print%20design%20layout%20brochure%20editorial%20professional%20creative%20agency%20premium%20typography%20flat%20lay%20clean%20modern%20design&width=800&height=600&seq=l1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=packaging%20design%20consumer%20product%20retail%20shelf%20premium%20brand%20identity%20clean%20studio%20photography%20commercial%20quality%20editorial&width=400&height=300&seq=l2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=catalogue%20design%20print%20editorial%20layout%20premium%20brand%20creative%20agency%20professional%20modern%20clean%20typography%20commercial%20quality&width=400&height=300&seq=l3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=digital%20screen%20design%20UI%20layout%20app%20interface%20brand%20identity%20modern%20clean%20professional%20creative%20agency%20digital%20design%20system&width=600&height=300&seq=l4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=POS%20communication%20retail%20point%20of%20sale%20print%20promotional%20material%20brand%20identity%20store%20signage%20premium%20commercial%20design&width=1200&height=350&seq=l5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=promotion%20material%20training%20brochures%20sales%20staff%20handouts%20retail%20brand%20print%20flat%20lay%20professional%20clean&width=1200&height=350&seq=l6-a&orientation=landscape',
  ],
  pos: [
    'https://readdy.ai/api/search-image?query=retail%20display%20POS%20stand%20brand%20activation%20consumer%20electronics%20premium%20store%20environment%20professional%20commercial%20photography%20modern%20clean&width=800&height=600&seq=p1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=shop%20fitting%20retail%20interior%20design%20premium%20brand%20experience%20modern%20store%20environment%20commercial%20photography%20professional&width=400&height=300&seq=p2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=trade%20show%20exhibition%20booth%20stand%20premium%20brand%20activation%20professional%20event%20marketing%20modern%20commercial%20photography%20IFA%20Berlin&width=400&height=300&seq=p3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=shop%20in%20shop%20retail%20concept%20brand%20world%20consumer%20electronics%20premium%20store%20environment%20professional%20commercial%20modern&width=600&height=300&seq=p4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=nationwide%20POS%20rollout%20retail%20display%20brand%20consistency%20consumer%20electronics%20stores%20professional%20commercial%20photography%20wide%20angle&width=1200&height=350&seq=p5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=promotion%20counter%20retail%20store%20brand%20ambassador%20demo%20stand%20consumer%20electronics%20professional%20commercial%20photography%20modern&width=1200&height=350&seq=p6-a&orientation=landscape',
  ],
};

export const BEFORE_AFTER_FALLBACK = [
  'https://readdy.ai/api/search-image?query=brand%20trade%20show%20booth%20IFA%20Berlin%20real%20built%20exhibition%20stand%20professional%20retail%20display%20modern%20premium%20consumer%20electronics%20physical%20stand%20interior%20wide%20angle%20shot%20dramatic%20event%20photography&width=1200&height=680&seq=ba-reality&orientation=landscape',
  'https://readdy.ai/api/search-image?query=trade%20show%20booth%20photorealistic%20CGI%203D%20render%20architectural%20visualization%20exhibition%20stand%20design%20lime%20green%20accent%20lighting%20futuristic%20dark%20atmosphere%20high%20quality%20render%20IFA%20Berlin%20concept&width=1200&height=680&seq=ba-cgi&orientation=landscape',
];

export const CAROUSEL_FALLBACKS = [
  'https://readdy.ai/api/search-image?query=professional%20product%20photography%20studio%20shoot%20consumer%20electronics%20packaging%20premium%20bright%20clean%20white%20background%20soft%20natural%20lighting%20commercial%20quality%20editorial%20photography%20minimalist%20modern&width=420&height=600&seq=c4-tile-01&orientation=portrait',
  'https://readdy.ai/api/search-image?query=brand%20identity%20design%20creative%20agency%20visual%20design%20system%20typography%20color%20palette%20minimalist%20flat%20lay%20professional%20elegant%20premium%20studio%20photography%20clean%20white%20background%20modern%20editorial&width=420&height=600&seq=c4-tile-02&orientation=portrait',
  'https://readdy.ai/api/search-image?query=video%20production%20studio%20professional%20camera%20crew%20filming%20product%20commercial%20creative%20agency%20bright%20clean%20cinematic%20lighting%20behind%20the%20scenes%20premium%20quality%20modern%20white%20studio&width=420&height=600&seq=c4-tile-03&orientation=portrait',
  'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20bright%20studio%20lighting%20commercial%20quality%20clean%20white%20background%20premium%20editorial%20modern&width=420&height=600&seq=c4-tile-04&orientation=portrait',
  'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20lifestyle%20photography%20product%20shoot%20vibrant%20editorial%20fashion%20beauty%20consumer%20goods%20clean%20professional%20studio%20bright%20white%20background%20modern%20commercial&width=420&height=600&seq=c4-tile-05&orientation=portrait',
  'https://readdy.ai/api/search-image?query=trade%20show%20exhibition%20booth%20design%20retail%20POS%20display%20premium%20brand%20activation%20event%20marketing%20professional%20bright%20clean%20lighting%20commercial%20quality%20modern%20white%20background&width=420&height=600&seq=c4-tile-06&orientation=portrait',
  'https://readdy.ai/api/search-image?query=packaging%20design%20print%20production%20premium%20consumer%20goods%20unboxing%20experience%20bright%20clean%20studio%20photography%20commercial%20quality%20editorial%20minimalist%20white%20background%20modern&width=420&height=600&seq=c4-tile-07&orientation=portrait',
  'https://readdy.ai/api/search-image?query=luxury%20cosmetics%20beauty%20product%20photography%20bright%20clean%20studio%20soft%20lighting%20premium%20brand%20editorial%20commercial%20quality%20minimalist%20white%20background%20modern%20elegant&width=420&height=600&seq=c4-tile-08&orientation=portrait',
  'https://readdy.ai/api/search-image?query=food%20photography%20gourmet%20restaurant%20dish%20professional%20studio%20bright%20clean%20lighting%20editorial%20commercial%20quality%20premium%20minimalist%20white%20background%20modern%20lifestyle&width=420&height=600&seq=c4-tile-09&orientation=portrait',
];
