export const metadata = {
  title: "Terms of Service | SOLARO",
  description: "Terms and conditions for using SOLARO solar energy services.",
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg text-ink-mid space-y-6">
          <p>Last updated: January 2026</p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using SOLARO&apos;s services, you agree to be bound
            by these Terms of Service. If you do not agree to these terms,
            please do not use our services.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            2. Services
          </h2>
          <p>
            SOLARO provides solar energy system sales, installation, and
            maintenance services across Bangladesh. All services are subject to
            availability and our coverage area.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            3. Orders and Payment
          </h2>
          <p>
            All orders are subject to acceptance and availability. Prices are
            listed in Bangladeshi Taka (BDT) and may change without notice.
            Payment terms are specified at checkout.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            4. Installation and Warranty
          </h2>
          <p>
            Installation timelines vary by district. Warranty terms are provided
            with each product and installation service.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            5. Contact
          </h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a
              href="mailto:legal@solaro.com.bd"
              className="text-accent hover:underline"
            >
              legal@solaro.com.bd
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
