import AgentCard from "./AgentCard";

export default function AgentGrid({ agents }) {
  return (
    <section
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {agents.map((agent, index) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          index={index}
        />
      ))}
    </section>
  );
}