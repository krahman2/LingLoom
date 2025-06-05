import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/ui/Footer';
import { DollarSign } from 'lucide-react'; // Or any other relevant icon

const PricingPage = () => {
  const plans = [
    {
      name: "Monthly",
      price: 5.99,
      trial: "7-day free trial, then",
      monthlyValue: null,
      discount: null,
      description: "Ideal for trying things out.",
      buttonText: "Start Free Trial"
    },
    {
      name: "3 Months",
      price: 16.99,
      monthlyValue: 5.66,
      discount: "5.5% OFF",
      description: "Save with a short-term commitment.",
      buttonText: "Choose Plan"
    },
    {
      name: "6 Months",
      price: 29.99,
      monthlyValue: 5.00, // approx
      discount: "16.6% OFF",
      description: "Our most popular plan!",
      isPopular: true,
      buttonText: "Choose Plan"
    },
    {
      name: "Yearly",
      price: 53.99,
      monthlyValue: 4.50, // approx
      discount: "24.9% OFF",
      description: "Best value for long-term learners.",
      buttonText: "Choose Plan"
    },
    {
      name: "Lifetime",
      price: 143.99,
      monthlyValue: 3.99,
      discount: "33.2% OFF",
      description: "One payment, access forever. Equivalent to 3 years at $3.99/month.",
      buttonText: "Choose Plan"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavigationBar />
      <main className="flex-grow">
        {/* Hero Section for Pricing - Reverting title/subtext font sizes and icon size/margin */}
        <section className="relative bg-gray-950 px-4 py-10 md:py-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <DollarSign className="w-20 h-20 text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Flexible <span className="text-purple-500">Pricing</span> Plans
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan to kickstart your language learning journey with LingLoom. All plans start with a 7-day free trial.
            </p>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="bg-black px-4 py-10 md:py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-6 items-stretch">
              {/* Special card for the first plan with trial info */}
              <div className="border border-gray-700 rounded-lg shadow-xl p-4 flex flex-col bg-gray-900 hover:border-purple-600 transition-all duration-300 transform hover:scale-105 h-full">
                <h2 className="text-xl font-semibold text-white">{plans[0].name}</h2>
                <p className="text-xs text-gray-400 mt-1">{plans[0].trial}</p>
                <p className="text-3xl font-bold text-white my-3">
                  ${plans[0].price.toFixed(2)}
                  <span className="text-sm font-normal text-gray-400">/month</span>
                </p>
                <p className="text-gray-300 text-sm mb-4 flex-grow">{plans[0].description}</p>
                <button className="mt-auto w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition duration-150 text-sm">
                  {plans[0].buttonText}
                </button>
              </div>

              {plans.slice(1).map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded-lg shadow-xl p-4 flex flex-col bg-gray-900 hover:border-purple-600 transition-all duration-300 transform hover:scale-105 h-full ${
                    plan.isPopular ? "border-purple-500 ring-2 ring-purple-500 relative" : "border-gray-700"
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute top-0 -mt-px right-4 bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded-b-md z-10">
                      MOST POPULAR
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                   <p className="text-xs text-purple-400 font-medium mt-1">
                    {plan.discount ? `${plan.discount}` : <>&nbsp;</>}
                  </p>
                  <p className="text-3xl font-bold text-white my-3">
                    ${plan.price.toFixed(2)}
                    {plan.name !== "Lifetime" && <span className="text-sm font-normal text-gray-400"> total</span>}
                  </p>
                  {plan.monthlyValue && (
                    <p className="text-sm text-gray-300">
                      (${plan.monthlyValue.toFixed(2)}/month effectively)
                    </p>
                  )}
                  <p className="text-gray-300 text-sm mb-4 mt-1 flex-grow">{plan.description}</p>
                  <button className="mt-auto w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition duration-150 text-sm">
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="bg-gray-950 px-4 py-10 md:py-16 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-extrabold text-center text-white mb-3">
              Our Commitment to You & The World
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed text-center">
              Our core mission is to make language learning accessible and as affordable as possible for everyone.
              A significant portion of your subscription directly supports the passionate community members
              who dedicate their time and expertise to creating our platform, developing the curriculum,
              and fostering a vibrant learning environment. Furthermore, we are proud to contribute to global
              language preservation efforts by donating to esteemed organizations such as the
              Endangered Language Fund (ELF), Living Tongues Institute for Endangered Languages, and UNESCO.
              Your journey with us helps keep languages alive.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage; 