export const getLastId = list => {
  //id have to todo_INDEXNUMBER
  if (list.length > 0) {
    const last = list[list.length - 1];
    console.log("Son Elemanın ID: ", last.id);
    const splitted = last.id.split("_");
    return parseInt(splitted[splitted.length - 1]);
  } else {
    return 0;
  }
};
