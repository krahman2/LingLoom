import Image from "/images/phonelearn.png";

export default function MethodsGrid() {
  return (
    <section className="bg-white text-black py-24 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          What makes us different?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-sm">
          <div>
            <h3 className="font-bold mb-1">spaced repetition.</h3>
            <p>
              Our scheduler resurfaces words just before you forget them, turning short-term gains into long-term memory.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-1">comprehensible input.</h3>
            <p>
              Videos that are 80% understandable, where the brain acquires new grammar subconsciously.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-1">cloze deletion.</h3>
            <p>
              Fill-in-the-blank sentences force deep processing, so you internalize function words better than flashcards.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-1">micro-grammar.</h3>
            <p>
              Bite-size pop-ups explain why a form works, perfect balance of explicit rule + implicit practice.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-1">shadowing pronunciation.</h3>
            <p>
              Real-time matching trains your ear–mouth link, improving accent and listening simultaneously.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-1">retrieval-based writing.</h3>
            <p>
              Short prompts make you recall vocabulary in context—far stronger than passive review.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-1">community q&amp;a threads.</h3>
            <p>
              Ask, answer, get instant peer feedback; social explanation cements concepts better than solo study.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
