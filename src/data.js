import pokemon from "./data/pokemon/pokemon";

export const searchFunc = p => {
  let nameInput = document.getElementById("search").value
  nameInput = nameInput.toUpperCase() 
return (nameInput == p.name.slice(0,-(p.name.length - nameInput.length)).toUpperCase()|| nameInput == p.name.toUpperCase()) 
};

//zexport function typePercent() {   
//}


//const groupType = groupBy(pokemon, 'type');