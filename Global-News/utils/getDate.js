export function date(){
    const fecha = new Date();
    return `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}, ${fecha.getHours()}:${String(
      fecha.getMinutes()
    ).padStart(2, "0")}:${String(fecha.getSeconds()).padStart(2, "0")}`;
  };

export function orderDate(fechas){
    const fecha = `${fechas[8]}${fechas[9]}-${fechas[5]}${fechas[6]}-${fechas[0]}${fechas[1]}${fechas[2]}${fechas[3]}`
    return fecha
}

export function setDate(fecha){
    let date= fecha.split("/")

    let day = date[0]
    let month = date[1]
    let year = date[2]

    if(day.length === 1){day= 0+date[0]}
    if(month.length === 1){month= 0+date[1]}
    if(year <= 40){year= 20+date[2]}
    if(year.length === 2){year= 19+date[2]}

    date = `${day}/${month}/${year}`

    return date
}
