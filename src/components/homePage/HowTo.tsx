import { useEffect, useState } from 'react';

export default function HowTo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const target = document.getElementById('howto-section');
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="howto-section"
      className={`py-10 bg-[#0D1234] sm:py-16 lg:py-24 ${
        isVisible ? 'animate-fade-in' : ''
      } w-full`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tightsm:text-4xl lg:text-5xl bg-btn-gradient text-transparent bg-clip-text">
            How does it work?
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Getting anonymous feedback is simple. Just follow these easy steps to start receiving valuable insights.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-4 gap-x-12">
            {/* Step 1 */}
            <div className={`animate-fade-in ${isVisible ? 'delay-100' : ''}`}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">1</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">Create an Account</h3>
              <p className="mt-4 text-base text-gray-300">
                Sign up for free and securely create your account to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`animate-fade-in ${isVisible ? 'delay-200' : ''}`}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">2</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">Verify Your Email</h3>
              <p className="mt-4 text-base text-gray-300">
                Verify your email address to activate your account and access your dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`animate-fade-in ${isVisible ? 'delay-300' : ''}`}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">3</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">Copy Your Unique Link</h3>
              <p className="mt-4 text-base text-gray-300">
                On the dashboard, you’ll find your unique link. Copy it and share it with those whose feedback you want.
              </p>
            </div>

            {/* Step 4 */}
            <div className={`animate-fade-in ${isVisible ? 'delay-400' : ''}`}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">4</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-white md:mt-10">Receive Anonymous Messages</h3>
              <p className="mt-4 text-base text-gray-300">
                People can use your link to send feedback, suggestions, or messages anonymously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
