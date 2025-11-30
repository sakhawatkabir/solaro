import Badge from "./Badge";

export default function AppreciationSection() {
  const features = [
    {
      image:
        "https://images.unsplash.com/photo-1630672607721-48e0a0187a92?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
      alt: "Solar panels on green grass field by Michael Förtsch on Unsplash",
      title: "24/7",
      description: "24/7 Support Team",
    },
    {
      image:
        "https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
      alt: "Worker installing solar panels by David Clode on Unsplash",
      title: "25-Year",
      description: "25-Year Panel Warranty",
    },
    {
      image:
        "https://images.pexels.com/photos/9800003/pexels-photo-9800003.jpeg?w=800",
      alt: "Close-up of solar panels by Kindel Media on Pexels",
      title: "10+",
      description: "10+ Years of Solar Experience",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-8">
          <Badge
            variant="default"
            className="inline-flex bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            APPRECIATION FROM HELPED
          </Badge>
        </div>

        <h2 className="text-4xl lg:text-5xl font-heading font-normal text-center text-black dark:text-white max-w-4xl mx-auto leading-tight mb-16">
          We've helped homeowners and businesses transform their energy usage
          saving money and protecting the environment at the same time.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-5xl font-heading font-bold text-white">
                    {feature.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-base font-medium text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
