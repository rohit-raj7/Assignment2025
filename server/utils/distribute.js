// Distribute rows equally among agents
export const distributeEqually = (rows, agents) => {
  const distributed = {};
  const agentCount = 5; // Requirement: 5 agents
  const selectedAgents = agents.slice(0, agentCount); // take first 5 agents

  let i = 0;
  for (const row of rows) {
    const agent = selectedAgents[i % agentCount];
    if (!distributed[agent._id]) {
      distributed[agent._id] = [];
    }
    distributed[agent._id].push(row);
    i++;
  }

  return distributed;
};
