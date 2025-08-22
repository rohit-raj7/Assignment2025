

export const distributeEqually = (rows, agents) => {
  const distributed = {};
  const agentCount = 5; 
  const selectedAgents = agents.slice(0, agentCount); 

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
