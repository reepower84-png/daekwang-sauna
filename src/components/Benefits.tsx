'use client';

const benefits = [
  {
    number: '01',
    title: '체온 상승',
    description: '체온이 1도 오르면 면역력은 5배 상승! 꾸준한 사용으로 기초 체온을 높여보세요.',
    color: 'from-orange-400 to-red-500',
  },
  {
    number: '02',
    title: '디톡스 효과',
    description: '땀과 함께 노폐물 배출. 피부 깊숙이 쌓인 독소까지 시원하게 배출합니다.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    number: '03',
    title: '피로 회복',
    description: '원적외선의 따뜻함이 근육의 긴장을 풀어주고 하루의 피로를 해소해줍니다.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    number: '04',
    title: '혈액순환 개선',
    description: '체온 상승으로 혈관이 확장되어 혈액순환이 원활해지고 몸이 가벼워집니다.',
    color: 'from-purple-400 to-pink-500',
  },
];

export default function Benefits() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="benefits" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-4">
            사용 효과
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            집에서도 가능한<br />
            <span className="text-primary-500">프라이빗 사우나</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            매일 30분, 건강한 습관을 시작하세요
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 md:p-10 group hover:scale-[1.02] transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${benefit.color.includes('orange') ? '#fb923c' : benefit.color.includes('emerald') ? '#34d399' : benefit.color.includes('blue') ? '#60a5fa' : '#a78bfa'} 0%, ${benefit.color.includes('orange') ? '#ef4444' : benefit.color.includes('emerald') ? '#14b8a6' : benefit.color.includes('blue') ? '#6366f1' : '#ec4899'} 100%)`
              }}
            >
              <div className="relative z-10">
                <span className="text-white/30 text-6xl md:text-8xl font-bold absolute -top-2 -left-2">
                  {benefit.number}
                </span>
                <div className="pt-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">98%</div>
            <div className="text-gray-600">고객 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">10만+</div>
            <div className="text-gray-600">판매 대수</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">1년</div>
            <div className="text-gray-600">무상 A/S</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">30분</div>
            <div className="text-gray-600">권장 사용시간</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all hover:shadow-lg gap-2"
          >
            지금 바로 상담받기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
