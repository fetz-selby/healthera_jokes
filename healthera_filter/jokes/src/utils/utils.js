export const arrToStr = (arr, prop)=>{
    let str = '';
    for(let i = 0; i < arr.length; i++){
        str += arr[i][prop]+',';
    }
  
  return str.substr(0,str.length-1);
}