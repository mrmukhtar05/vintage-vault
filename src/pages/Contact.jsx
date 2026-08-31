import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <>
      <PageHeader
        title="Contact"
        subtitle="Got a question? We'd love to hear from you."
      />

      <main className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* LEFT */}
          <div>
            <p className="text-xs font-black tracking-[0.3em] text-[var(--gold)]">
              GET IN TOUCH
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
              LET'S TALK.
            </h1>

            <p className="mt-6 max-w-[500px] leading-7 text-[var(--muted)]">
              Have a question about an item, your order, or anything else?
              Send us a message and we'll get back to you.
            </p>

            <div className="mt-10 grid gap-5">

              <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
                <p className="text-xs font-black tracking-widest text-[var(--gold)]">
                  EMAIL
                </p>

                <p className="mt-2 font-bold">
                  support@vintagevault.com
                </p>
              </div>

              <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
                <p className="text-xs font-black tracking-widest text-[var(--gold)]">
                  LOCATION
                </p>

                <p className="mt-2 font-bold">
                  India
                </p>
              </div>

              <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
                <p className="text-xs font-black tracking-widest text-[var(--gold)]">
                  RESPONSE TIME
                </p>

                <p className="mt-2 font-bold">
                  Usually within 24–48 hours
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">

            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

                <div className="text-5xl text-[var(--gold)]">
                  ✓
                </div>

                <h2 className="mt-5 text-3xl font-black">
                  MESSAGE SENT
                </h2>

                <p className="mt-3 text-[var(--muted)]">
                  Thanks for contacting Vintage Vault.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-[var(--gold)] px-6 py-3 font-black text-black"
                >
                  SEND ANOTHER MESSAGE
                </button>

              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid gap-5"
              >

                <div>
                  <label className="text-xs font-black tracking-widest">
                    NAME
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-2 w-full border border-[var(--border)] bg-[var(--black)] px-4 py-3 outline-none transition focus:border-[var(--gold)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black tracking-widest">
                    EMAIL
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full border border-[var(--border)] bg-[var(--black)] px-4 py-3 outline-none transition focus:border-[var(--gold)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black tracking-widest">
                    SUBJECT
                  </label>

                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="mt-2 w-full border border-[var(--border)] bg-[var(--black)] px-4 py-3 outline-none transition focus:border-[var(--gold)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black tracking-widest">
                    MESSAGE
                  </label>

                  <textarea
                    name="message"
                    required
                    rows="6"
                    placeholder="Write your message..."
                    className="mt-2 w-full resize-none border border-[var(--border)] bg-[var(--black)] px-4 py-3 outline-none transition focus:border-[var(--gold)]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-[var(--gold)] px-6 py-4 font-black text-black transition hover:opacity-90 hover:shadow-[5px_5px_0_#000]"
                >
                  SEND MESSAGE →
                </button>

              </form>
            )}

          </div>
        </div>
      </main>
    </>
  );
}