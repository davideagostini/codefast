import ButtonLogin from "@/components/ButtonLogin";
import ListItem from "@/components/ListItem";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "./productDemo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const pricingFeatureList = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];

  return (
    <main>
      {/* HEADER */}
      <section className="bg-base-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold">CodeFastSaaS</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <div>
            <ButtonLogin session={session} />
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="text-center lg:text-left py-32 px-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image
          src={productDemo}
          alt="Product Demo"
          className="w-96 rounded-xl"
        />

        <div>
          <h1 className="lg:text-5xl text-4xl font-extrabold mb-6">
            Collect customer feedback to build better products
          </h1>
          <div className="opacity-90 mb-10">
            Create a feedback board in minutes, prioritize features, and build
            products your customer will love.
          </div>
          <ButtonLogin session={session} />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-base-200">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h2>

          <div className="p-8 bg-base-100 max-w-96 rounded-3xl mx-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">$19</div>
              <div className="text-sm uppercase font-medium opacity-60">
                /month
              </div>
            </div>

            <ul className="space-y-2">
              {pricingFeatureList.map((el, index) => {
                return <ListItem text={el} key={index} />;
              })}
            </ul>

            <ButtonLogin session={session} extraStyle="w-full" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-base-100">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <ul className="max-w-lg mx-auto">
            {[
              { question: "What do I get exactly?", answer: "Lorem Ipsum" },
              { question: "Can I get a refund?", answer: "Lorem Ipsum" },
              { question: "I have another question", answer: "Lorem Ipsum" },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
