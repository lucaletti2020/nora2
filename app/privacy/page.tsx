import Link from "next/link";
import PearIcon from "@/components/PearIcon";

export const metadata = { title: "Privacy Policy — Nora" };

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Nora, the Meal Planner — operated by Sundae Education Technologies SL
          </p>
          <p className="text-sm text-muted-foreground mt-1">Effective date: 12 May 2026</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            This Privacy Policy explains how we collect, use, store, and protect your personal data when you use
            Nora, the Meal Planner. We are committed to protecting your privacy and complying with the General Data
            Protection Regulation (GDPR) and applicable Spanish data protection law.
          </p>

          <Section n="1" title="Data Controller">
            <p>The data controller responsible for your personal data is:</p>
            <p className="font-medium text-foreground">Sundae Education Technologies SL</p>
            <p>
              Email:{" "}
              <a href="mailto:support@getsundae.ai" className="text-primary hover:underline">
                support@getsundae.ai
              </a>
              <br />
              Jurisdiction: Spain
            </p>
            <p>
              If you have any questions about how we handle your data, please contact us at the address above.
            </p>
          </Section>

          <Section n="2" title="What Personal Data We Collect">
            <p>
              We collect the following categories of personal data when you register and use the service:
            </p>
            <SubSection title="2.1 Account & Identity Data">
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Account password (stored in encrypted form)</li>
              </ul>
            </SubSection>
            <SubSection title="2.2 Demographic Data">
              <ul>
                <li>Age</li>
                <li>Gender</li>
              </ul>
            </SubSection>
            <SubSection title="2.3 Health & Lifestyle Data (Special Category Data)">
              <p>
                The following data constitutes special category data under Article 9 GDPR and is processed only
                with your explicit consent:
              </p>
              <ul>
                <li>Health conditions relevant to your diet</li>
                <li>Food allergies and intolerances</li>
                <li>Weight and height</li>
                <li>Fitness goals and dietary preferences</li>
              </ul>
            </SubSection>
            <SubSection title="2.4 Technical & Usage Data">
              <ul>
                <li>IP address (collected automatically when you access the site)</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on the service</li>
                <li>Login timestamps</li>
              </ul>
              <p>We do not collect payment information, as the service is free of charge.</p>
            </SubSection>
          </Section>

          <Section n="3" title="How We Use Your Personal Data">
            <p>
              We process your personal data for the following purposes and on the following legal bases:
            </p>

            <div className="space-y-4 mt-3">
              <LegalBasis
                purpose="Providing the service"
                basis="Performance of a contract — Art. 6(1)(b) GDPR"
              >
                <ul>
                  <li>Creating and managing your account.</li>
                  <li>Generating personalised meal plans based on your profile.</li>
                  <li>Sending transactional emails such as account confirmation and meal plan delivery.</li>
                </ul>
              </LegalBasis>
              <LegalBasis
                purpose="Health and dietary data processing"
                basis="Explicit consent — Art. 9(2)(a) GDPR"
              >
                <p>
                  Processing your health conditions, allergies, weight, height, and fitness goals to tailor meal
                  plans specifically for you.
                </p>
              </LegalBasis>
              <LegalBasis
                purpose="Marketing communications"
                basis="Consent — Art. 6(1)(a) GDPR"
              >
                <p>
                  Sending you newsletters, tips, and promotional content about the service, where you have opted
                  in. You may withdraw consent and unsubscribe at any time via the link in any marketing email.
                </p>
              </LegalBasis>
              <LegalBasis
                purpose="Legitimate interests"
                basis="Art. 6(1)(f) GDPR"
              >
                <ul>
                  <li>Improving and maintaining the security and performance of the service.</li>
                  <li>Analysing usage patterns to enhance user experience (using anonymised data).</li>
                  <li>Complying with legal obligations.</li>
                </ul>
              </LegalBasis>
            </div>
          </Section>

          <Section n="4" title="Data Retention">
            <p>
              We retain your personal data for as long as your account is active. If you delete your account, we
              will delete or anonymise your personal data within 30 days, except where we are required to retain it
              longer under applicable law (for example, for tax or fraud prevention purposes).
            </p>
            <p>
              Marketing preference records are retained for 3 years from the date of last interaction, or until you
              withdraw consent, whichever comes first.
            </p>
          </Section>

          <Section n="5" title="Sharing Your Data">
            <p>
              We do not sell, rent, or share your personal data with third-party companies for their own marketing
              purposes.
            </p>
            <p>
              We keep all personal data in-house and do not use third-party analytics or advertising platforms that
              process your data. We may disclose your data only in the following limited circumstances:
            </p>
            <ul>
              <li>To comply with a legal obligation, court order, or request from a competent public authority.</li>
              <li>To protect the rights, property, or safety of our company, our users, or others.</li>
              <li>
                In connection with a merger, acquisition, or sale of all or part of our business, in which case
                users will be notified in advance.
              </li>
            </ul>
          </Section>

          <Section n="6" title="Cookies">
            <p>
              We use only essential cookies that are strictly necessary for the operation of the website (for
              example, to keep you logged in during a session). These cookies do not track you for advertising or
              analytics purposes and do not require your consent under applicable law.
            </p>
            <p>We do not use third-party cookies, tracking pixels, or analytics cookies.</p>
          </Section>

          <Section n="7" title="Data Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against
              unauthorised access, accidental loss, destruction, or alteration. These measures include:
            </p>
            <ul>
              <li>Encryption of passwords and sensitive health data at rest.</li>
              <li>Secure HTTPS connections for all data transmission.</li>
              <li>Access controls limiting who within our organisation can access your data.</li>
              <li>Regular review of our security practices.</li>
            </ul>
            <p>
              Despite our efforts, no method of transmission over the internet is completely secure. If you believe
              your account has been compromised, please contact us immediately.
            </p>
          </Section>

          <Section n="8" title="International Data Transfers">
            <p>
              Your personal data is stored and processed within the European Economic Area (EEA). We do not transfer
              your data to countries outside the EEA. Should this change in future, we will ensure appropriate
              safeguards are in place in accordance with Chapter V of the GDPR.
            </p>
          </Section>

          <Section n="9" title="Your Rights Under GDPR">
            <p>
              As a data subject, you have the following rights regarding your personal data:
            </p>
            <div className="space-y-3 mt-3">
              {[
                { right: "Right of access (Art. 15)", desc: "You may request a copy of the personal data we hold about you." },
                { right: "Right to rectification (Art. 16)", desc: "You may ask us to correct inaccurate or incomplete data." },
                { right: "Right to erasure (Art. 17)", desc: "You may ask us to delete your personal data, subject to certain legal exceptions." },
                { right: "Right to restriction of processing (Art. 18)", desc: "You may ask us to restrict how we use your data in certain circumstances." },
                { right: "Right to data portability (Art. 20)", desc: "You may request your data in a structured, machine-readable format." },
                { right: "Right to object (Art. 21)", desc: "You may object to processing based on our legitimate interests, including for direct marketing purposes." },
                { right: "Right to withdraw consent (Art. 7(3))", desc: "Where processing is based on your consent, you may withdraw it at any time without affecting the lawfulness of prior processing." },
                { right: "Right to lodge a complaint", desc: "You have the right to lodge a complaint with the Spanish Data Protection Authority (Agencia Española de Protección de Datos — AEPD) at www.aepd.es, or with the supervisory authority in your country of residence." },
              ].map(({ right, desc }) => (
                <div key={right} className="rounded-2xl bg-card border border-border px-4 py-3">
                  <p className="font-medium text-foreground text-xs mb-1">{right}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              To exercise any of these rights, please contact us at:{" "}
              <a href="mailto:support@getsundae.ai" className="text-primary hover:underline">
                support@getsundae.ai
              </a>
              . We will respond within 30 days of receiving your request.
            </p>
          </Section>

          <Section n="10" title="Children's Privacy">
            <p>
              Our service is not directed to persons under the age of 18. We do not knowingly collect personal data
              from minors. If we become aware that we have collected data from a person under 18, we will delete
              that data promptly. If you believe we have inadvertently collected data from a minor, please contact
              us immediately.
            </p>
          </Section>

          <Section n="11" title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
              law. We will notify you of significant changes by email or by posting a prominent notice on our
              website. The effective date at the top of this document will always indicate when the policy was last
              updated.
            </p>
          </Section>

          <Section n="12" title="Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle
              your data, please contact our privacy team at:
            </p>
            <p className="font-medium text-foreground">Sundae Education Technologies SL</p>
            <p>
              Email:{" "}
              <a href="mailto:support@getsundae.ai" className="text-primary hover:underline">
                support@getsundae.ai
              </a>
            </p>
            <p>We are committed to working with you to resolve any concerns about your privacy.</p>
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

function LegalBasis({ purpose, basis, children }: { purpose: string; basis: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border px-4 py-3">
      <p className="font-medium text-foreground text-xs mb-0.5">{purpose}</p>
      <p className="text-xs text-primary mb-2">{basis}</p>
      <div className="text-xs text-muted-foreground leading-relaxed space-y-1">{children}</div>
    </div>
  );
}
