const empty0rRows = (result) => {
    if (!result || !result.rows) {
      return [];
    }
    return result.rows;
  };
  
  export { empty0rRows };