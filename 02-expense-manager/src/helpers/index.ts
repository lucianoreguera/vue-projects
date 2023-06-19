export const generateUUID = ():string => {
  let date:number = new Date().getTime();
  const uuid:string = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

  return uuid;
}

export const dateFormat = (date: string | number | Date):string => {
  const newDate = new Date(date);
  const options:object = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }
  
  return newDate.toLocaleDateString('es-ES', options)
}

export const currencyFormat = (quantity:number):string => {
  return quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}