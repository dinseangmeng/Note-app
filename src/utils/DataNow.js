export default ()=>{
    var today = new Date();
    var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    return (date + ' '+ time);
}