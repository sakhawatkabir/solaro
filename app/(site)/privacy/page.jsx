export const metadata = {
  title: "Privacy Policy | SOLARO",
  description:
    "How SOLARO collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg text-ink-mid space-y-6">
          <p>Last updated: January 2026</p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name,
            email, phone number, and address when you place an order or create
            an account.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to process orders, provide customer support,
            send service updates, and improve our services.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            3. Information Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share it with
            service providers who assist in delivering our services, subject to
            confidentiality agreements.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            4. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-ink mt-8">
            5. Contact
          </h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a
              href="mailto:privacy@solaro.com.bd"
              className="text-accent hover:underline"
            >
              privacy@solaro.com.bd
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
