module.exports = {
  pwd: function(){
      process.stdout.write(process.env.PWD);
      process.stdout.write('prompt > ');
  },
  date: function(){
    var dateNow = new Date().toString();
    process.stdout.write(dateNow)
    process.stdout.write('prompt > ');
  }
}
