export default function CTASection() {
  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 min-h-[450px]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1712512161479-3d78afd4d2ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBpbiUyMHNwYWNlJTJDJTIwc3BhY2UlMjBlcXVpcG1lbnQlMkMlMjByb2NrZXQlMjBjb21wb25lbnQlMkMlMjBzcGFjZWNyYWZ0JTIwY2xvc2UtdXAlMjB3aXRoJTIwZGFyayUyMGJhY2tncm91bmQlMjBzcGFjZSUyMHRlY2hub2xvZ3klMjBzYXRlbGxpdGUlMjBkYXJrfGVufDB8MHx8fDE3NjQ0NzUyNjh8MA&ixlib=rb-4.1.0&q=85"
              alt="NASA Hubble Space Telescope on Unsplash"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/40"></div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden opacity-20">
            <svg
              className="absolute right-0 h-full"
              viewBox="0 0 200 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0 Q50 50, 0 100 T0 200 T0 300 T0 400 T0 500 T0 600"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M20 0 Q70 50, 20 100 T20 200 T20 300 T20 400 T20 500 T20 600"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M40 0 Q90 50, 40 100 T40 200 T40 300 T40 400 T40 500 T40 600"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M60 0 Q110 50, 60 100 T60 200 T60 300 T60 400 T60 500 T60 600"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M80 0 Q130 50, 80 100 T80 200 T80 300 T80 400 T80 500 T80 600"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M100 0 Q150 50, 100 100 T100 200 T100 300 T100 400 T100 500 T100 600"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative z-10 p-12 lg:p-16 flex flex-col justify-center min-h-[450px]">
            <div className="max-w-xl space-y-6">
              <h2 className="text-4xl lg:text-5xl font-heading font-normal leading-tight">
                <span className="text-white">Ready to </span>
                <span className="text-primary font-bold">Go</span>
                <span className="text-white"> Solar?</span>
              </h2>

              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                Let's power your home with clean, renewable energy.
                <br />
                Talk to our experts and get your free estimate today.
              </p>

              <div className="pt-4">
                <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-black font-semibold rounded-full transition-all shadow-lg shadow-primary/30 hover:scale-105">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
