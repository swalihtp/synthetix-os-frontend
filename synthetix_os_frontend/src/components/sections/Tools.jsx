const tools = [
  "Gmail",
  "Slack",
  "Notion",
  "Google Sheets",
  "Stripe",
  "Webhooks",
  "REST APIs"
];

export default function Tools() {
  return (
    <section className="border-t border-gray-800 bg-black px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold sm:text-4xl">
          Connect Everything You Use
        </h2>

        <p className="mt-4 text-gray-400">
          Integrate with your favorite tools and let AI handle the work.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm hover:bg-gray-800 sm:px-6"
            >
              {tool}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
