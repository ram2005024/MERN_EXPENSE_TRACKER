export const DateFormatter = (d) => {
  return `${new Date(d).getDate().toString().padStart(2, "0")} / 
                ${(new Date(d).getMonth() + 1).toString().padStart(2, "0")}
                / ${new Date(d).getFullYear().toString()}`;
};
