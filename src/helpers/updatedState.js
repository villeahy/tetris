function updatedState(updates) {
  const keys = Object.keys(updates);
  return {
    ...updates,
    updatedStates: keys
  };
}

export { updatedState };
