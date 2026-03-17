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
    <section className="bg-black text-white py-20 px-6 border-t border-gray-800">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          Connect Everything You Use
        </h2>

        <p className="text-gray-400 mt-4">
          Integrate with your favorite tools and let AI handle the work.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800"
            >
              {tool}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}