import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-br from-accent to-accent-mid rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-4xl font-heading font-semibold mb-4">
            Not Sure If We Cover Your Area?
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            We cover all 64 districts of Bangladesh. Even if your area is
            remote, we will find a way. Call us to confirm delivery to your
            location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801XXXXXXXXX"
              className="px-8 py-4 bg-white text-accent rounded-full font-semibold hover:bg-cream transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call: +880 1XXX-XXXXXX
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
