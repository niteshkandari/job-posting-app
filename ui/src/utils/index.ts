const getFormattedSalary = (salary: number) => {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    salary
  );
};

const storeLocalItems = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};

const getLocalItems = (key: string) => {
  const items: any = localStorage.getItem(key);
  return JSON.parse(items);
};

const purgeLocalItems = (key: string) => { 
  localStorage.removeItem(key);
  return true;
}


function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>): void {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
          func.apply(this, args);
      }, delay);
  };
}



export { getFormattedSalary, storeLocalItems, getLocalItems, purgeLocalItems, debounce };
