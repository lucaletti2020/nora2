import Link from "next/link";
import PearIcon from "@/components/PearIcon";

export const metadata = { title: "Terms & Conditions — Nora" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-5 max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-cta flex items-center justify-center shadow-soft">
              <PearIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">Nora</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-14 max-w-3xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-muted-foreground">
            Nora, the Meal Planner — operated by Sundae Education Technologies SL
          </p>
          <p className="text-sm text-muted-foreground mt-1">Effective date: 12 May 2026</p>
        </div>

        <div className="prose-legal">
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Please read these Terms and Conditions carefully before using our website and services. By creating an
            account or using Nora, the Meal Planner, you agree to be bound by these Terms. If you do not agree,
            please do not use our service.
          </p>

          <Section n="1" title="About Us">
            <p>
              Nora, the Meal Planner is a free online service that generates personalised meal plans for registered
              users. It is operated by Sundae Education Technologies SL, a company incorporated under the laws of
              Spain, with registered address in Spain.
            </p>
            <p>
              For any questions regarding these Terms, please contact us at:{" "}
              <a href="mailto:support@getsundae.ai" className="text-primary hover:underline">
                support@getsundae.ai
              </a>
            </p>
          </Section>

          <Section n="2" title="Eligibility">
            <p>
              You must be at least 18 years of age to use this service. By registering an account, you confirm that
              you meet this requirement. We reserve the right to terminate any account we believe belongs to a minor.
            </p>
          </Section>

          <Section n="3" title="User Accounts">
            <SubSection title="3.1 Registration">
              <p>
                To access the meal planning features, you must create an account by providing accurate and complete
                information, including your name, email address, and relevant health and dietary details. You are
                responsible for keeping your login credentials confidential.
              </p>
            </SubSection>
            <SubSection title="3.2 Account Security">
              <p>
                You are solely responsible for all activity that occurs under your account. You agree to notify us
                immediately at{" "}
                <a href="mailto:support@getsundae.ai" className="text-primary hover:underline">
                  support@getsundae.ai
                </a>{" "}
                if you suspect any unauthorised access to or use of your account.
              </p>
            </SubSection>
            <SubSection title="3.3 Account Termination">
              <p>
                You may delete your account at any time. We reserve the right to suspend or terminate your account if
                you breach these Terms, provide false information, or engage in any conduct harmful to other users or
                to us.
              </p>
            </SubSection>
          </Section>

          <Section n="4" title="The Service">
            <SubSection title="4.1 Description">
              <p>
                Nora generates personalised weekly meal plans based on the information you provide, including your
                age, gender, weight, height, fitness goals, health conditions, and dietary preferences or allergies.
              </p>
            </SubSection>
            <SubSection title="4.2 Not Medical Advice">
              <p>
                The meal plans and nutritional information provided by Nora are for general informational and
                educational purposes only. They do not constitute medical advice, diagnosis, or treatment. You should
                always seek the advice of a qualified healthcare professional before making significant changes to
                your diet, particularly if you have a medical condition, are pregnant, or are taking medication.
              </p>
            </SubSection>
            <SubSection title="4.3 Free Service">
              <p>
                The service is currently provided free of charge. We reserve the right to introduce paid features or
                change the pricing model in the future, with reasonable advance notice to registered users.
              </p>
            </SubSection>
            <SubSection title="4.4 Service Availability">
              <p>
                We strive to maintain continuous availability of the service but do not guarantee uninterrupted
                access. We may suspend, modify, or discontinue the service (or any part of it) at any time for
                maintenance, upgrades, or other reasons, with or without notice.
              </p>
            </SubSection>
          </Section>

          <Section n="5" title="Acceptable Use">
            <p>You agree not to use the service to:</p>
            <ul>
              <li>Provide false, misleading, or inaccurate information about yourself.</li>
              <li>Attempt to gain unauthorised access to our systems or the accounts of other users.</li>
              <li>Use automated tools (such as bots or scrapers) to access or collect data from the service.</li>
              <li>Reverse engineer, copy, or reproduce any part of the service.</li>
              <li>Use the service for any unlawful purpose or in a way that violates applicable law.</li>
              <li>Transmit any harmful, offensive, or disruptive content.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate access for any user who violates these rules.
            </p>
          </Section>

          <Section n="6" title="Intellectual Property">
            <p>
              All content, design, software, and materials on the Nora platform — including meal plans generated for
              you — are owned by or licensed to Sundae Education Technologies SL. You are granted a limited,
              non-exclusive, non-transferable licence to use the service for your personal, non-commercial purposes.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works from any part of the service
              without our prior written consent.
            </p>
          </Section>

          <Section n="7" title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Sundae Education Technologies SL shall not be
              liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection
              with your use of the service.
            </p>
            <p>
              Our total liability to you for any claim arising from your use of the service shall not exceed €100.
              Nothing in these Terms limits our liability for death or personal injury caused by our negligence, or
              for fraud or fraudulent misrepresentation.
            </p>
          </Section>

          <Section n="8" title="Disclaimer of Warranties">
            <p>
              The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any
              kind, whether express or implied, including but not limited to warranties of merchantability, fitness
              for a particular purpose, or non-infringement. We do not warrant that the service will be error-free
              or that any information provided is accurate, complete, or up to date.
            </p>
          </Section>

          <Section n="9" title="Third-Party Links">
            <p>
              Our service may contain links to third-party websites. These links are provided for convenience only.
              We have no control over the content of those sites and accept no responsibility for them or for any
              loss or damage that may arise from your use of them.
            </p>
          </Section>

          <Section n="10" title="Changes to These Terms">
            <p>
              We may update these Terms from time to time. When we do, we will revise the effective date at the top
              of this document and, where the changes are material, notify you by email. Your continued use of the
              service after changes take effect constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section n="11" title="Governing Law and Disputes">
            <p>
              These Terms are governed by and construed in accordance with the laws of Spain. Any disputes arising
              out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts
              of Spain.
            </p>
            <p>
              If you are a consumer resident in the European Union, you also have the right to refer disputes to the
              EU Online Dispute Resolution platform at:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </Section>

          <Section n="12" title="Contact">
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="font-medium text-foreground">Sundae Education Technologies SL</p>
            <p>
              Email:{" "}
              <a href="mailto:support@getsundae.ai" className="text-primary hover:underline">
                support@getsundae.ai
              </a>
            </p>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8 max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Sundae Education Technologies SL</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-smooth">Terms</Link>
            <Link href="/privacy" className="hover:text-primary transition-smooth">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-3 flex items-baseline gap-2">
        <span className="text-primary font-bold">{n}.</span> {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
